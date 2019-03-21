import { Permissions, Notifications } from 'expo';
import React , { Component }from 'react';
import { connect } from 'react-redux';
import {SafeAreaView,ScrollView,Image} from 'react-native';
import {List,ListItem,View,Text,Left,Body,Right} from 'native-base';
import dstyles from '../theme/styles/dashboard';
import SocketIOClient from 'socket.io-client';
import urls from '../api/apivariable';
import user from '../api/user';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import {setUserDetails} from '../actions/userActions';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
class SideMenu extends Component {
	
	constructor(props) {
	  super(props);
		this.state = {
			currentroute:'Dashboard'
		};
		this._isMounted = false;
		this.socket = SocketIOClient(`${urls.SERVER_API}`+'/socket_activity');
	}
	componentDidMount = () =>{
		this._isMounted = true;
		/*Notifications.createChannelAndroidAsync('request', {
			name:'Request',
			sound:true,
			priority:'high'
		})
		console.log("----------------Drawer Mounted------------");
		this._socketConnect();
		this.registerForPushNotificationsAsync();
		this.detectNotifications = Notifications.addListener(this._handleNotifications);*/
		
        
	}
	
	componentWillUnmount = () =>{
		this._isMounted = false;
		console.log("----------------Drawer UnMounted------------");
		this._socketDisconnect();
		//this.detectNotifications.remove();

	}
	_socketConnect = () =>{
        this.socket.on('userUpdate',(data) => {
            console.log("Users Update received: "+data);
            if(this._isMounted){
                this.refetch();
            }   
		});
		
	}
	_socketDisconnect = () =>{
        this.socket.close();
        this.socket.disconnect();
	}
	/*_handleNotifications = (params) =>{
		console.log("--------Notification handling routing-------");

		if(params !== undefined && params !== null){
			if(params.origin == "selected"){
				if(params.data == "Purchase"){
					this.props.navigation.navigate('PurchaseRequests');
				}
				else{
					this.props.navigation.navigate('SalesRequests');
				}
			}
			
		}
	}
	sendNotifications = (message) =>{
		console.log("Send notification function");
		Notifications.presentLocalNotificationAsync(message);
	}
    
	registerForPushNotificationsAsync = async() => {
		if(this._isMounted){
		  const { status: existingStatus } = await Permissions.getAsync(
			Permissions.NOTIFICATIONS
		  );
		  let finalStatus = existingStatus;
		
		  // only ask if permissions have not already been determined, because
		  // iOS won't necessarily prompt the user a second time.
		  if (existingStatus !== 'granted') {
			// Android remote notification permissions are granted during the app
			// install, so this will only ask on iOS
			const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
			finalStatus = status;
			if(finalStatus == 'granted'){
			  let token = await Notifications.getExpoPushTokenAsync();
			  /*var resp = await user.storeNotToken({token:token});
			  if(resp !== false){
				if(resp.status == 'ok'){
				  console.log("Users token stored successfully");
				  if(this._isMounted){
					this.props.setUserDetails(resp.result);
				  }
				}
				else{
				  console.log("Error received");
				  console.log(resp);
				}
			  }
			  else{
				console.log("False data recieved");
			  } // This function is not included
			}
		  }
		
		  // Stop here if the user did not grant permissions
		  if (finalStatus !== 'granted') {
			return;
		  }
		
		  // Get the token that uniquely identifies this device
		  
		}
		
	  }*/
	refetch = async() =>{
		if(this._isMounted){
			var resp = await user.findAndUpdate({id:this.props.user.details.id});
			if(resp !== false){
				if(resp.status == 'ok'){
					console.log("In activity data received");
					this.props.setUserDetails(resp.result);
				}
				else{
					console.log("Error received");
					console.log(resp);
				}
			}
			else{
				console.log("False data recieved");
			}

		}
	}
	_navigate = (name,id) =>{
		let extra = {...this.state}
		extra.currentroute = name;
		this.setState({...this.state,...extra});
		this.props.navigation.navigate(name);
		
	}
	


