import React, { Component } from "react";
import { connect } from 'react-redux';
import gstyles from '../../theme/styles/general';
import fstyles from '../../theme/styles/formstyles';
import styles from '../../theme/styles/requestsent';
import url  from "../../api/apivariable";
import {List,ListItem,ActionSheet,View,Left,Body,Text,Button,Input,Item,Label,Content} from 'native-base';
import {ImageBackground,Modal,TouchableOpacity} from 'react-native';
import { ImagePicker, Permissions } from 'expo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import color from "../../theme/color";
const BUTTONS = [
    {text:"Camera",icon:"aperture",iconColor:'#ea943b',index:0},
    {text:"Gallery",icon:"image",iconColor:'#f42ced',index:1},
    {text:"Remove",icon:"trash",iconColor:color.danger,index:2},
    {text:"Cancel",icon:"close",iconColor:color.success,index:3}
]
class Profile extends Component {
    constructor(props){
        super(props);
        const user = props.user.details;
        this.state ={
            username:{value:user.username == undefined ? '' : user.username,err:false,helperText:''},
            newpass:{value:'',err:false,helperText:''},
            confirmnewpass:{value:'',err:false,helperText:''},
            mobileno:{value:user.mobileno === undefined ? '' : user.mobileno,err:false,helperText:''},
            email:{value:user.email === undefined ? '' : user.email,err:false,helperText:'' },
            currentimage:user.imageuri,
            newimage : null,
        }
        this._isMounted = false;
    }
    componentDidMount = () =>{
        this._isMounted = true;
    }
    componentWillUnmount =() =>{
        this._isMounted = false;
    }
    _reset = () =>{
        let extra = {...this.state};
        extra.newpass = {value:'',err:false,helperText:''};
        extra.confirmnewpass = {value:'',err:false,helperText:''};
        extra.newimage = null;
        if(this._isMounted){
            this.setState({...this.state,...extra});
        }
        
    }
    _handlechange = (name,text) =>{
        let errors = {...this.state};
        errors[name].value = text;
        if(name == 'username'){
            errors = this._validateUsername(errors);
        }
        if(name == 'newpass'){
            errors = this._validateNewpass(errors);
        }
        if(name == 'confirmnewpass'){
            errors = this._validateConfirmpass(errors);
        }
        if(name == 'email'){
            errors = this._validateEmail(errors);
        }
        if(name == 'mobileno'){
            errors = this._validateMobile(errors);
        }
        this.setState({...this.state,...errors});
    }
    _handleImageChange = () =>{
        console.log("IMage change");
        ActionSheet.show(
            {
              options: BUTTONS,
              cancelButtonIndex:3,
              title: "Select Options"
            },
            buttonIndex => {
                this._pickImage(BUTTONS[buttonIndex]);
 
            }
          );
        
    }
    _validateUsername(errors){
        if(errors.username.value.length === 0  || errors.username.value.toString().match(/\d+/g) != null){
            errors.username.helperText = 'Please enter a correct name'; errors.username.err = true;
        }
        else{
            errors.username.helperText = ''; errors.username.err = false; 
        }
        return errors;
    }
    _validateNewpass(errors){
        if (errors.newpass.value != '' && errors.newpass.value.length <= 8){
            errors.newpass.helperText = 'Should be equal to or more than 8 characters'; errors.newpass.err = true;
          }
          else if(errors.confirmnewpass.value.length != 0 && errors.confirmnewpass.value != errors.newpass.value){
              errors.newpass.helperText = 'The Password you entered do not match'; errors.newpass.err = true;
          }
          else{
            errors.newpass.helperText = ''; errors.newpass.err = false;
          }
          return errors;
    }
    _validateConfirmpass(errors){
        if (errors.confirmnewpass.value != '' && errors.confirmnewpass.value.length <= 8){
            errors.confirmnewpass.helperText = 'Should be equal to or more than 8 characters'; errors.confirmnewpass.err = true;
          }
          else if(errors.confirmnewpass.value != errors.newpass.value){
              errors.confirmnewpass.helperText = 'The Password you entered do not match'; errors.confirmnewpass.err = true;
          }
          else{
            errors.confirmnewpass.helperText = ''; errors.confirmnewpass.err = false;
          }
          return errors;
    }
    _validateMobile(errors){
        if (errors.mobileno.value.length === 0 && errors.mobileno.value.toString().match(/\D+[^0-9]/gm) != null){
            errors.mobileno.helperText = 'Please enter a correct Mobile No'; errors.mobileno.err = true;
          }
          else{
            errors.mobileno.helperText = ''; errors.mobileno.err = false;
          }   
          return errors;
    }
    _validateEmail(errors){
        if (errors.email.value.length === 0 || !(/^\S+@\w+([-]?\w+)*(\.\w{2,3})+$/.test(errors.email.value)) ){
            errors.email.helperText = 'Please enter a correct Email Id'; errors.email.err = true;
          }
          else{
            errors.email.helperText = ''; errors.email.err = false;
          }
          return errors;
    }
    _pickImage = async(option) =>{
        console.log(option);
        var options = {
            allowsEditing: true,
            mediaTypes:'Images',
            quality:0.7,
            aspect: [4, 3]
        };
        var pickerResult;
        if(option.index == 2){
            this.setState({newimage:null,currentimage:null});
        }
        else if(option.index == 0 || option.index == 1){
            const cameraRollPerm = await Permissions.askAsync(Permissions.CAMERA,Permissions.CAMERA_ROLL);
            if(cameraRollPerm.status === 'granted'){
                if(option.index == 0){
                    pickerResult = await ImagePicker.launchCameraAsync(options);
                }
                else{
                   pickerResult =  await ImagePicker.launchImageLibraryAsync(options)
                }
            }
            if(pickerResult !== undefined && pickerResult != ''){
                if(!pickerResult.cancelled){
                    this.setState({currentimage:pickerResult.uri,newimage:pickerResult});
                }
                else{
                    this.setState({newimage:null});
                }
                //console.log("Printing base64 image data");
                //console.log(pickerResult);
            }
        }
    }
    submitForm = async() =>{
        let errors = {...this.state};
        errors = this._validateUsername(errors); errors = this._validateNewpass(errors);
        errors = this._validateConfirmpass(errors); errors = this._validateEmail(errors);
        errors = this._validateMobile(errors);
        let err_check = false;
        for (x in errors){
            if( x !== 'currentimage' && x != 'newimage' && errors[x].err !== null && errors[x].err !== undefined){
                console.log(x);
                if(errors[x].err === true){
                    err_check = true;
                    break;
                }
            }  
        }
        if(err_check === false){
            let user = {};
            user.id = this.props.user.details.id;
            if(errors.username.value != ''){
                user.username = errors.username.value;
            }
            if(errors.newpass.value != ''){
                user.newpass = errors.newpass.value;
            }
            if(errors.email.value != ''){
                user.email = errors.email.value;
            }
            if(errors.mobileno.value != ''){
                user.mobileno = errors.mobileno.value;
            }
            user.currentimage = errors.currentimage;
            user.newimage = errors.newimage;
            console.log("Printing user details before submiting");
            console.log(user);
            let formData = new FormData();
            if(errors.newimage !== null && errors.newimage != ''){
                let uriParts = errors.newimage.uri.split('.');
                let fileType = uriParts[uriParts.length - 1];
                let fileName = this.props.user.details.id+'.'+fileType;
                formData.append('photo',{
                    uri:errors.newimage.uri,
                    name: fileName,
                    type: `image/${fileType}`,
                });
            }
            formData.append('user',JSON.stringify(user));
            this.props.sendData(formData);
        }
        else{
            this.setState({...this.state,...errors});
        }
        
    }
    
    
    render() {
        return (
            <Modal visible={this.props.visibile}  animationType={'slide'} onShow={() =>{this._reset()}} onRequestClose={() => {console.log("Modal close")}}>
                <View style={styles.ModalContainer}><Text style={styles.Modaltitle}>User Details</Text><TouchableOpacity onPress={() => this.props.dismiss()}><MaterialCommunityIcons name='close-outline' style={styles.Modalclose}/></TouchableOpacity></View>
                
                <View style={gstyles.profileContainer}>
                    <View style={gstyles.profilecircle}>
                        <TouchableOpacity onPress={() => this._handleImageChange()}>
                            <ImageBackground  style={gstyles.profileBack} imageStyle={{borderRadius:50}} source={{uri:this.state.currentimage == null ? `${url.DEFAULT}`: this.state.currentimage,cache:'reload'}}>
                                <MaterialCommunityIcons name="camera" style={gstyles.profileIcon} />
                            </ImageBackground>
                        </TouchableOpacity>    
                    </View>
                </View>
                <Content>
                <List style={{padding:10}}>
                    
                    <ListItem style={fstyles.formContainer}>
                        <Left style={fstyles.formLeft}><Label style={gstyles.inputlabel}>Username :</Label></Left>
                        <Body style={fstyles.formBody}>
                        <Item regular style={gstyles.ouritem}>
                            <Input textContentType="username" value={this.state.username.value}  onChangeText={(text) => this._handlechange('username',text)}   />
                        </Item>
                        <Text style={gstyles.helpertext}>{this.state.username.helperText}</Text>
                        </Body>
                    </ListItem>

                    <ListItem style={fstyles.formContainer}>
                        <Left style={fstyles.formLeft}><Label style={gstyles.inputlabel}>New Password :</Label></Left>
                        <Body style={fstyles.formBody}>
                        <Item regular style={gstyles.ouritem}>
                            <Input placeholder='Password' textContentType="password" secureTextEntry={true} value={this.state.newpass.value}  onChangeText={(text) => this._handlechange('newpass',text)}   />
                        </Item>
                        <Text style={gstyles.helpertext}>{this.state.newpass.helperText}</Text>
                        </Body>
                    </ListItem>

                    <ListItem style={fstyles.formContainer}>
                        <Left style={fstyles.formLeft}><Label style={gstyles.inputlabel}>Confirm New Password :</Label></Left>
                        <Body style={fstyles.formBody}>
                        <Item regular style={gstyles.ouritem}>
                            <Input placeholder='Confirm Password' textContentType="password" secureTextEntry={true} value={this.state.confirmnewpass.value}  onChangeText={(text) => this._handlechange('confirmnewpass',text)}   />
                        </Item>
                        <Text style={gstyles.helpertext}>{this.state.confirmnewpass.helperText}</Text>
                        </Body>
                    </ListItem>

                    <ListItem style={fstyles.formContainer}>
                        <Left style={fstyles.formLeft}><Label style={gstyles.inputlabel}>Email :</Label></Left>
                        <Body style={fstyles.formBody}>
                        <Item regular style={gstyles.ouritem}>
                            <Input textContentType="emailAddress" keyboardType="email-address" value={this.state.email.value}  onChangeText={(text) => this._handlechange('email',text)}   />
                        </Item>
                        <Text style={gstyles.helpertext}>{this.state.email.helperText}</Text>
                        </Body>
                    </ListItem>

                    <ListItem style={fstyles.formContainer}>
                        <Left style={fstyles.formLeft}><Label style={gstyles.inputlabel}>Moile Number :</Label></Left>
                        <Body style={fstyles.formBody}>
                        <Item regular style={gstyles.ouritem}>
                            <Input textContentType="telephoneNumber" keyboardType="numeric" maxLength={10} value={this.state.mobileno.value}  onChangeText={(text) => this._handlechange('mobileno',text)}   />
                        </Item>
                        <Text style={gstyles.helpertext}>{this.state.mobileno.helperText}</Text>
                        </Body>
                    </ListItem>

                    <ListItem style={{flex:1,justifyContent:'center',alignItems:'center',borderBottomWidth:0}}><Button onPress={() =>this.submitForm()}><Text>Update Details</Text></Button></ListItem>
                </List>
                </Content>
            </Modal>
        );
    }
}
const mapStateToProps = (state) => {
    return {
      user: state.user,
    };
  };
  
export default (connect(mapStateToProps)(Profile))
