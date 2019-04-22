
import React,{Component} from 'react';
import {View,Text,Modal,TouchableOpacity,FlatList} from 'react-native';
import {Button,Item,Content,Input,Left,Right,Body,List,ListItem,ActionSheet} from 'native-base';
import styles from '../../theme/styles/requestsent';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AlertAsync from "react-native-alert-async";
import colors from '../../theme/color';
const BUTTONS = [
    {text:"Debit Card",index:0},
    {text:"Credit Card",index:1},
    {text:"Net Banking",index:2},
    {text:"UPI Banking",index:3},
    {text:"Cancel",index:4}
];
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
	_handleAction = (params) =>{
        
            ActionSheet.show(
                {
                  options: BUTTONS,
                  cancelButtonIndex:4,
                  title: "Select Payment Mode",
                  tintColor:colors.primary
                },
                buttonIndex => {
                    this._handleActionClick(BUTTONS[buttonIndex],params);
     
                }
            );
        
        
    }
    _handleActionClick = (buttonIndex,params) =>{
        if(buttonIndex.index != 4){
            this.props.bill(params);
        }
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
                <Button full primary rounded style={{margin:10}} onPress={() => this._handleAction(this.calculate())}>
                    <Text style={{color:'rgb(255,255,255)'}}>Pay Bill</Text>
                </Button>
            </Modal>

            ); 
        }
        else{
            return null;
        }
    	
    }
}

export default BillModal;