import React, { Component } from "react";
import gstyles from '../../theme/styles/general';
import fstyles from '../../theme/styles/formstyles';
import styles from '../../theme/styles/requestsent';
import {List,ListItem,View,Left,Body,Text,Button,Input,Item,Label,Content,Picker,CheckBox} from 'native-base';
import {ImageBackground,Modal,TouchableOpacity} from 'react-native';
import color from "../../theme/color";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AlertAsync from "react-native-alert-async";
class UserModal extends Component {
    constructor(props){
        super(props);
        console.log("Printing props");
        console.log(props.data);
        this.state ={
            user:props.data === null ? {} : props.data,
            role:{value:props.data.role == null ? '' :props.data.role,err:false,helperText:''},
            accessTo:props.data.accessto == null ? [] : props.data.accessto,
            purchase_pending:(props.data.accessto == null) ? false : true,
            verify:(props.data.accessto == null)? false : true,
            unlink:(props.data.accessto == null) ? false : true,
            pass:{value:'',err:false,helperText:''},
            conpass:{value:'',err:false,helperText:''}
        }
        this._isMounted = false;
    }
    componentDidMount = () =>{
        this._isMounted = true;
    }
    componentWillUnmount =() =>{
        this._isMounted = false;
    }
    
    _handlechange = (name,text) =>{
        let errors = {...this.state};
        console.log(name,text);
        errors[name].value = text;
        if(name == 'role'){
            errors = this.validateRole(errors);
        }
        if(name == "pass"){
            errors = this.validate_Password(errors);
        }
        if(name == "conpass"){
            errors = this.validate_ConfirmPass(errors);
        }
        
        this.setState({...this.state,...errors});
        console.log(this.state.role);
    }
    validateRole = (errors) =>{
        if(errors.role.value.length === 0  || errors.role.value.toString().match(/\d+/g) != null){
            errors.role.helperText = 'Please select a valid Role'; errors.role.err = true;
          }
          else{
            errors.role.helperText = ''; errors.role.err = false; 
            
          }
        return errors;
    }
    validate_Password(errors){
        if (errors.pass.value != '' && errors.pass.value.length <= 8){
        errors.pass.helperText = 'Should be equal to or more than 8 characters'; errors.pass.err = true;
      }
      else if(errors.conpass.value.length != 0 && errors.conpass.value != errors.pass.value){
          errors.pass.helperText = 'The Password you entered do not match'; errors.pass.err = true;
      }
      else{
        errors.pass.helperText = ''; errors.pass.err = false;
      }
      return errors;
    }
    validate_ConfirmPass(errors){
        if (errors.pass.value != '' && errors.conpass.value.length <= 8){
        errors.conpass.helperText = 'Should be equal to or more than 8 characters'; errors.conpass.err = true;
      }
      else if(errors.pass.value != '' && errors.conpass.value != errors.pass.value){
          errors.conpass.helperText = 'The Password you entered do not match'; errors.conpass.err = true;
      }
      else{
        errors.conpass.helperText = ''; errors.conpass.err = false;
      }
      return errors;
    }
    _handlecheckchange = (name) =>{
        let extra = {...this.state};
        let flag;
        if(name == "Purchase Pending"){
            flag = extra.purchase_pending;
            extra.purchase_pending = !extra.purchase_pending;
        }
        else if(name == "Verify"){
            flag = extra.verify;
            extra.verify = !extra.verify;
        }
        else{
            flag = extra.unlink;
            extra.unlink = !extra.unlink;
        }
        console.log("-----printing flag---- "+flag);
        if(flag){
            // remove element from array
            console.log("------Removing Element----");
            extra.accessTo.splice(extra.accessTo.indexOf(name),1);
        }
        else{
            // add element if not present
            console.log("------adding element");
            if(extra.accessTo.indexOf(name) == -1){
                console.log("In if");
                extra.accessTo.push(name);
            }
        }
        this.setState({...this.state,...extra});
    }
    submitForm = async() =>{
        let errors = {...this.state};
        errors = this.validateRole(errors);
        errors = this.validate_Password(errors);
        errors = this.validate_ConfirmPass(errors);
        if(!errors.role.err){
            var choice = false;
            choice = await AlertAsync(
                'Verify User',
                'Are you sure you want to update this changes?',
                [
                {text:'Yes',onPress:() => true},
                {text:'No',onPress:() => false}
                ],
                {cancelable:false}
            );
            if(choice){
                this.props.update(errors);
            }
        }
        else{
            if(this._isMounted){
                errors = this.setState({...this.state,...errors});
            }
            
        }
        
    }
    setValues = () =>{
        console.log("Printing props in setValues");
        
        let extra = {
            user:this.props.data === null ? {} : this.props.data,
            role:{value:this.props.data.role == null ? '' :this.props.data.role,err:false,helperText:''},
            accessTo:this.props.data.accessto == null ? [] : this.props.data.accessto,
            purchase_pending:(this.props.data.accessto.indexOf("Purchase Pending") == -1) ? false : true,
            verify:(this.props.data.accessto.indexOf("Verify") == -1 )? false : true,
            unlink:(this.props.data.accessto.indexOf("Unlink") == -1 ) ? false : true,
            pass:{value:'',err:false,helperText:''},
            conpass:{value:'',err:false,helperText:''}
        }
        console.log(extra);
        this.setState({...this.state,...extra});
    }
    
    
    render() {
        return (
            <Modal visible={this.props.visibile}  animationType={'slide'} onShow={() => this.setValues()} onRequestClose={() => {console.log("Modal close")}}>
                <View style={styles.ModalContainer}><Text style={styles.Modaltitle}>User Details</Text><TouchableOpacity onPress={() => this.props.dismiss()}><MaterialCommunityIcons name='close-outline' style={styles.Modalclose}/></TouchableOpacity></View>
                <View style={gstyles.profileContainer}>
                    <View style={gstyles.profilecircle}>
                        <TouchableOpacity>
                            <ImageBackground  style={gstyles.profileBack} imageStyle={{borderRadius:50}} source={{uri:this.state.user.imageuri}}>
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
                            <Input disabled={true} value={this.state.user.username}  />
                        </Item>
                        </Body>
                    </ListItem>

                    <ListItem style={fstyles.formContainer}>
                        <Left style={fstyles.formLeft}><Label style={gstyles.inputlabel}>Email :</Label></Left>
                        <Body style={fstyles.formBody}>
                        <Item regular style={gstyles.ouritem}>
                            <Input disabled={true} keyboardType="email-address" value={this.state.user.email} />
                        </Item>
                        </Body>
                    </ListItem>

                    <ListItem style={fstyles.formContainer}>
                        <Left style={fstyles.formLeft}><Label style={gstyles.inputlabel}>Moile Number :</Label></Left>
                        <Body style={fstyles.formBody}>
                        <Item regular style={gstyles.ouritem}>
                            <Input disabled={true} keyboardType="numeric" maxLength={10} value={this.state.user.mobileno} />
                        </Item>
                        </Body>
                    </ListItem>

                    <ListItem style={fstyles.formContainer}>
                        <Left style={fstyles.formLeft}><Label style={gstyles.inputlabel}>Role :</Label></Left>
                        <Body style={fstyles.formBody}>
                            <Item regular style={gstyles.ouritem}>
                            <Picker
                                mode="dropdown"
                                selectedValue={this.state.role.value}
                                width={undefined}
                                onValueChange={(text) => this._handlechange('role',text)}
                            >
                                <Picker.Item label="Select Role" value="" />
                                <Picker.Item label="Purchaser" value="purchaser" />
                                <Picker.Item label="Seller" value="seller" />
                                <Picker.Item label="Purchaser + Seller" value="both" />
                            </Picker>
                            </Item>
                            <Text style={gstyles.helpertext}>{this.state.role.helperText}</Text>
                        </Body>
                    </ListItem>

                    <ListItem style={fstyles.formContainer}>
                        <Left style={fstyles.formLeft}><Label style={gstyles.inputlabel}>New Password :</Label></Left>
                        <Body style={fstyles.formBody}>
                        <Item regular style={gstyles.ouritem}>
                            <Input textContentType="password" secureTextEntry={true} value={this.state.pass.value} onChangeText={(text) =>this._handlechange('pass',text)}  />
                        </Item>
                        <Text style={gstyles.helpertext}>{this.state.pass.helperText}</Text>
                        </Body>
                        
                    </ListItem>


                    <ListItem style={fstyles.formContainer}>
                        <Left style={fstyles.formLeft}><Label style={gstyles.inputlabel}>Confirm New Password :</Label></Left>
                        <Body style={fstyles.formBody}>
                        <Item regular style={gstyles.ouritem}>
                            <Input textContentType="password" secureTextEntry={true} value={this.state.conpass.value} onChangeText={(text) =>this._handlechange('conpass',text)}  />
                        </Item>
                        <Text style={gstyles.helpertext}>{this.state.conpass.helperText}</Text>
                        </Body>
                        
                    </ListItem>


                    <ListItem style={fstyles.formContainer} onPress={() => this._handlecheckchange('Purchase Pending')}>
                        <CheckBox checked={this.state.purchase_pending} color={color.primary} />
                        <Body style={fstyles.formBody}>
                            <Text>Purchase Pending</Text>
                        </Body>
                    </ListItem>

                    <ListItem style={fstyles.formContainer} onPress={() => this._handlecheckchange('Verify')}>
                        <CheckBox checked={this.state.verify} color={color.primary} />
                        <Body style={fstyles.formBody}>
                            <Text>Verify</Text>
                        </Body>
                    </ListItem>

                    <ListItem style={fstyles.formContainer} onPress={() => this._handlecheckchange('Unlink')}>
                        <CheckBox checked={this.state.unlink} color={color.primary} />
                        <Body style={fstyles.formBody}>
                            <Text>Unlink</Text>
                        </Body>
                    </ListItem>

                    <ListItem style={{flex:1,justifyContent:'center',alignItems:'center',borderBottomWidth:0}}>
                        <Button onPress={() =>this.submitForm()}><Text>Update</Text></Button>
                    </ListItem>

                </List>
                </Content>
            </Modal>
        );
    }
}
  
export default UserModal
