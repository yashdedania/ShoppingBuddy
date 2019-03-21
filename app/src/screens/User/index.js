import {createStackNavigator} from 'react-navigation';
import UserAuthorization from './UserAuthorization';


const routes = {
	UserAuthorization:{
		screen: UserAuthorization,
		navigationOptions: ({ navigation }) => ({
		headerMode : 'none',
		header:null	
		})
	}

};
const routeconfig = {
	initialRouteName:"UserAuthorization",
	resetOnBlur: true,
	
}

export default createStackNavigator(routes,routeconfig);