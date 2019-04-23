
import React, { Component } from 'react';
import { View, Text, Modal, TouchableOpacity, FlatList } from 'react-native';
import { Button, Item, Content, Input, Left, Right, Body, List, ListItem, ActionSheet } from 'native-base';
import styles from '../../theme/styles/requestsent';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import products from '../../api/products';
import AlertAsync from "react-native-alert-async";
import colors from '../../theme/color';

class BillModal extends Component {
    constructor(props) {
        super(props);
        console.log("-----------in constructor========");
        console.log(this.props.data);
        this.state = {
            total: 0,
            webView: false,
        };
    }
    componentDidMount() {

    }
    _handleAction = async () => {
        choice = await AlertAsync(
            'Pay Bill',
            'Are you sure you want to pay this bill ?',
            [
                { text: 'Yes', onPress: () => true },
                { text: 'No', onPress: () => false }
            ],
            { cancelable: false }
        );
        if (choice) {
            let total = { amount: this.calculate() };
            console.log(total);
            this.setState({ total: total.amount });
            let resp = await products.paymentgateway(total);
            if (resp !== false) {
                if (resp.status !== 'error') {
                    data = {};
                    data.total = this.state.total;
                    data.url = resp.result;
                    this.props.bill(data);
                }
                else {
                    choice = await AlertAsync(
                        'Error',
                        resp.result,
                        [
                            { text: 'Okay', onPress: () => true }
                        ],
                        { cancelable: true }
                    );
                    console.log("error");
                    console.log(resp.result);
                }
            }
            else {
                choice = await AlertAsync(
                    'Error',
                    'Error in initiating Payment Please try again',
                    [
                        { text: 'Okay', onPress: () => true }
                    ],
                    { cancelable: true }
                );
            }
        }
    }


    calculate = () => {

        let total = 0;
        if (this.props.data !== null && this.props.data !== undefined && this.props.data.products !== null && this.props.data.products !== undefined) {
            let length = (this.props.data !== null && this.props.data !== undefined && this.props.data.products !== null && this.props.data.products !== undefined) ? this.props.data.products.length : 0;
            let products = (this.props.data !== null && this.props.data !== undefined && this.props.data.products !== null && this.props.data.products !== undefined) ? this.props.data.products : [];
            let order = (this.props.data !== null && this.props.data !== undefined) ? this.props.data : null;
            for (i = 0; i < length; i++) {
                total += parseInt(products[i].amount) * parseInt(order.quantity[products[i].id]);
            }

            return total;
        }
        else {
            return null;
        }
    }
    _renderItem = ({ item }) => {
        if (this.props.data !== null && this.props.data !== undefined) {
            return (
                <ListItem>
                    <Left><Text>{item.name}</Text></Left>
                    <Body><Text>{this.props.data.quantity[item.id]}</Text></Body>
                    <Right><Text>{parseInt(this.props.data.quantity[item.id]) * parseInt(item.amount)}</Text></Right>
                </ListItem>
            )
        }
        else {
            return null;
        }
    }
    render() {
        if (this.props.data !== undefined && this.props.data !== null) {
            return (
                <Modal visible={this.props.visibile} animationType={'slide'} onRequestClose={() => { console.log("Modal close") }}>
                    <View style={styles.ModalContainer}><Text style={styles.Modaltitle}>Order Details</Text><TouchableOpacity onPress={() => this.props.dismiss()}><MaterialCommunityIcons name='close-outline' style={styles.Modalclose} /></TouchableOpacity></View>
                    <Content>
                        <List>
                            <ListItem itemDivider>
                                <Left><Text style={styles.listItemheader}>Product Name</Text></Left>
                                <Body><Text style={styles.listItemheader}>Quantity</Text></Body>
                                <Right><Text style={styles.listItemheader}>Amount</Text></Right>
                            </ListItem>
                        </List>

                        {(this.props.data !== null && this.props.data !== undefined && this.props.data.products !== null && this.props.data.products !== undefined && this.props.data.products.length > 0) ? (<FlatList
                            data={this.props.data.products}
                            renderItem={this._renderItem}
                            keyExtractor={item => (item.id).toString()}
                        />) : (null)}

                        <List>
                            <ListItem itemDivider>
                                <Left><Text style={styles.listItemheader}>Total</Text></Left>

                                <Right><Text style={styles.listItemheader}>Rs. {this.calculate()} </Text></Right>
                            </ListItem>
                        </List>
                    </Content>
                    <Button full primary rounded style={{ margin: 10 }} onPress={() => this._handleAction()}>
                        <Text style={{ color: 'rgb(255,255,255)' }}>Pay Bill</Text>
                    </Button>
                </Modal>

            );
        }
        else {
            return null;
        }

    }
}

export default BillModal;
