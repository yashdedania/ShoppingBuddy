import React, { Component } from "react";
import { connect } from 'react-redux';
import { TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import { setUserDetails } from '../../actions/userActions';
import user from '../../api/user';
import {
    View, Container, Text, ListItem,
    Left, Body, Content, Thumbnail, Right, Title
} from 'native-base';
import styles from '../../theme/styles/staffdetails';
import sltyles from '../../theme/styles/staff_list';
import gstyles from '../../theme/styles/general';
import format from '../../components/dateformat';
import Loader from '../../components/Loader';
import hstyles from '../../theme/styles/header';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import activity from '../../api/activity';
import urls from '../../api/apivariable';
import ProfileModal from './ProfileModal';
class Profile extends Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
        this.state = {
            listArray: [],
            user: { ...props.user.details },
            loading: false,
            refreshing: false,
            modalVisible: false,
            blur: false,
        }

    }
    componentDidMount = () => {
        this._isMounted = true;
        if (this._isMounted) {
            this.setState({ loading: true });
            this._fetchData();
        }
    }
    componentWillUnmount = () => {
        this._isMounted = false;
    }
    _fetchData = async () => {

        let extra = { ...this.state };
        var resp = await activity.getactivity({ id: this.state.user.id });
        if (resp !== false) {
            if (resp.status == 'ok') {
                console.log("In activity data received");
                //console.log(resp);
                extra.listArray = resp.result;
                extra.loading = false;
                extra.refreshing = false;
                //extra.refreshing = false;
                if (this._isMounted) {
                    this.setState({ ...this.state, ...extra });
                }
            }
            else {
                console.log("Error received");
                console.log(resp);
            }
        }
        else {
            console.log("False data recieved");
        }
    }

    _renderText = (item) => {
        var text = "LOG";
        return text;
    }
    _renderItem = ({ item }) => (
        <ListItem style={sltyles.ItemContainer}>
            <Left style={sltyles.ItemLeft}>
                <View style={sltyles.TextContainer}>
                    <Text>{this._renderText(item)}</Text>
                </View>
            </Left>
            <Body style={sltyles.ItemBody}>
                <Text>{item.activity_type}</Text>
                <Text note>{item.activity_detail}</Text>
            </Body>
            <Right style={sltyles.ItemRight}>
                <Text note>{format.Time(item.createdAt)}</Text>
            </Right>
        </ListItem>
    )
    _onRefresh = () => {
        if (this._isMounted) {
            this.setState({ refreshing: true });
            this._fetchData();
        }
    }
    _openModal = () => {
        console.log("In Modal open");
        this.setState({ modalVisible: true });
    }
    _onDismiss = () => {
        console.log("In dismiss");
        this.setState({ modalVisible: false });
    }
    _updateDetails = async (params) => {
        console.log("Prinintg form Datta before sending");
        //console.log(params);
        let extra = { ...this.state };
        if (this._isMounted) {
            this.setState({ loading: true });
        }

        var resp = await user.update(params);
        if (resp !== false) {
            if (resp.status == 'ok') {
                console.log("In activity data received");
                //console.log(resp);
                extra.user = resp.result;
                extra.loading = false;
                extra.refreshing = false;
                extra.modalVisible = false;
                this.props.setUserDetails(resp.result);
                //extra.refreshing = false;
                if (this._isMounted) {
                    console.log("state updated");
                    this.setState({ ...this.state, ...extra });
                }
            }
            else {
                console.log("Error received");
                console.log(resp);
            }
        }
        else {
            console.log("False data recieved");
        }
        console.log(this.state.user);
    }
    render() {
        return (
            <Container style={gstyles.container_background}>
                <Loader loading={this.state.loading} />
                <ProfileModal visibile={this.state.modalVisible} dismiss={this._onDismiss} sendData={this._updateDetails} />
                <View style={hstyles.header}>
                    <View style={hstyles.headerContainer}>
                        <Left style={hstyles.left}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Dashboard')}>
                                <MaterialCommunityIcons name="home" style={hstyles.icon} />
                            </TouchableOpacity>
                        </Left>
                        <Body style={hstyles.body}>
                            <Title style={hstyles.headtitle}>Profile</Title>
                        </Body>
                        <Right style={hstyles.right} />
                    </View>
                </View>

                <View style={styles.cardBody}>
                    <View style={styles.circle}>
                        <Thumbnail style={styles.thumbnailStyles} source={{ uri: this.state.user.imageuri, cache: 'reload' }} />
                    </View>

                    <View style={styles.textView}>
                        <View style={styles.nameEmployee}><Text style={styles.employeenameStyle}>UserName: {this.state.user.username}</Text></View>
                        <View style={styles.nameEmployee}><Text style={styles.employeenameStyle}>Role: {this.state.user.role}</Text></View>
                    </View>

                    <TouchableOpacity style={{ alignItems: 'flex-start', marginRight: 5, display: 'flex', width: '30%' }} onPress={() => this._openModal()}>
                        <FontAwesome name="edit" style={styles.editIcon} />
                    </TouchableOpacity>
                </View>

                <View style={styles.requestdetailheaderview}>
                    <Text style={styles.requestdetailheadertext}> Latest Activity </Text>
                </View>
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
            </Container>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setUserDetails: (name) => {
            dispatch(setUserDetails(name));
        }
    };
};
export default (connect(mapStateToProps, mapDispatchToProps)(Profile))
