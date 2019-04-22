
import React, { Component } from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { Button, Item, Content, Input, Label } from 'native-base';
import styles from '../../theme/styles/requestsent';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AlertAsync from "react-native-alert-async";
import gstyles from '../../theme/styles/general';
import colors from '../../theme/color';
class BudgetModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      budget: { value: '', helperText: '', err: false }
    };
  }
  componentDidMount() {

  }

  setValues = () => {
    let extra = { ...this.state };
    extra.budget.value = parseInt(this.props.data.budget);
    this.setState({ ...this.state, ...extra });

  }
  _validateBudget(text) {
    let errors = { ...this.state };
    errors.budget.value = text;
    if (errors.budget.value.length === 0 || parseInt(errors.budget.value) < 100 || errors.budget.value.toString().match(/\D+[^0-9]/gm) != null) {
      errors.budget.err = true; errors.budget.helperText = "Please Enter a valid amount greater than 100";
    }
    else {
      errors.budget.err = false;
      errors.budget.helperText = "";
    }
    this.setState({ ...this.state, ...errors });
  }
  _handleBudget = async () => {
    if (this.state.budget.err) {
      choice = await AlertAsync(
        'Error',
        'Please Enter a valid amount greater than 100',
        [
          { text: 'Okay', onPress: () => true }
        ],
        { cancelable: true }
      );
    }
    else {
      this.props.onBudget(this.state.budget.value);
    }
  }
  render() {
    return (
      <Modal transparent={true} visible={this.props.visibile} animationType={'slide'} onShow={() => this.setValues()} onRequestClose={() => { console.log("Modal close") }}>
        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', width: undefined, justifyContent: 'center' }}>
          <View style={[styles.ModalContainer, { width: '80%', backgroundColor: 'rgb(248, 247, 247)' }]}><Text style={styles.Modaltitle}>Update Budget</Text><TouchableOpacity onPress={() => this.props.dismiss()}><MaterialCommunityIcons name='close-outline' style={styles.Modalclose} /></TouchableOpacity></View>
          <View style={{ display: 'flex', padding: 5, flexDirection: 'column', backgroundColor: 'rgb(248, 247, 247)', width: '80%' }}>
            <View style={{ display: 'flex', flexDirection: 'column', padding: 10, margin: 10 }}>
              <Item fixedLabel rounded style={{ width: undefined }}>
                <Label>Budget (Rs.) </Label>
                <Input placeholder='Budget' value={this.state.budget.value.toString()} onChangeText={(text) => this._validateBudget(text)} />
              </Item>
              <Text style={gstyles.helpertext}>{this.state.budget.helperText}</Text>
            </View>
            <Button full primary rounded style={{ marginTop: 10 }} onPress={() => this._handleBudget()}>
              <Text style={{ color: 'rgb(255,255,255)' }}>Update Budget</Text>
            </Button>
          </View>
        </View>
      </Modal>

    );
  }
}

export default BudgetModal;
