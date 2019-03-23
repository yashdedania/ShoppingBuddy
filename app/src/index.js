
import React , { Component }from 'react';
import {View,StatusBar} from 'react-native';
import { Permissions } from 'expo';
import { createStackNavigator,createSwitchNavigator,createDrawerNavigator,createAppContainer} from 'react-navigation';
import Login from './screens/Authorization/Login';
import Register from './screens/Authorization/Register';
import AuthLoadingScreen from './components/AuthLoadingScreen';
import Logout from './components/Logout';
import {Root} from 'native-base';
import SideMenu from './components/CustomDrawer';
import { connect } from 'react-redux';
import UserAuthorization from './screens/User';
import Dashboard from './screens/Dashboard';
import Products from './screens/Products';
import color from './theme/color';
import LogError from './screens/LogError';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import OfflineNotice from './components/OfflineNotice';
import MyCart from './screens/MyCart';
import Profile from './screens/Profile';
import VerifyOrders from './screens/PreviousBills';
import MyOrders from './screens/MyOrders';
class Index extends Component {
	constructor(props) {
		super(props);
		this.state = {
		    isReady: false
		};
		console.log("Root Stack Loaded");
	}
	componentDidMount = async() =>{
		const cameraRollPerm = await Permissions.askAsync(Permissions.CAMERA,Permissions.CAMERA_ROLL);
	}
	render() {
		return(
    		<Root>
				<StatusBar barStyle="light-content" backgroundColor="#FF5964" />
				<OfflineNotice />
    			<RootStack />
    		</Root>
    	);
   
  }
}

const AuthStack = createStackNavigator(
	  {
	    LoginScreen:{screen:Login},
	    RegisterScreen:{screen:Register}
	  },{
	  	initialRouteName: "LoginScreen"
	  }
);


const AppStack = createDrawerNavigator(
			{  
				Dashboard:{
					screen: Dashboard,
					navigationOptions:{
						drawerLabel:"Dashboard",
						drawerIcon:({tintColor}) => (
						  <MaterialCommunityIcons name="home" style={{fontSize:26,color:tintColor}} />
						)
					}
				},				
				Profile:{
					screen: Profile,
					navigationOptions:{
						drawerLabel:"Profile",
						drawerIcon:({tintColor}) => (
						  <MaterialCommunityIcons name="face-profile" style={{fontSize:26,color:tintColor}} />
						)
					}
				},
				LogError:LogError,
				UserAuthorization:UserAuthorization,
				Products:Products,
				MyCart:MyCart,
				VerifyOrders:VerifyOrders,
				MyOrders:MyOrders,
				Logout:Logout
			},
			{	
				initialRouteName: 'Dashboard',
				unmountInactiveRoutes: true,
				contentComponent:SideMenu,
				contentOptions:{
					activeTintColor:color.primary
				}
			}
		);

const RootStack = createAppContainer(createSwitchNavigator(
			{
				AuthLoading: AuthLoadingScreen,
		    	App: AppStack,
		    	Auth: AuthStack,
			},
			{
				initialRouteName: 'AuthLoading',
			}
));


const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default (connect(mapStateToProps)(Index))