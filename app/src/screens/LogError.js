import React, { Component } from 'react';
import {TouchableOpacity,StyleSheet} from 'react-native';
import {View,Text,Container,Content,Left,Body,Title,Toast,Right,Button,Item,Input} from 'native-base';
import hstyles from '../theme/styles/header';
import gstyles from '../theme/styles/general';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Loader from '../components/Loader';
import user from '../api/user';
class LogError extends Component {
    constructor(props) {
      super(props);
      this.state = {
        username:{value:'',err:false,helperText:''},
        screen:{value:'',err:false,helperText:''},
        description:{value:'',err:false,helperText:''},
        showToast: false,
        loading:false
      };
      this._isMounted = false;
    }
    componentDidMount = () =>{
      this._isMounted = true;
    }
    componentWillUnmount = () =>{
      this._isMounted = false;
    }
    _handlechange = (name,text) =>{
      let errors = {...this.state};
      errors[name].value = text;
      errors = this._validate(errors,name);
      if(this._isMounted){
        this.setState({...this.state,...errors});
      }
    }
    _validate = (errors,name) =>{
      if(errors[name].value == "" || errors[name].value.length === 0){
        errors[name].helperText = "Please fill the details properly";
        errors[name].err = true;
      }
      else{
        errors[name].err = false;
        errors[name].helperText = "";
      }
      return errors;
    }
    _sendForm = async() =>{
      let errors = {...this.state};
      errors = this._validate(errors,"username");
      errors = this._validate(errors,"screen");
      errors = this._validate(errors,"description");
      var err_chk = false;
      for (var x in errors){
        if(errors[x].err !== undefined && errors[x].err !== null ){
          if (errors[x].err === true){
            err_chk = true;
            break;
          }
        }   
      }
      if(!err_chk){
        errors.loading = true;
        await this.setState({...this.state,...errors});
        var resp = await user.sendMail(this.state);
        if (resp !== false){
          if (resp.status === 'error'){
            this.setState({ ...this.state, loading: false, });    
            Toast.show({text: resp.result,buttonText: "Okay",type: "warning"});
          }
          else{
            Toast.show({text: "Mail sent successfully!",buttonText: "Okay",type: "success"});
            this._reset();
          }  
        }
        else{
          this.setState({ ...this.state, loading: false, }); 
          Toast.show({text: "Couldn't communicate with server. Please try again",buttonText: "Okay",type: "danger"});   
        }
      }
      else{
        if(this._isMounted){
          this.setState({...this.state,...errors});
        }
      }
    }
    _reset = () =>{
      let extra = {
        username:{value:'',err:false,helperText:''},
        screen:{value:'',err:false,helperText:''},
        description:{value:'',err:false,helperText:''},
        showToast: false,
        loading:false
      };
      if(this._isMounted){
        this.setState({...this.state,...extra});
      }
      
    }
  	render(){
  		return(
  			<Container style={gstyles.container_background}>
          <View style={hstyles.header}>
            <View style={hstyles.headerContainer}>
              <Left style={hstyles.left}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Dashboard')}>
                  <MaterialCommunityIcons name="home" style={hstyles.icon} />
                </TouchableOpacity>
              </Left>
              <Body style={hstyles.body}>
                <Title style={hstyles.headtitle}>Report Error</Title>
              </Body>
              <Right style={hstyles.right} />
            </View>
          </View>
          <Loader loading = {this.state.loading} />
          <Content>
            <View style={styles.loginForm}>
                <View style={styles.formContainer}>
				          <Item style={styles.inputFields}>
				            <Input placeholder='Full Name' textContentType="username" value={this.state.username.value} onChangeText={(text) => this._handlechange('username',text)}/>
				          </Item>
				          <Text style={styles.helpertext}>{this.state.username.helperText}</Text>
				        </View>

                <View style={styles.formContainer}>
				          <Item style={styles.inputFields}>
				            <Input placeholder='Screen Name'  value={this.state.screen.value} onChangeText={(text) => this._handlechange('screen',text)}/>
				          </Item>
				          <Text style={styles.helpertext}>{this.state.screen.helperText}</Text>
				        </View>


                <View style={styles.formContainer}>
				          <Item style={styles.inputFields}>
				            <Input placeholder='Error Description' multiline={true} numberOfLines={5} value={this.state.description.value} onChangeText={(text) => this._handlechange('description',text)}/>
				          </Item>
				          <Text style={styles.helpertext}>{this.state.description.helperText}</Text>
				        </View>

                <View style={styles.formContainer}>
                      <Button full  style={styles.logBut} onPress={() => this._sendForm()}>
                        <Text style={styles.logtext}>Send Mail</Text>
                      </Button>
                </View>
          </View>
          </Content>
        </Container>
  		)
  	}
}

const styles = StyleSheet.create({
  loginForm:{
  	flex:3,
    marginTop:30,
  	justifyContent:'space-around',
  	alignItems:'center',
  	flexDirection:'column',
  },
  formContainer:{
    display:'flex',
    justifyContent:'center',
    width:'100%',
    alignItems:'flex-start',
    paddingLeft:25,
    paddingRight:25,
    marginTop:10,
    marginBottom:10
  },
  inputFields:{
  	backgroundColor:'rgba(255, 255, 255, 1)',
    borderWidth:5,
    width:'100%'
  },
  helpertext:{
  	fontSize:12,
  	paddingRight:10,
  	color:'rgb(225, 23, 23)'
  },
  logBut:{
  	backgroundColor:'rgba(0, 0, 0, 1)',
    width:'100%'
  },
  logtext:{
  	fontSize:20,
  	textAlign:'justify'
  }
});
export default LogError;