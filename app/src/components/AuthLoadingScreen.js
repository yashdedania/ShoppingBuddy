import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import auth from '../api/Authorization';
import {setUserDetails} from '../actions/userActions';
import { connect } from 'react-redux';


class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);

  }
  componentDidMount = async() =>{
    this.authenticate() 
  }
  authenticate = async () =>{
    let userToken = '';
    try{
      let resp = await auth.protectedAuth();
      if (resp === false){//console.log('componentDidmount resp: ',false);
        console.log("Got false response");
        userToken = false;
      }    
      else if(resp !== null && resp.result !== null && resp.result !== undefined){
        console.log("Already Logged in... successfully authenticated from server side");
        userToken = await AsyncStorage.getItem('userToken');
        resp.result.user = JSON.parse(resp.result.user);
        console.log("Printing USer token now");
        console.log(userToken);
        console.log("Auth user");
        console.log(resp.result.user);
        this.props.setUserDetails(resp.result.user);
      }
      this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    }
    catch(error){
      console.log(err);
      this.props.navigation.navigate('Auth');
    }
  }
  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
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

export default (connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen));