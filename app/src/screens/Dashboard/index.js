import React from 'react';
import {createStackNavigator,createAppContainer} from 'react-navigation';
import Home from './Home';

const routes = {
	Home:{
		screen:Home,
		navigationOptions: ({ navigation }) => ({
		headerMode : 'none',
		header:null	
	})

	}
};
const routeconfig = {
	initialRouteName:"Home",
	resetOnBlur: true,
	navigationOptions: ({ navigation }) => ({
		headerMode : 'none',
		header:null	
	})
}

export default createAppContainer(createStackNavigator(routes,routeconfig));