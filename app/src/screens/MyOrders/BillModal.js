
import React,{Component} from 'react';
import {View,Text,Modal,TouchableOpacity,FlatList} from 'react-native';
import {Button,Item,Content,Input,Left,Right,Body,List,ListItem} from 'native-base';
import styles from '../../theme/styles/requestsent';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AlertAsync from "react-native-alert-async";
import colors from '../../theme/color';
class BillModal extends Component{
    constructor(props) {
      super(props);
       console.log("-----------in constructor========");
       console.log(this.props.data);
      this.state = {
        total:0,
      };
    }
    componentDidMount(){

    }
    
    
    calculate = () =>{

        let total = 0;
        if(this.props.data !== null && this.props.data !== undefined && this.props.data.products !== null && this.props.data.products !== undefined){
            let length = (this.props.data !== null && this.props.data !== undefined && this.props.data.products !== null && this.props.data.products !== undefined) ? this.props.data.products.length : 0;
            let products = (this.props.data !== null && this.props.data !== undefined && this.props.data.products !== null && this.props.data.products !== undefined) ? this.props.data.products : [];
            let order = (this.props.data !== null && this.props.data !== undefined) ? this.props.data : null;
            for (i=0;i<length;i++){
                total += parseInt(products[i].amount) * parseInt(order.quantity[products[i].id]);
            }
            
            return total;
        }
        else{
            return null;
        }
        
    }
    _renderItem = ({item}) =>{
        if(this.props.data !== null && this.props.data !== undefined){
            return(
                <ListItem>
                    <Left><Text>{item.name}</Text></Left>
                    <Body><Text>{this.props.data.quantity[item.id]}</Text></Body>
                    <Right><Text>{parseInt(this.props.data.quantity[item.id]) * parseInt(item.amount)}</Text></Right>
                </ListItem>
            )
        }
        else{
            return null;
        }
    }
    checkbill = () =>{
        if(this.props.data !== null & this.props.data !== undefined && this.props.paid === false){
            return true;
        }
        else{
            return false;
        }
    }
    render(){
        if(this.props.data !== undefined && this.props.data !== null){
           return(
            <Modal visible={this.props.visibile}  animationType={'slide'}  onRequestClose={() => {console.log("Modal close")}}>
                <View style={styles.ModalContainer}><Text style={styles.Modaltitle}>Order Details</Text><TouchableOpacity onPress={() => this.props.dismiss()}><MaterialCommunityIcons name='close-outline' style={styles.Modalclose}/></TouchableOpacity></View>
                <Content>
                    <List>
                        <ListItem itemDivider>
                            <Left><Text style={styles.listItemheader}>Product Name</Text></Left>
                            <Body><Text style={styles.listItemheader}>Quantity</Text></Body>
                            <Right><Text style={styles.listItemheader}>Amount</Text></Right>
                        </ListItem>
                    </List>
                    
                        {(this.props.data !== null && this.props.data !== undefined && this.props.data.products !== null && this.props.data.products !== undefined && this.props.data.products.length > 0) ? (<FlatList
                        data={this.props.data.products}
                        renderItem={this._renderItem}
                        keyExtractor={item => (item.id).toString()}
                    />):(null)}
                    
                    <List>
                        <ListItem itemDivider>
                            <Left><Text style={styles.listItemheader}>Total</Text></Left>
                            
                            <Right><Text style={styles.listItemheader}>Rs. {this.calculate()} </Text></Right>
                        </ListItem>
                    </List>
                </Content>
            </Modal>

            ); 
        }
        else{
            return null;
        }
        
    }
}

export default BillModal;