import React, { Component } from 'react';
import {TouchableOpacity,FlatList,RefreshControl,Keyboard,NativeModules, processColor} from 'react-native';
import styles from '../../theme/styles/staff_list';
import hstyles from '../../theme/styles/header';
import gstyles from '../../theme/styles/general';
import Loader from '../../components/Loader';
import {Container, View,Content, ListItem, Text, Thumbnail,Left,Right,Body,Title,Input} from 'native-base';
import user from '../../api/user';
import auth from '../../api/Authorization';
import format from '../../components/dateformat';
import searchData from '../../api/searchfilter';
import * as Animatable from 'react-native-animatable';
import _ from 'lodash';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import colors from '../../theme/color';
import UserModal from './UserModal';
const { StatusBarManager } = NativeModules;
import AlertAsync from "react-native-alert-async";


class UserAuthorization extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            listArray:[],
            fullData:[],
            loading:false,
            refreshing:false,
            nodatatext:'',
            blur: false,
            query:'',
            searchbarVisible:false,
            searchBarFocused:false,
            staffModal:false,
            currentData:null,
            usermodal:false
        }
        this._isMounted = false;
        
    }
    componentDidMount = () =>{
        this._isMounted = true;
        if(this._isMounted){
            this.setState({loading:true});
            this._fetchData();
        }
        this.didBlurSubscription = this.props.navigation.addListener(
            'didBlur',
            payload => {
                if(this._isMounted){
                    this.setState({blur:true});
                }
              
            }
        );
        this.willFocusSubscription = this.props.navigation.addListener(
            'willFocus',
            payload => {
              if(this.state.blur){
                  if(this._isMounted){
                    this.setState({blur:false,loading:true});
                    this._fetchData();
                  }   
              }
            }
        );
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this._keyboardWillShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);   
    }
    componentWillUnmount = () =>{
        this._isMounted = false;
        this.didBlurSubscription.remove();
        this.willFocusSubscription.remove();
        this.keyboardDidShowListener.remove();
        this.keyboardWillShowListener.remove();
        this.keyboardDidHideListener.remove();
    }
    _fetchData = async() =>{
        let extra ={...this.state};
        var resp = await user.findAllUser({page:'auth',verified:false});

        extra.loading = false;
        extra.refreshing = false;
        if(resp !== false){
            if(resp.status == 'ok'){
                console.log("In activity data received");
                if(resp.result.length > 0 ){
                    console.log(" Yeah data received have length: "+resp.result.length);
                    extra.listArray = resp.result;
                    extra.fullData = resp.result;
                }
                else{
                    extra.nodatatext = 'No data Available';
                }    
            }
            else{
                extra.nodatatext = 'No data Available';
                console.log("Error received");
                console.log(resp);
            }
        }
        else{
            extra.nodatatext = 'No data Available';
            console.log("False data recieved");
        }
        if(this._isMounted){
            this.setState({...this.state,...extra});
        }
    }
    _onRefresh = () =>{
        if(this._isMounted){
            this.setState({refreshing:true});
            this._fetchData();
        }
    }
    _renderItem = ({item}) =>(
                <ListItem  style={styles.ItemContainer} onPress={() => this._openModal(item,"normal")}>
                    <Left style={styles.ItemLeft}>
                        <View style={styles.thumbnailContainer}>
                            <Thumbnail source = {{uri:item.imageuri}} />
                        </View>   
                    </Left>
                    <Body style={styles.ItemBody}>
                        <Text>{item.username}</Text>
                        <Text note>{item.email}</Text>
                        <Text note style={styles.verified}>{item.verified ? '' : 'Blocked'}</Text>

                      </Body>
                      <Right style={styles.ItemRight}>
                        <Text note>{format.Time(item.createdAt)}</Text>
                        <MaterialCommunityIcons name="chevron-right" style={styles.ItemRightIcon} />
                      </Right>
                </ListItem>
    );
    _openModal = (params,name) =>{
        let extra = {...this.state};
        if(name == "new" && params == null){
            extra.currentData = null;
            extra.staffModal = true;
            console.log("--------------new user request sent");
        }
        else{
            extra.currentData = params;
            extra.staffModal = true;
            console.log("Normal params");
        }
        if(this._isMounted){    

            this.setState({...this.state,...extra});
        }
    }
    _onDismiss =()=>{
        let extra = {...this.state};
        extra.currentData = null;
        extra.staffModal = false;
        if(this._isMounted){    
            this.setState({...this.state,...extra});
        }
    }
    _onUpdate = async(params) =>{
        if(this._isMounted){
            let errors = {...this.state};
            var resp = await user.singleUpdate(params);
            errors.staffModal = false;
            errors.currentData = null;
            errors.loading = false;
            if(resp !== false){
                if(resp.status == 'ok'){
                    console.log("In activity data received");
                    errors.refreshing = true;
                }
                else{
                    console.log("error recieved");
                }
            }
            else{
                console.log("False data recieved");
            }
            if(this._isMounted){
                this.setState({...this.state,...errors});
                this._fetchData();
            }
        }

    }
    
    _keyboardDidShow = () =>{
        if(this._isMounted && this.state.searchbarVisible){
            this.setState({searchBarFocused:true});
        }
    }
    _keyboardWillShow = () =>{
        if(this._isMounted && this.state.searchbarVisible){
            this.setState({searchBarFocused:true});
        }
    }
    _keyboardDidHide = () =>{
        if(this._isMounted){
            this.setState({searchBarFocused:false});
        }    
    }

    _onSubmit = (name,data) =>{
        data.page = "normal";
        this.setState({loading:true});
        if(name == "Update"){

            this._onUpdate(data);
        }
        else{
            this._onRegister(data);
        }
        this._onDismiss();
    }
    _onRegister = async(params) =>{
        let message = "";
        let resp = await auth.register(params); //console.log('Register resp: ',resp);
        if (resp !== false){
            if (resp.status === 'error'){
                message = resp.result;    
                //console.log('In first IF');
                //Toast.show({text: resp.result,buttonText: "Okay",type: "warning"});
            }
            else{
                //console.log('In first else');
                message = "User successfully registered!";
                //Toast.show({text: "User successfully registered!",buttonText: "Okay",type: "success"});
                //this.props.navigation.navigate('LoginScreen');
            }  
        }
        else{
        //console.log('In last else');
            message = "Couldn't communicate with server. Please try again";
        
        }
        await this._fetchData();
        this.setState({loading:false});
        choice = await AlertAsync(
            'Response',
            message,
            [
            {text:'Okay',onPress:() => true}
            ],
            {cancelable:true}
        );
    }
    _handleSearch = async(text) =>{
        let extra = {...this.state};
        extra.query = text;
        await this.setState({...this.state,...extra});
        this._searchQuery();
    }
    _searchQuery = ()=>{
        let extra = {...this.state};
        const formatText = extra.query.toLowerCase();
        const data = _.filter(this.state.fullData,chemical => {
            return searchData.userContains(chemical,formatText);
        });
        if(data === null || data.length <= 0){
            extra.nodatatext = "No Data Available"
        }
        if(this._isMounted){
            extra.listArray = data;
            this.setState({...this.state,...extra});
        }
    }
    _showSearch = () =>{
        if(this._isMounted){
            this.setState({searchbarVisible : true});
        }
        this.view.transitionTo({backgroundColor:colors.background});
        StatusBarManager.setStyle('dark-content');
        StatusBarManager.setColor(processColor('#E0E0E0'),true);
    }
    _clearSearch = async() =>{
        console.log("Clear search excuted");
        if(this._isMounted){
            await this.setState({query:''});
        }
        this._searchQuery();
    }
    _hideSearch = async() =>{
        let extra = {...this.state};
        extra.query = '';
        extra.searchbarVisible = false;
        if(this._isMounted){
            await this.setState({...this.state,...extra});
        }
        this.view.transitionTo({backgroundColor:colors.primary});
        StatusBarManager.setStyle('light-content');
        StatusBarManager.setColor(processColor('#FF5964'),true);
        this._searchQuery();
    }
    _block = async(name,data) =>{
        data.page = "block";
        data.name = name;
        if(this._isMounted){
            this.setState({loading:true});
            let errors = {...this.state};
            var resp = await user.singleUpdate(data);
            errors.staffModal = false;
            errors.currentData = null;
            errors.loading = false;
            if(resp !== false){
                if(resp.status == 'ok'){
                    console.log("In activity data received");
                    //errors.refreshing = true;
                }
                else{
                    console.log("error recieved");
                }
            }
            else{
                console.log("False data recieved");
            }
            if(this._isMounted){
                this.setState({...this.state,...errors});
                this._fetchData();
            }
        }

    }
    handleViewRef = ref => this.view = ref;
    render() {
        return (
            <Container>
                <UserModal visibile={this.state.staffModal} data={{...this.state.currentData}} dismiss={this._onDismiss} submitForm={this._onSubmit} block={this._block}/>
                <Animatable.View ref={this.handleViewRef}  style={hstyles.header}>
                        <View style={[hstyles.headerContainer,this.state.searchbarVisible ? hstyles.lightbackground : hstyles.darkbackground]}>
                        <Left style={hstyles.left}>
                            {!!this.state.searchbarVisible ? (
                                <TouchableOpacity onPress={() => this._hideSearch()}>
                                   <Animatable.View animation="rotate" duration={500}><MaterialCommunityIcons  name="arrow-left" style={hstyles.darkicon}/></Animatable.View>
                                </TouchableOpacity>
                            ):(
                                <TouchableOpacity onPress={() => this._openModal(null,"new")}>
                                    <MaterialCommunityIcons name="account-plus" style={hstyles.icon} />
                                </TouchableOpacity>
                            )}  
                        </Left>
                        <Body style={hstyles.body}>
                            {!!this.state.searchbarVisible ? (
                               <Input style={hstyles.inputField} placeholder="Search"  onChangeText={(text) => this._handleSearch(text)} value={this.state.query} /> 
                            ):(
                                <Title style={hstyles.headtitle}>User List</Title>
                            )}
                            
                        </Body>
                        <Right style={hstyles.right}>
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
                        </Right>
                        </View>
                </Animatable.View>
                
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
        );
    }
}
export default UserAuthorization;
