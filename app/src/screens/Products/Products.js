import React,{Component} from 'react';
import {View,Text,FlatList,RefreshControl,TouchableOpacity,Keyboard,NativeModules, processColor} from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import { connect } from 'react-redux';
import { Toast,Container,Content,Title,Left,Body,Right,Input,ActionSheet} from 'native-base';
import MylistView from './MylistView';
import products from '../../api/products';
import gstyles from '../../theme/styles/general';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import SocketIOClient from 'socket.io-client';
import urls from '../../api/apivariable';
import AlertAsync from "react-native-alert-async";
import hstyles from '../../theme/styles/header';
import colors from '../../theme/color';
import Loader from '../../components/Loader';
import Ionicons from '@expo/vector-icons/Ionicons';
import _ from 'lodash';
import * as Animatable from 'react-native-animatable';
import searchData from '../../api/searchfilter';
import BarCodeModal from './BarCodeModal';
import ProductDetail from './ProductDetail';

const { StatusBarManager } = NativeModules;
class Products extends Component{
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	listArray:[],
	  	fullData:[],
	  	nodatatext:'',
	  	loading:false,
	  	refreshing:false,
        barcodemodal:false,
        productdetail:false,
        currentprod:null
	  };
	  this._isMounted = false;
	}
	componentDidMount(){
		this._isMounted = true;
		this.setState({loading:true});
		this.fetchdata();

	}
	componentWillUnmount(){
		this._isMounted = false;
	}
	async fetchdata(){
		var resp = await products.findAll({});

		let extra = {...this.state};
		extra.loading = false;
		extra.refreshing = false;
		if(resp !== false){
                if(resp.status !== 'error'){
                    //console.log("Data Received: "+resp.result.length);
                    if(resp.result.length > 0){
                        extra.listArray = resp.result;
                        extra.fullData = resp.result;
                    }
                    

                    if(resp.result === null || resp.result === undefined || resp.result.length <= 0 ){
                        extra.nodatatext = "No Data Available";
                    }
                }
                else{
                    console.log("Error recieved from server");
                    console.log(resp.result);
                }
            }
            else{
                console.log("False error in purchase Request");
            }
        if(this._isMounted){
            this.setState({...this.state,...extra});
        }
	}
	_onRefresh = () =>{
        if(this._isMounted){
            this.setState({refreshing:true});
            this.fetchdata();
        }
    }
    _handlemodal = (namr) => {
        let extra = {...this.state};
        extra.barcodemodal = true;
        extra.productdetail = false;
        this.setState({...this.state,...extra});
    }
    _onDismiss = () =>{
        console.log("In dismiss");
        let extra = {...this.state};
        extra.barcodemodal = false;
        extra.productdetail = false;
        extra.currentprod = null;
        this.setState({...this.state,...extra});
    }
    _handleProd = (params) =>{
        let extra = {...this.state};
        extra.barcodemodal = false;
        extra.productdetail = true;
        extra.currentprod = params;
        this.setState({...this.state,...extra});
    }
    _onPressItem = async(params) =>{
    	console.log("Data pressed");
        let extra = {...this.state};
        let choice = await AlertAsync(
            'Add to cart',
            'Are you sure you want to add this product to cart?',
            [
              {text:'Yes',onPress:() => true},
              {text:'No',onPress:() => false}
            ],
            {cancelable:false}
        );
        if(choice){
            extra.barcodemodal = false;
            extra.productdetail = false;
            extra.currentprod = null;
            this.setState({...this.state,...extra});
            this._addToCart(params);
        }
        
    }
    _addToCart = async(data) =>{
        /*var resp = await products.add(data)
        if(resp !== false){
            if(resp.status !== 'error'){

            }
            else{
                console.log("error");
                console.log(resp.result);
            }
        }
        else{
            console.log("False response recieved");
        }*/
        let choice = await AlertAsync(
            'Product',
            'Product Successfully added to cart',
            [
              {text:'Okay',onPress:() => true}
            ],
            {cancelable:true}
        );

    }
    _renderItem = ({item}) =>(
        <MylistView
            data = {{...item}}
            onPressItem = {this._onPressItem}
            onPressView = {this._handleProd}
            screenname = "add"
        />
    );
	render(){
		return(
			<Container style={this.state.searchBarFocused ? hstyles.blurBackground : null}>
                <Animatable.View ref={this.handleViewRef}  style={hstyles.header}>
                        <View style={[hstyles.headerContainer,this.state.searchbarVisible ? hstyles.lightbackground : hstyles.darkbackground]}>
                        <Left style={hstyles.left}>
                            {!!this.state.searchbarVisible ? (
                                <TouchableOpacity onPress={() => this._hideSearch()}>
                                   <Animatable.View animation="rotate" duration={500}><MaterialCommunityIcons  name="arrow-left" style={hstyles.darkicon}/></Animatable.View>
                                </TouchableOpacity>
                            ):(
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Dashboard')}>
                                    <MaterialCommunityIcons name="home" style={hstyles.icon} />
                                </TouchableOpacity>
                            )}  
                        </Left>
                        <Body style={hstyles.body}>
                            {!!this.state.searchbarVisible ? (
                               <Input style={hstyles.inputField} placeholder="Search"  onChangeText={(text) => this._handleSearch(text)} value={this.state.query} /> 
                            ):(
                                <Title style={hstyles.headtitle}>Accepted Request</Title>
                            )}
                            
                        </Body>
                        {/*<Right style={hstyles.right}>
                            {(!!this.state.searchbarVisible) ? (null):(
                                <TouchableOpacity onPress={() => this._showSearch()}>
                                    <Ionicons name="ios-search" style={hstyles.icon} />
                                </TouchableOpacity>
                            )}
                            {(!!this.state.searchbarVisible && this.state.query.length > 1) ? (
                                <TouchableOpacity onPress={() => this._clearSearch()}>
                                    <MaterialCommunityIcons name ="close" style={hstyles.darkicon} />
                                </TouchableOpacity>
                            ):(null)}   
                        </Right>*/}
                        </View>
                    </Animatable.View>
                    <View style={hstyles.filterContainer}>
                            <TouchableOpacity onPress={() => this._handlefilter('sort')} style={hstyles.filterTypes}><MaterialCommunityIcons name="sort" style={hstyles.filterIcon}/><Text style={hstyles.filterText}>Sort</Text></TouchableOpacity>
                            <TouchableOpacity onPress={() => this._handlemodal('data')} style={hstyles.filterTypes}><MaterialCommunityIcons name="qrcode-scan" style={hstyles.filterIcon}/><Text style={hstyles.filterText}>Scan Product</Text></TouchableOpacity>
                    </View>

                <BarCodeModal visibile={this.state.barcodemodal} dismiss={this._onDismiss} sendData={this._onPressItem} />
                <ProductDetail visibile={this.state.productdetail} data={this.state.currentprod} dismiss={this._onDismiss} />

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
                ):(
                    <View style= {gstyles.emptyContainer}>
                        <Text style={{color:'rgb(0,0,0)',fontSize:24}}>{this.state.nodatatext}</Text>
                    </View>
                )}
                
            </Container>
		)
	}
}

export default Products;