	_checkRender = (name)=>{
		let role = this.props.user.details.role;
		//let accessto = this.props.user.details.accessto;
		//this._changeNavState("data");
		if(name == "Dashboard" || name == "Logout" || name == "Profile" || name == "LogError"){
			return 'flex';
		}
		if(name  == "UserAuthorization" && role == "admin"){
			return 'flex';
		} 
		else{
			return 'none';
		}
		

	}
	_toggleBar = (name) =>{
		let extra = {...this.state}
		extra[name] = !extra[name];
		if(this._isMounted){
			this.setState({...this.state,...extra});
		}
	}
	
render () {
		var cr = this.state.currentroute;
		var pr  = this.state.purchaseroutes;
		var sr = this.state.salesroutes;
		
    return (
      <SafeAreaView style={dstyles.safeView}>
				<View style={dstyles.logoview}>
						<Image key={new Date()} source={{uri:this.props.user.details.imageuri}} style={dstyles.logoImg}/>
						<Text style={dstyles.username}>{this.props.user.details.username}</Text>
						{/*<Text style={dstyles.role}>{this.props.user.details.role == "both" ? "Purchaser + Seller" : this.props.user.details.role}</Text>*/}
						<Text style={dstyles.role}>{this.props.user.details.role}</Text>
				</View>
			<ScrollView>
				<List>
					<ListItem style={[{display:this._checkRender('Dashboard')},dstyles.dListItem,cr == 'Dashboard' ? dstyles.dactBck:dstyles.dinactBck]} onPress={() => this._navigate('Dashboard','')}>
						<Left style={dstyles.dLeft}>
								<FontAwesome name="home" style={[dstyles.dIcon,cr == "Dashboard" ? dstyles.actCol : dstyles.inactCol]}/>
						</Left>
						<Body style={dstyles.dBody}>
								<Text style={[dstyles.dLabel,cr == "Dashboard" ? dstyles.actCol : dstyles.inactCol]}>Dashboard</Text>
						</Body>
						<Right style={dstyles.dRight} />
					</ListItem>


					<ListItem style={[{display:this._checkRender('Profile')},dstyles.dListItem,(cr == 'Profile') ? dstyles.dactBck:dstyles.dinactBck]} onPress={() => this._navigate('Profile','')}>
						<Left style={dstyles.dLeft} >
								<MaterialCommunityIcons name="face-profile" style={[dstyles.dIcon,(cr == "Profile") ? dstyles.actCol : dstyles.inactCol]}/>
						</Left>
						<Body style={dstyles.dBody}>
								<Text style={[dstyles.dLabel,(cr == "Profile") ? dstyles.actCol : dstyles.inactCol]}>Profile</Text>
						</Body>
						<Right style={dstyles.dRight} />
					</ListItem>


					<ListItem style={[{display:this._checkRender('UserAuthorization')},dstyles.dListItem,(cr == 'UserAuthorization') ? dstyles.dactBck:dstyles.dinactBck]} onPress={() => this._navigate('UserAuthorization','')}>
						<Left style={dstyles.dLeft} >
								<Feather name="user-check" style={[dstyles.dIcon,(cr == "UserAuthorization") ? dstyles.actCol : dstyles.inactCol]}/>
						</Left>
						<Body style={dstyles.dBody}>
								<Text style={[dstyles.dLabel,(cr == "UserAuthorization") ? dstyles.actCol : dstyles.inactCol]}>User Authorization</Text>
						</Body>
						<Right style={dstyles.dRight} />
					</ListItem>

					{/*<ListItem style={[{display:this._checkRender('LogError')},dstyles.dListItem,cr == 'LogError' ? dstyles.dactBck:dstyles.dinactBck]} onPress={() => this._navigate('LogError','')}>
						<Left style={dstyles.dLeft}>
								<MaterialIcons name="error" style={[dstyles.dIcon,cr == "LogError" ? dstyles.actCol : dstyles.inactCol]}/>
						</Left>
						<Body style={dstyles.dBody}>
								<Text style={[dstyles.dLabel,cr == "LogError" ? dstyles.actCol : dstyles.inactCol]}>Report Error</Text>
						</Body>
						<Right style={dstyles.dRight} />
					</ListItem>*/}

					<ListItem style={[{display:this._checkRender('Logout')},dstyles.dListItem,cr == 'Logout' ? dstyles.dactBck:dstyles.dinactBck]} onPress={() => this._navigate('Logout','')}>
						<Left style={dstyles.dLeft}>
								<FontAwesome name="power-off" style={[dstyles.dIcon,cr == "Logout" ? dstyles.actCol : dstyles.inactCol]}/>
						</Left>
						<Body style={dstyles.dBody}>
								<Text style={[dstyles.dLabel,cr == "Logout" ? dstyles.actCol : dstyles.inactCol]}>Logout</Text>
						</Body>
						<Right style={dstyles.dRight} />
					</ListItem>

					

					

				</List>
			</ScrollView>	
		</SafeAreaView>
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

export default (connect(mapStateToProps,mapDispatchToProps)(SideMenu))



