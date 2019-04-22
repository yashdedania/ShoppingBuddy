import React, { Component } from 'react';
import { TouchableOpacity, FlatList, RefreshControl, Keyboard, NativeModules, processColor } from 'react-native';
import styles from '../../theme/styles/staff_list';
import hstyles from '../../theme/styles/header';
import gstyles from '../../theme/styles/general';
import Loader from '../../components/Loader';
import { Container, View, Content, ListItem, Text, Thumbnail, Left, Right, Body, Title, Input } from 'native-base';
import user from '../../api/user';
import products from '../../api/products';
import format from '../../components/dateformat';
import searchData from '../../api/searchfilter';
import * as Animatable from 'react-native-animatable';
import _ from 'lodash';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import colors from '../../theme/color';
import BillModal from './BillModal';
const { StatusBarManager } = NativeModules;
import AlertAsync from "react-native-alert-async";


class MyOrders extends Component {
    constructor(props) {
        super(props);

        this.state = {
            listArray: [],
            fullData: [],
            loading: false,
            refreshing: false,
            nodatatext: '',
            blur: false,
            query: '',
            searchbarVisible: false,
            searchBarFocused: false,
            currentData: null,
            verifymodal: false
        }
        this._isMounted = false;

    }
    componentDidMount = () => {
        this._isMounted = true;
        if (this._isMounted) {
            this.setState({ loading: true });
            this._fetchData();
        }
        this.didBlurSubscription = this.props.navigation.addListener(
            'didBlur',
            payload => {
                if (this._isMounted) {
                    this.setState({ blur: true });
                }

            }
        );
        this.willFocusSubscription = this.props.navigation.addListener(
            'willFocus',
            payload => {
                if (this.state.blur) {
                    if (this._isMounted) {
                        this.setState({ blur: false, loading: true });
                        this._fetchData();
                    }
                }
            }
        );
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this._keyboardWillShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }
    componentWillUnmount = () => {
        this._isMounted = false;
        this.didBlurSubscription.remove();
        this.willFocusSubscription.remove();
        this.keyboardDidShowListener.remove();
        this.keyboardWillShowListener.remove();
        this.keyboardDidHideListener.remove();
    }
    _fetchData = async () => {
        let extra = { ...this.state };
        var resp = await products.findUserOrders({});

        extra.loading = false;
        extra.refreshing = false;
        if (resp !== false) {
            if (resp.status == 'ok') {
                console.log("In activity data received");
                if (resp.result.length > 0) {
                    console.log(" Yeah data received have length: " + resp.result.length);
                    extra.listArray = resp.result;
                    extra.fullData = resp.result;
                }
                else {
                    extra.nodatatext = 'No data Available';
                }
            }
            else {
                extra.nodatatext = 'No data Available';
                console.log("Error received");
                console.log(resp);
            }
        }
        else {
            extra.nodatatext = 'No data Available';
            console.log("False data recieved");
        }
        if (this._isMounted) {
            this.setState({ ...this.state, ...extra });
        }
    }
    _onRefresh = () => {
        if (this._isMounted) {
            this.setState({ refreshing: true });
            this._fetchData();
        }
    }
    _renderItem = ({ item }) => (
        <ListItem style={styles.ItemContainer} onPress={() => this._openModal(item)}>
            <Left style={styles.ItemLeft}>
                <View style={styles.thumbnailContainer}>
                    <Thumbnail source={{ uri: item.user.imageuri }} />
                </View>
            </Left>
            <Body style={styles.ItemBody}>
                <Text>Order No: {item.id}</Text>
                <Text note>Total Amount: Rs. {item.total}</Text>
                <Text note style={styles.verified}>{item.paid ? 'Paid' : 'Not Paid'}</Text>
                <Text note style={styles.verified}>{item.order_verify ? "Verified" : "Not Verified"}</Text>
            </Body>
            <Right style={styles.ItemRight}>
                <Text note>{format.Time(item.createdAt)}</Text>
                <MaterialCommunityIcons name="chevron-right" style={styles.ItemRightIcon} />
            </Right>
        </ListItem>
    );
    _openModal = (params) => {
        let extra = { ...this.state };
        extra.verifymodal = true;
        extra.currentData = params;
        if (this._isMounted) {

            this.setState({ ...this.state, ...extra });
        }
    }
    _onDismiss = () => {
        let extra = { ...this.state };
        extra.currentData = null;
        extra.verifymodal = false;
        if (this._isMounted) {
            this.setState({ ...this.state, ...extra });
        }
    }

