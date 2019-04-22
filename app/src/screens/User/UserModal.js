import React, { Component } from "react";
import gstyles from '../../theme/styles/general';
import fstyles from '../../theme/styles/formstyles';
import mstyles from '../../theme/styles/requestsent';
import { View, Body, Text, Button, Input, Item, Picker, CheckBox, Icon } from 'native-base';
import { ImageBackground, Modal, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import color from "../../theme/color";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import urls from "../../api/apivariable";
import AlertAsync from "react-native-alert-async";
class UserModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: { value: '', err: false, helperText: '', flag: false },
            email: { value: '', err: false, helperText: '', flag: false },
            mobileno: { value: '', err: false, helperText: '', flag: false },
            pass: { value: '', err: false, helperText: '', flag: false },
            confirmpass: { value: '', err: false, helperText: '', flag: false },
            user: props.data == null ? null : props.data
        }
        this._ismounted = false;
    }
    componentDidMount = () => {
        this._ismounted = true;
    }
    componentWillUnmount = () => {
        this._ismounted = false;
    }
    _handlechange = (name, text) => {
        let errors = { ...this.state };
        //console.log("name: "+name+" Value: "+text);
        if (name == 'username') {
            errors.username.value = text; errors = this.validate_UserName(errors); errors.username.flag = true;
        }
        if (name == 'email') {
            errors.email.value = text; errors = this.validate_Email(errors); errors.email.flag = true;
        }
        if (name == 'password') {
            errors.pass.value = text; errors = this.validate_Password(errors); errors.pass.flag = true;
        }
        if (name == 'confirmpass') {
            errors.confirmpass.value = text; errors = this.validate_ConfirmPass(errors); errors.confirmpass.flag = true;
        }
        if (name == 'mobileno') {
            errors.mobileno.value = text; errors = this.validate_Mobile(errors); errors.mobileno.flag = true;
        }
        /*if(name == 'role'){
            errors.role.value = text; errors=this.validate_role(errors);
        }*/
        this.setState({ ...this.state, ...errors });
    }

    validate_UserName(errors) {
        if (errors.username.value.length === 0) {
            errors.username.helperText = 'Please enter a correct name'; errors.username.err = true;
        }
        else {
            errors.username.helperText = ''; errors.username.err = false;
        }
        return errors;
    }
    validate_Email(errors) {
        if (errors.email.value.length === 0 || !(/^\S+@\w+([-]?\w+)*(\.\w{2,3})+$/.test(errors.email.value))) {
            errors.email.helperText = 'Please enter a correct Email Id'; errors.email.err = true;
        }
        else {
            errors.email.helperText = ''; errors.email.err = false;
        }
        return errors;
    }
    validate_Password(errors) {
        if (errors.pass.value != "" && errors.pass.value.length <= 8) {
            errors.pass.helperText = 'Should be equal to or more than 8 characters'; errors.pass.err = true;
        }
        else if (errors.confirmpass.value.length != 0 && errors.confirmpass.value != errors.pass.value) {
            errors.pass.helperText = 'The Password you entered do not match'; errors.pass.err = true;
        }
        else {
            errors.pass.helperText = ''; errors.pass.err = false;
        }
        return errors;
    }
    validate_ConfirmPass(errors) {
        if (errors.confirmpass.value != "" && errors.confirmpass.value.length <= 8) {
            errors.confirmpass.helperText = 'Should be equal to or more than 8 characters'; errors.confirmpass.err = true;
        }
        else if (errors.confirmpass.value != errors.pass.value) {
            errors.confirmpass.helperText = 'The Password you entered do not match'; errors.confirmpass.err = true;
        }
        else {
            errors.confirmpass.helperText = ''; errors.confirmpass.err = false;
        }
        return errors;
    }
    validate_Mobile(errors) {
        if (errors.mobileno.value.length === 0) {
            errors.mobileno.helperText = 'Please enter a correct Mobile No'; errors.mobileno.err = true;
        }
        else {
            errors.mobileno.helperText = ''; errors.mobileno.err = false;
        }
        return errors;
    }
    validateInput(name) {
        //console.log(this.state);
        let errors = { ...this.state };
        errors = this.validate_UserName(errors); errors = this.validate_Email(errors); errors = this.validate_Password(errors);
        errors = this.validate_ConfirmPass(errors); errors = this.validate_Mobile(errors); //errors = this.validate_role(errors);

        let err_chk = false;
        for (let x in errors) {
            console.log(x);
            if (errors[x] !== null && errors[x] !== undefined && errors[x].err !== null && errors[x].err !== undefined) {

                if (errors[x].err === true) {
                    err_chk = true;
                }
            }

        }
        //console.log("Printing states");
        //console.log(...this.state);
        if (err_chk === false)
            this.props.submitForm(name, this.state);
        else
            this.setState({ ...this.state, ...errors, });
    }
    IconRender(field) {
        if (!field.state) {
            return null;
        }
        if (field.err) {
            return (
                <Icon name='close-circle' />
            );
        }
        else {
            return (<Icon name='checkmark-circle' />
            );
        }
    }

    setValues = () => {
        //console.log("Set vlues called------------");
        let extra = {};
        //console.log(this.props.data);
        if (this.props.data !== undefined && this.props.data !== null && JSON.stringify(this.props.data).length != 2) {
            //console.log("printing props--------");
            let params = this.props.data;
            //console.log(params.username);
            extra = {
                username: { value: params.username == null ? '' : params.username, err: false, helperText: '' },
                email: { value: params.email == null ? '' : params.email, err: false, helperText: '' },
                mobileno: { value: params.mobileno == null ? '' : params.mobileno, err: false, helperText: '' },
                pass: { value: '', err: false, helperText: '' },
                confirmpass: { value: '', err: false, helperText: '' },
                user: params == null ? null : params
            }

        }
        else {
            console.log("----------No data recieved");
            extra = {
                username: { value: '', err: false, helperText: '', flag: false },
                email: { value: '', err: false, helperText: '', flag: false },
                mobileno: { value: '', err: false, helperText: '', flag: false },
                pass: { value: '', err: false, helperText: '', flag: false },
                confirmpass: { value: '', err: false, helperText: '', flag: false },
                user: null
            };
        }
        if (this._ismounted) {
            this.setState({ ...this.state, ...extra });
        }
    }

    _renderBlock = (name) => {
        if (this.state.user !== null && this.state.user !== undefined) {
            if (name === "Block" && this.state.user.verified === true) {
                return true;
            }
            else if (name === "Unblock" && this.state.user.verified === false) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
    _pressBlock = async (name) => {
        let choice = false;
        let heading = name + " User";
        let message = "Are you sure you want to " + name + " this user?";
        choice = await AlertAsync(
            heading,
            message,
            [
                { text: 'Yes', onPress: () => true },
                { text: 'No', onPress: () => false }
            ],
            { cancelable: false }
        );
        if (choice) {
            this.props.block(name, this.state);
        }
    }
    render() {
        return (
            <Modal visible={this.props.visibile} animationType={'slide'} onShow={() => this.setValues()} onRequestClose={() => { console.log("Modal close") }}>
                <View style={mstyles.ModalContainer}><Text style={mstyles.Modaltitle}>User Details</Text><TouchableOpacity onPress={() => this.props.dismiss()}><MaterialCommunityIcons name='close-outline' style={mstyles.Modalclose} /></TouchableOpacity></View>
                <View style={gstyles.profileContainer}>
                    <View style={gstyles.profilecircle}>
                        <TouchableOpacity>
                            <ImageBackground style={gstyles.profileBack} imageStyle={{ borderRadius: 50 }} source={{ uri: this.state.user === null ? urls.DEFAULT : this.state.user.imageuri }}>
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView keyboardDismissMode="none" keyboardShouldPersistTaps="always">
                    <View style={styles.loginForm}>
                        <View style={styles.formContainer}>
                            <Item rounded style={styles.inputFields} error={this.state.username.flag ? (this.state.username.err ? true : false) : false} success={this.state.username.flag ? (this.state.username.err ? false : true) : false}>
                                <Input placeholder='Username' textContentType="username" onChangeText={(text) => this._handlechange('username', text)} value={this.state.username.value} />
                                {this.IconRender(this.state.username)}
                            </Item>
                            <Text style={styles.helpertext}>{this.state.username.helperText}</Text>
                        </View>

                        <View style={styles.formContainer}>
                            <Item rounded style={styles.inputFields} error={this.state.pass.flag ? (this.state.pass.err ? true : false) : false} success={this.state.pass.flag ? (this.state.pass.err ? false : true) : false}>
                                <Input placeholder='Password' textContentType="password" secureTextEntry={true} onChangeText={(text) => this._handlechange('password', text)} value={this.state.pass.value} />
                                {this.IconRender(this.state.pass)}
                            </Item>
                            <Text style={styles.helpertext}>{this.state.pass.helperText}</Text>
                        </View>

                        <View style={styles.formContainer}>
                            <Item rounded style={styles.inputFields} error={this.state.confirmpass.flag ? (this.state.confirmpass.err ? true : false) : false} success={this.state.confirmpass.flag ? (this.state.confirmpass.err ? false : true) : false}>
                                <Input placeholder='Confirm Password' textContentType="password" secureTextEntry={true} onChangeText={(text) => this._handlechange('confirmpass', text)} value={this.state.confirmpass.value} />
                                {this.IconRender(this.state.confirmpass)}
                            </Item>
                            <Text style={styles.helpertext}>{this.state.confirmpass.helperText}</Text>
                        </View>

                        <View style={styles.formContainer}>
                            <Item rounded style={styles.inputFields} error={this.state.email.flag ? (this.state.email.err ? true : false) : false} success={this.state.email.flag ? (this.state.email.err ? false : true) : false}>
                                <Input placeholder='Email' textContentType="emailAddress" keyboardType="email-address" onChangeText={(text) => this._handlechange('email', text)} value={this.state.email.value} />
                                {this.IconRender(this.state.email)}
                            </Item>
                            <Text style={styles.helpertext}>{this.state.email.helperText}</Text>
                        </View>


                        <View style={styles.formContainer}>
                            <Item rounded style={styles.inputFields} error={this.state.mobileno.flag ? (this.state.mobileno.err ? true : false) : false} success={this.state.mobileno.flag ? (this.state.mobileno.err ? false : true) : false}>
                                <Input placeholder='Mobile Number' textContentType="telephoneNumber" keyboardType="numeric" maxLength={10} onChangeText={(text) => this._handlechange('mobileno', text)} value={this.state.mobileno.value} />
                                {this.IconRender(this.state.mobileno)}
                            </Item>
                            <Text style={styles.helpertext}>{this.state.mobileno.helperText}</Text>
                        </View>




                        <View style={styles.formContainer}>
                            <Button full primary rounded style={this.state.user == null ? styles.hidebut : styles.logBut} onPress={() => this.validateInput('Update')}>
                                <Text style={styles.logtext}>Update User</Text>
                            </Button>

                            <Button full danger rounded style={this._renderBlock("Block") ? styles.logBut : styles.hidebut} onPress={() => this._pressBlock('Block')}>
                                <Text style={styles.logtext}>Block User</Text>
                            </Button>

                            <Button full success rounded style={this._renderBlock("Unblock") ? styles.logBut : styles.hidebut} onPress={() => this._pressBlock('Unblock')}>
                                <Text style={styles.logtext}>Unblock User</Text>
                            </Button>

                            <Button full primary rounded style={this.state.user == null ? styles.logBut : styles.hidebut} onPress={() => this.validateInput('New User')}>
                                <Text style={styles.logtext}>Register New User</Text>
                            </Button>
                        </View>
                    </View>
                </ScrollView>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 800,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    logoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        paddingTop: 10
    },
    formContainer: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        alignItems: 'flex-start',
        paddingLeft: 25,
        paddingRight: 25,
        marginTop: 8,
        marginBottom: 8
    },
    checkContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 10,
        marginTop: 5,
        marginBottom: 5
    },
    inputFields: {
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderWidth: 5,
        width: '100%'
    },
    selectFields: {
        borderWidth: 10,
        width: '100%'
    },
    loginForm: {
        flex: 3,
        marginTop: 10,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'column',
    },
    helpertext: {
        fontSize: 12,
        paddingRight: 10,
        color: 'rgb(225, 23, 23)'
    },
    logBut: {
        width: '100%',
        marginTop: 8,
        marginBottom: 8
    },
    hidebut: {
        display: 'none'
    },
    logtext: {
        fontSize: 20,
        textAlign: 'justify'
    },
    bottom: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
    bottomRow1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingBottom: 10,
        flexDirection: 'row'
    },
    already: {
        fontSize: 18,
        color: 'rgb(255,255,255)',
        marginRight: 5
    },
    signin: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'rgb(53, 53, 53)'
    }
});

export default UserModal;
