import { BarCodeScanner, Permissions } from 'expo';
import React,{Component} from 'react';
import {View,Text,Modal,TouchableOpacity} from 'react-native';
import {Button} from 'native-base';
import styles from '../../theme/styles/requestsent';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AlertAsync from "react-native-alert-async";
class BarCodeModal extends Component{
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	currentproduct:{},

	  };
	}
	componentDidMount(){

	}
	handleBarCodeScanned = result => {

        if(JSON.stringify(result.data) !== JSON.stringify(this.state.currentproduct)){
        	console.log("state changed");
        	console.log(JSON.stringify(result.data));
        	console.log(JSON.parse(result.data));
        	let extra = {...this.state};
        	extra.currentproduct = JSON.parse(result.data);
        	this.setState({...this.state,...extra});
        }
        
    };

    render(){
    	return(
    		<Modal visible={this.props.visibile}  animationType={'slide'}  onRequestClose={() => {console.log("Modal close")}}>
    			<View style={styles.ModalContainer}><Text style={styles.Modaltitle}>Scan Products</Text><TouchableOpacity onPress={() => this.props.dismiss()}><MaterialCommunityIcons name='close-outline' style={styles.Modalclose}/></TouchableOpacity></View>
    			<View style={{display:'flex',flexDirection:'column'}}>
    				<View><BarCodeScanner style={{width:undefined,height:500}} barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]} onBarCodeScanned={this.handleBarCodeScanned} /></View>
    				<View style={{flex:1,padding:10,margin:10,flexDirection:'column'}}>
    					<Text>Name: {(this.state.currentproduct.name === undefined || this.state.currentproduct.name === null) ? "Not Available" : this.state.currentproduct.name}</Text>
    					<Text>Details: {(this.state.currentproduct.details === undefined || this.state.currentproduct.details === null) ? "Not Available" : this.state.currentproduct.details}</Text>
    					<Text>Amount: {(this.state.currentproduct.amount === undefined || this.state.currentproduct.amount === null) ? "Not Available" : this.state.currentproduct.amount}</Text>
    					<Button full primary rounded style={{marginTop:10}} onPress={() => this.props.sendData(this.state.currentproduct)}>
                                <Text style={{color:'rgb(255,255,255)'}}>Add to Cart</Text>
                        </Button>
    				</View>
    			</View>
    		</Modal>

    	);
    }
}

export default BarCodeModal;