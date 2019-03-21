import React, { Component } from 'react';
import { StyleProvider,Text,Content,Item,Button,Input,Icon,Spinner,Toast} from "native-base";
import {View,StyleSheet,Image,ImageBackground,AsyncStorage} from 'react-native';
import getTheme from '../../../native-base-theme/components';  //compulsory Imports
import material from '../../../native-base-theme/variables/material'; //compulsory Imports
import auth from '../../api/Authorization';
import {setUserDetails} from '../../actions/userActions';
import { connect } from 'react-redux';
const Logo  = require('../../../assets/ShoppingBuddy.png');
const PinkBack = require('../../../assets/static/pinkbackground.png');
import Loader from '../../components/Loader';

class Login extends Component {
	static navigationOptions = {
    // headerTitle instead of title
    header:null,
  };
  constructor(props) {
    super(props);
  
    this.state = {
      reg_username: { value: '', err: false, helperText: '',state:false},
      reg_pass: { value: '', err: false, helperText: '',state:false},
      loading:false
    };
  }
  _handlechange = (name,text) => {
    let errors = {...this.state};
    if(name == 'username'){
      errors.reg_username.value = text; errors = this.validate_UserName(errors);errors.reg_username.state = true;
    }
    if(name == 'password'){
      errors.reg_pass.value = text; errors = this.validate_Password(errors);errors.reg_pass.state = true;
    }
    this.setState({ ...this.state, ...errors });
  }
  validate_UserName(errors){
    if(errors.reg_username.value.length === 0  || errors.reg_username.value.toString().match(/\d+/g) != null){
      errors.reg_username.helperText = 'Please enter a correct name'; errors.reg_username.err = true;
    }
    else{
      errors.reg_username.helperText = ''; errors.reg_username.err = false; 
    }
    return errors;
  }
  validate_Password(errors){
    if (errors.reg_pass.value.length <= 8){
      errors.reg_pass.helperText = 'Should be equal to or more than 8 characters'; errors.reg_pass.err = true;
    }
    else{
      errors.reg_pass.helperText = ''; errors.reg_pass.err = false;
    }
    return errors;
  }
  validateInput(){
    //console.log(this.state);
    let errors = {...this.state, };
    errors = this.validate_UserName(errors); errors = this.validate_Password(errors);  
    let err_chk = false;
    for (var x in errors){
      if (errors[x].err === true)
        err_chk = true;
    }

    if (err_chk === false)
      this.login();
    else
      this.setState({ ...this.state, ...errors, });
  }
  async login(){
    console.log('Loging user...');
    this.setState({ ...this.state, loading: true, });
    //console.log(this.state);    
    let resp = await auth.login(this.state); //console.log('Register resp: ',resp);
    if (resp !== false){
      if (resp.status === 'error'){
        this.setState({ ...this.state, loading: false, });    
        //console.log('In first IF');
        Toast.show({text: resp.result,buttonText: "Okay",type: "warning"});
      }
      else{
        //console.log('In first else of login screen');
        //console.log(resp.result.user);
        this.props.setUserDetails(resp.result.user);
        this.setState({ ...this.state, loading: false, }); 
        Toast.show({text: "User successfully Logged in!",buttonText: "Okay",type: "success"});
        //console.log(resp.result.user);
        console.log("Auth Token:"+resp.auth_token);
        await AsyncStorage.setItem('userToken',resp.auth_token);
        this.props.navigation.navigate('Dashboard');
      }  
    }
    else{
      //console.log('In last else');
      this.setState({ ...this.state, loading: false, }); 
      Toast.show({text: "Couldn't communicate with server. Please try again",buttonText: "Okay",type: "danger"});   
      
    }
  }
  IconRender(field){
      if(!field.state){
        return null;
      }
      if(field.err){
        return (
          <Icon name='close-circle' />
        );
      }
      else{
        return (<Icon name='checkmark-circle' />
        );
      }
    }

