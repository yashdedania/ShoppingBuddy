import React, { Component } from 'react';
import {Alert,AsyncStorage} from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import auth from '../api/Authorization';
import AlertAsync from "react-native-alert-async";
class Logout extends Component {
	static navigationOptions = {
      drawerLabel:"Logout",
      drawerIcon:({tintColor}) => (
        <MaterialCommunityIcons name='logout' style={{fontSize:26}} />
      )
    };
    constructor(props) {
      super(props);
      this.state = {
        logout:''
      };
    }
  componentDidMount = async () => {
    console.log("------------mounting Logout");
    var choice = false;
    choice = await AlertAsync(
      'Logout',
      'Are you sure you want to Logout?',
      [
        {text:'Yes',onPress:() => true},
        {text:'No',onPress:() => false}
      ],
      {cancelable:false}
    );
    
    if(choice){
      this._logout()
    }
    else{
      this._nologout()
    }
  }
  _logout(){
    console.log("In Logout");
    let result = auth.logout().then(resp => {
      if(resp !== false){
        AsyncStorage.removeItem('userToken');
        this.props.navigation.navigate('AuthLoading');
      }
      else{
        AsyncStorage.removeItem('userToken');
        this.props.navigation.navigate('AuthLoading');
      }
    });
    
  }
  _nologout(){
    console.log("Navigating to Dashboard");
    this.props.navigation.navigate('Dashboard');
  }
  	render(){
  		return null;
  	}
}

export default Logout