    _keyboardDidShow = () => {
        if (this._isMounted && this.state.searchbarVisible) {
            this.setState({ searchBarFocused: true });
        }
    }
    _keyboardWillShow = () => {
        if (this._isMounted && this.state.searchbarVisible) {
            this.setState({ searchBarFocused: true });
        }
    }
    _keyboardDidHide = () => {
        if (this._isMounted) {
            this.setState({ searchBarFocused: false });
        }
    }


    _handleSearch = async (text) => {
        let extra = { ...this.state };
        extra.query = text;
        await this.setState({ ...this.state, ...extra });
        this._searchQuery();
    }
    _searchQuery = () => {
        let extra = { ...this.state };
        const formatText = extra.query.toLowerCase();
        const data = _.filter(this.state.fullData, product => {
            return searchData.productContains(product, formatText);
        });
        if (data === null || data.length <= 0) {
            extra.nodatatext = "No Data Available"
        }
        if (this._isMounted) {
            extra.listArray = data;
            this.setState({ ...this.state, ...extra });
        }
    }
    _showSearch = () => {
        if (this._isMounted) {
            this.setState({ searchbarVisible: true });
        }
        this.view.transitionTo({ backgroundColor: colors.background });
        StatusBarManager.setStyle('dark-content');
        StatusBarManager.setColor(processColor('#E0E0E0'), true);
    }
    _clearSearch = async () => {
        console.log("Clear search excuted");
        if (this._isMounted) {
            await this.setState({ query: '' });
        }
        this._searchQuery();
    }
    _hideSearch = async () => {
        let extra = { ...this.state };
        extra.query = '';
        extra.searchbarVisible = false;
        if (this._isMounted) {
            await this.setState({ ...this.state, ...extra });
        }
        this.view.transitionTo({ backgroundColor: colors.primary });
        StatusBarManager.setStyle('light-content');
        StatusBarManager.setColor(processColor('#FF5964'), true);
        this._searchQuery();
    }

    handleViewRef = ref => this.view = ref;
    render() {
        return (
            <Container>
                <Animatable.View ref={this.handleViewRef} style={hstyles.header}>
                    <View style={[hstyles.headerContainer, this.state.searchbarVisible ? hstyles.lightbackground : hstyles.darkbackground]}>
                        <Left style={hstyles.left}>
                            {!!this.state.searchbarVisible ? (
                                <TouchableOpacity onPress={() => this._hideSearch()}>
                                    <Animatable.View animation="rotate" duration={500}><MaterialCommunityIcons name="arrow-left" style={hstyles.darkicon} /></Animatable.View>
                                </TouchableOpacity>
                            ) : (
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Dashboard')}>
                                        <MaterialCommunityIcons name="home" style={hstyles.icon} />
                                    </TouchableOpacity>
                                )}
                        </Left>
                        <Body style={hstyles.body}>
                            {!!this.state.searchbarVisible ? (
                                <Input style={hstyles.inputField} placeholder="Search" onChangeText={(text) => this._handleSearch(text)} value={this.state.query} />
                            ) : (
                                    <Title style={hstyles.headtitle}>Order List</Title>
                                )}

                        </Body>
                        <Right style={hstyles.right}>
                            {(!!this.state.searchbarVisible) ? (null) : (
                                <TouchableOpacity onPress={() => this._showSearch()}>
                                    <Ionicons name="ios-search" style={hstyles.icon} />
                                </TouchableOpacity>
                            )}
                            {(!!this.state.searchbarVisible && this.state.query.length > 1) ? (
                                <TouchableOpacity onPress={() => this._clearSearch()}>
                                    <MaterialCommunityIcons name="close" style={hstyles.darkicon} />
                                </TouchableOpacity>
                            ) : (null)}
                        </Right>
                    </View>
                </Animatable.View>
                {(this.state.currentData !== null && this.state.currentData !== undefined && this.state.currentData.products !== null && this.state.currentData.products !== undefined) ?
                    (<BillModal visibile={this.state.verifymodal} data={this.state.currentData} dismiss={this._onDismiss} />) : (null)}
                <Loader loading={this.state.loading} />
                {(this.state.listArray !== null && this.state.listArray !== undefined && this.state.listArray.length > 0) ?
                    (
                        <Content refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh}
                            />
                        }>
                            <FlatList
                                data={this.state.listArray}
                                renderItem={this._renderItem}
                                keyExtractor={item => (item.id).toString()}
                            />
                        </Content>
                    ) : (
                        <View style={gstyles.emptyContainer}>
                            <Text style={{ color: 'rgb(0,0,0)', fontSize: 24 }}>{this.state.nodatatext}</Text>
                        </View>
                    )}
            </Container>
        );
    }
}
export default MyOrders;