    _onForgot = () =>{
        console.log("in In press forgot");
        this.setState({loading:true});
    }
	render(){
		return(
			<StyleProvider style={getTheme(material)}>
				<View style={styles.container}>
          <Loader loading = {this.state.loading} />
					<View style={styles.logoContainer}>
						<Image source={Logo} style={styles.logo} />
					</View>
					<View style={styles.loginForm}>
						  <View style={styles.formContainer}>
				          <Item rounded style={styles.inputFields} error={this.state.reg_username.state ? (this.state.reg_username.err ? true : false) : false} success={this.state.reg_username.state ? (this.state.reg_username.err ? false : true) : false}>
				            <Input placeholder='Username' textContentType="username" onChangeText={(text) => this._handlechange('username',text)}/>
                    {this.IconRender(this.state.reg_username)}
				          </Item>
				          <Text></Text>
				      </View>

				        <View style={styles.formContainer}>
				          <Item rounded style={styles.inputFields} error={this.state.reg_pass.state ? (this.state.reg_pass.err ? true : false) : false} success={this.state.reg_pass.state ? (this.state.reg_pass.err ? false : true) : false}>
				            <Input placeholder='Password' textContentType="password" secureTextEntry={true} onChangeText={(text) => this._handlechange('password',text)}/>
				            {this.IconRender(this.state.reg_pass)}
                  </Item>
				          <Text></Text>
				        </View>
                <View style={styles.formContainer}>
                  <Button full rounded style={styles.logBut} onPress={() => this.validateInput()}>
                    <Text style={styles.logtext}>SIGN IN</Text>
                  </Button>
                </View>
					</View>
          <View style={styles.signUpContainer}>
            <View style={styles.bottomRow1}><View style={styles.line}></View><Text style={styles.or}>OR</Text><View style={styles.line}></View></View>
						<View style={styles.bottomRow1} ><Text style={styles.forgot} onPress={() => this.props.navigation.navigate('RegisterScreen')}>Don't You Have Account?</Text><Text style={styles.signup} onPress={() => this.props.navigation.navigate('RegisterScreen')}>Sign Up</Text></View>
          </View>
					<ImageBackground style={styles.bottom} source={PinkBack}>
						{/*<View style={styles.bottomRow1}><Text style={styles.forgot1}>Forgot Password?</Text></View>*/}
					</ImageBackground>
				</View>
			</StyleProvider>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'column'
  },
  logoContainer:{
  	flex:1.5,
  	justifyContent:'center',
    alignItems:'center',
    paddingTop:20
  },
  inputFields:{
  	backgroundColor:'rgba(255, 255, 255, 1)',
    borderColor:'rgb(210, 211, 213)',
  },
  loginForm:{
  	flex:3,
  	justifyContent:'flex-start',
    alignItems:'flex-start',
    flexDirection:'column',
    paddingLeft:15,
    paddingRight:15,
    paddingTop:50
  },
  formContainer:{
    display:'flex',
    marginTop:15,
    marginBottom:15,
    justifyContent:'center',
    alignItems:'flex-start',
    width:'100%',
  },
  logBut:{
    backgroundColor:'rgba(0, 0, 0, 1)',
    width:'100%'
  },
  logtext:{
  	fontSize:20,
  	textAlign:'center'
  },
  signUpContainer:{
    flex:1,
    justifyContent:'space-between',
    flexDirection:'column',
  },
  bottom:{
    flex:1,
    width:'100%',
    height:'100%',
    justifyContent:'flex-end',
    alignItems:'center'
  },
  bottomRow1:{
  	display:'flex',
  	justifyContent:'center',
  	alignItems:'center',
    flexDirection:'row',
    marginTop:10,
    marginBottom:10
  },
  line:{
  	minHeight:1,
  	minWidth:100,
  	backgroundColor:'rgb(210, 211, 213)',
  	margin:5
  },
  or:{
  	fontSize:20,
  	color:'rgb(210, 211, 213)',
  	margin:5
  },
  forgot:{
  	fontSize:18,
  	color:'rgb(237, 51, 56)',
  	margin:5
  },
  forgot1:{
    fontSize:18,
    color:'rgb(255, 255, 255)',
    margin:5
  },
  signup:{
  	fontSize:20,
  	fontWeight:'bold',
  	color:'rgb(53, 53, 53)'
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

export default (connect(mapStateToProps, mapDispatchToProps)(Login));