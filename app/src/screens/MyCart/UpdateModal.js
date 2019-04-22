
import React,{Component} from 'react';
import {View,Text,Modal,TouchableOpacity} from 'react-native';
import {Button,Item,Content,Input} from 'native-base';
import styles from '../../theme/styles/requestsent';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AlertAsync from "react-native-alert-async";
import colors from '../../theme/color';
class UpdateModal extends Component{
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	quantity:1,
	  };
	}
	componentDidMount(){

	}
	
    setValues = () =>{
        let extra = {...this.state};
        
        console.log("----------printing-----------");
        console.log(this.props.order.quantity[this.props.data.id]);
        console.log(this.props.order);
        extra.quantity = parseInt(this.props.order.quantity[this.props.data.id]);
        this.setState({...this.state,...extra});

    }
    minus = () =>{
        let extra = {...this.state};
        if(parseInt(this.state.quantity) >= 2 ){
            extra.quantity = parseInt(extra.quantity) - 1;
            this.setState({...this.state,...extra});
        }
        
    }
    plus = () =>{
        console.log("Pressed plus");
        let extra = {...this.state};
        extra.quantity = parseInt(extra.quantity) + 1;
        this.setState({...this.state,...extra});
    }
    render(){
        if(this.props.order !== null && this.props.order !== undefined && this.props.data !== null && this.props.data !== undefined){
            return(
                <Modal visible={this.props.visibile}  animationType={'slide'} onShow={() => this.setValues()} onRequestClose={() => {console.log("Modal close")}}>
                    <View style={styles.ModalContainer}><Text style={styles.Modaltitle}>Update Product Details</Text><TouchableOpacity onPress={() => this.props.dismiss()}><MaterialCommunityIcons name='close-outline' style={styles.Modalclose}/></TouchableOpacity></View>
                    <View style={{display:'flex',padding:5,flexDirection:'column'}}>
                        <View style={{display:'flex',flexDirection:'column',padding:10,margin:10}}>
                            <Text>Name: {(this.props.data === undefined || this.props.data === null) ? "Not Available" : this.props.data.name}</Text>
                            <Text>Details: {(this.props.data === undefined || this.props.data === null) ? "Not Available" : this.props.data.details}</Text>
                            <Text>Amount: {(this.props.data === undefined || this.props.data === null) ? "Not Available" : this.props.data.amount}</Text>
                        </View>
                                    
                    </View>
                    <View style={{display:'flex',flexDirection:'row'}}>
                        <TouchableOpacity onPress={() => this.minus()}><MaterialCommunityIcons name="minus-circle" style={{fontSize:30,margin:5,color:colors.primary}}/></TouchableOpacity>
                        <View style={{flex:1}}>
                            <Item rounded style={{width:undefined}}>
                                <Input placeholder='Quantity' value={this.state.quantity.toString()} disabled={true}/>
                            </Item>
                          </View>
                        <TouchableOpacity onPress={() => this.plus()}><MaterialCommunityIcons name="plus-circle" style={{fontSize:30,margin:5,color:colors.primary}}/></TouchableOpacity>
                    </View>
                    <Button full primary rounded style={{marginTop:10}} onPress={() => this.props.onDone(this.state.quantity,this.props.data)}>
                        <Text style={{color:'rgb(255,255,255)'}}>Update Details</Text>
                    </Button>
                </Modal>

            );
        }
        else{
            return null;
        }
    	
    }
}

export default UpdateModal;