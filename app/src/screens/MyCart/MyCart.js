import React, { Component } from "react";
import { connect } from 'react-redux';
import { TouchableOpacity, FlatList, WebView, RefreshControl } from 'react-native';
import { setUserDetails } from '../../actions/userActions';
import user from '../../api/user';
import products from '../../api/products';
import {
  View, Container, Text, ListItem,
  Left, Body, Content, Thumbnail, Right, Title, Button
} from 'native-base';
import AlertAsync from "react-native-alert-async";
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
import MylistView from '../Products/MylistView';
import UpdateModal from './UpdateModal';
import BillModal from './BillModal';
class MyCart extends Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      listArray: [],
      order: null,
      loading: false,
      refreshing: false,
      modalVisible: false,
      updatemodal: false,
      blur: false,
      currentprod: null,
      nodatatext: "",
      webView: false,
      url: '',
      transaction_id: '',
      total: 0
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
    console.log("----New data fetching started----");
    let extra = { ...this.state };
    extra.loading = false;
    extra.refreshing = false;
    var resp = await user.getsingle();
    if (resp !== false) {
      if (resp.status == 'ok') {
        console.log("In activity data received");
        //console.log(resp);
        if (resp.result !== null && resp.result !== undefined && resp.result.orders[0].products !== null && resp.result.orders[0].products !== undefined) {
          console.log("-------Got the data")
          extra.order = resp.result.orders[0];
          console.log("-------printing order----");
          console.log(extra.order);
          extra.listArray = resp.result.orders[0].products;
          if (resp.result.orders[0].products.length < 0) {
            console.log("--- In if array zero----");
            extra.listArray = [];
            extra.nodatatext = "No Products in Cart";
          }


        }
        else {
          console.log("---- In else array zero----");
          extra.listArray = [];
          extra.nodatatext = "No Products in Cart";
        }
      }
      else {
        console.log("Error received");
        console.log(resp);
        extra.nodatatext = "No Products in Cart";
      }
    }
    else {
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
  _onRemoveProduct = async (params) => {
    let data = { ...params };
    data.order = this.state.order;
    let choice = await AlertAsync(
      'Remove this Product',
      'Are you sure you want to remove this product from cart?',
      [
        { text: 'Yes', onPress: () => true },
        { text: 'No', onPress: () => false }
      ],
      { cancelable: false }
    );
    if (choice) {
      this.setState({ loading: true });
      var resp = await products.remove(data);
      if (resp !== false) {
        if (resp.status !== 'error') {
          console.log("Printing result");
          console.log(resp.result);
          if (resp.result !== null && resp.result !== undefined && resp.result.id !== null && resp.result.id !== undefined) {
            console.log("-------------------setting new user details-----------");
            this.props.setUserDetails(resp.result);
          }
          console.log("-----Fetching data----");
          this._fetchData();
          choice = await AlertAsync(
            'Product',
            'Product Successfully removed from cart',
            [
              { text: 'Okay', onPress: () => true }
            ],
            { cancelable: true }
          );

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
          this.setState({ loading: false });
        }
      }
      else {
        this.setState({ loading: false });
        console.log("False response recieved");
      }
    }
  }
  _EditProduct = (params) => {
    let extra = { ...this.state };
    extra.updatemodal = true;
    extra.currentprod = params;
    if (this._isMounted) {
      this.setState({ ...this.state, ...extra });
    }
  }
  _renderItem = ({ item }) => (
    <MylistView
      data={{ ...item }}
      order={{ ...this.state.order }}
      onPressItem={this._onRemoveProduct}
      onPressView={this._EditProduct}
      screenname="cart"
    />
  );
  _onDismiss = () => {
    console.log("In dismiss");
    let extra = { ...this.state };
    extra.modalVisible = false;
    extra.updatemodal = false;
    extra.currentprod = null;
    this.setState({ ...this.state, ...extra });
  }
  _onQuantityDone = async (quantity, params) => {
    let choice = await AlertAsync(
      'Update this Product',
      'Are you sure you want to update this product?',
      [
        { text: 'Yes', onPress: () => true },
        { text: 'No', onPress: () => false }
      ],
      { cancelable: false }
    );
    let extra = { ...this.state };
    if (choice) {
      extra.updatemodal = false;
      extra.modalVisible = false;
      extra.loading = true;
      extra.currentprod = null;
      this.setState({ ...this.state, ...extra });
      this._updateData(quantity, params);
    }
  }
  _updateData = async (quantity, params) => {
    let data = { ...params };
    data.quantity = quantity;
    data.order = this.state.order;
    var resp = await products.update(data);
    if (resp !== false) {
      if (resp.status !== 'error') {

        choice = await AlertAsync(
          'Product Details',
          'Product  details Successfully updated',
          [
            { text: 'Okay', onPress: () => true }
          ],
          { cancelable: true }
        );
        this._fetchData();
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
        this.setState({ loading: false });
      }
    }
    else {
      this.setState({ loading: false });
      console.log("False response recieved");
    }
  }
  _modalVisible = () => {
    let extra = { ...this.state };
    extra.modalVisible = true;
    extra.updatemodal = false;
    extra.currentprod = null;
    if (this._isMounted) {
      this.setState({ ...this.state, ...extra });
    }
  }
  _onWebView = async (params) => {
    this.setState({ modalVisible: false, webView: true, url: params.url, total: params.total });
  }
  onNavigationChange = async (webViewState) => {
    let hitUrl = webViewState.url;
    console.log(hitUrl);
    if (hitUrl.includes('http://example.com/')) {
      console.log('-----Prinitng hiturl-----');
      console.log(hitUrl);
      // we need the payment_req_id to get the status of paymnt
      hitUrl.replace('http://example.com/?', '');
      hitUrl = hitUrl.split('&');
      let payment_id = hitUrl[0].split("=").pop();
      let payment_status = hitUrl[1].split("=").pop();
      let payment_request_id = hitUrl[2].split("=").pop();
      console.log(payment_request_id);
      console.log(payment_id);
      console.log(payment_status);
      if (payment_status !== "Failed") {
        await this.setState({ loading: true, transaction_id: payment_id, webView: false })
        this._onPaybill();
      }
      else {
        let choice = await AlertAsync(
          'Error',
          'Transaction Failed Please try Again',
          [
            { text: 'okay', onPress: () => true }
          ],
          { cancelable: true }
        );
        this.setState({ webView: false, transaction_id: '' });
      }

    }
  }

  // getPaymentDetails = async (trans_id) => {

  //   let temp = { trans_id: trans_id };
  //   //insted of this you can do whatever you wan with the response , loading a custom success page with details etc
  //   let resp = await products.paymentgateway(temp);
  //   if (resp !== false) {
  //     if (resp.status !== 'error') {
  //       console.log("------Got Payment Details----");
  //       let data = JSON.parse(resp.result.body);
  //       console.log(data);
  //       //console.log(data.success);
  //     }
  //     else {
  //       console.log("error");
  //       console.log(resp.result);

  //     }
  //   }
  //   else {
  //     console.log("False response recieved");
  //   }
  //   this.setState({ loading: false, webView: false });
  // }
  _onPaybill = async () => {
    let extra = { ...this.state };
    let data = { id: this.state.order.id, total: extra.total, transaction_id: extra.transaction_id };
    extra.modalVisible = false;
    extra.updatemodal = false;
    extra.currentprod = false;
    extra.listArray = [];
    extra.order = null;
    extra.loading = true;
    extra.webView = false;
    extra.url = '';
    this.setState({ ...this.state, ...extra });
    console.log(data);
    var resp = await products.billpay(data);
    if (resp !== false) {
      if (resp.status !== 'error') {
        if (resp.result !== null && resp.result !== undefined && resp.result.id !== null && resp.result.id !== undefined) {
          this.props.setUserDetails(resp.result);
        }
        let message = 'Bill successfully paid with Transaction Id: ' + extra.transaction_id;
        choice = await AlertAsync(
          'Success',
          message,
          [
            { text: 'Okay', onPress: () => true }
          ],
          { cancelable: true }
        );
        this.setState({ total: 0, transaction_id: '' });
        this._fetchData();
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
        this.setState({ loading: false, total: 0, transaction_id: '' });
      }
    }
    else {
      this.setState({ loading: false, total: 0, transaction_id: '' });
      console.log("False response recieved");
    }

  }
  render() {
    if (this.state.webView) {
      return (
        <WebView
          ref="webview"
          source={{ uri: this.state.url }}
          onNavigationStateChange={this.onNavigationChange.bind(this)}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          // renderLoading={this.renderLoading.bind(this)}
          onMessage={(event) => console.log(event.nativeEvent.data)} />
      );
    }
    else {
      return (
        <Container style={gstyles.container_background}>
          <Loader loading={this.state.loading} />
          <View style={hstyles.header}>
            <View style={hstyles.headerContainer}>
              <Left style={hstyles.left}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Dashboard')}>
                  <MaterialCommunityIcons name="home" style={hstyles.icon} />
                </TouchableOpacity>
              </Left>
              <Body style={hstyles.body}>
                <Title style={hstyles.headtitle}>MyCart</Title>
              </Body>
              <Right style={hstyles.right} />
            </View>
          </View>
          <UpdateModal visibile={this.state.updatemodal} data={this.state.currentprod} order={this.state.order} dismiss={this._onDismiss} onDone={this._onQuantityDone} />

          {(this.state.order !== null && this.state.order !== undefined && this.state.order.products !== null && this.state.order.products !== undefined) ?
            (<BillModal visibile={this.state.modalVisible} data={this.state.order} dismiss={this._onDismiss} bill={this._onWebView} />) : (null)}

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
          <View>
            <Button full success rounded style={{ marginTop: 10 }} onPress={() => this._modalVisible()}>
              <Text style={{ color: 'rgb(255,255,255)' }}>View Bill</Text>
            </Button>
          </View>
        </Container>
      );

    }
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
export default (connect(mapStateToProps, mapDispatchToProps)(MyCart))
