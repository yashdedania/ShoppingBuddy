import { BarCodeScanner, Permissions } from 'expo';
import React,{Component} from 'react';
import {View,Text,Modal,TouchableOpacity,Image} from 'react-native';
import {Button} from 'native-base';
import styles from '../../theme/styles/requestsent';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
const ProductDetail = (props) =>{
            if(props.data !== null && props.data !== undefined && JSON.stringify(props.data).length > 2){
               return(
                    <Modal visible={props.visibile}  animationType={'slide'}  onRequestClose={() => {console.log("Modal close")}}>
                        <View style={styles.ModalContainer}><Text style={styles.Modaltitle}>Product Detail</Text><TouchableOpacity onPress={() => props.dismiss()}><MaterialCommunityIcons name='close-outline' style={styles.Modalclose}/></TouchableOpacity></View>
                        
                            <View style={{flex:1,padding:5,flexDirection:'column'}}>

                                <View style={{display:'flex'}}><Image source={{uri:props.data.prodmap}} style={{width:undefined,height:500}} /></View>
                                <View style={{flex:1,flexDirection:'column',padding:10,margin:10}}>
                                    <Text>Name: {(props.data === undefined || props.data === null) ? "Not Available" : props.data.name}</Text>
                                    <Text>Details: {(props.data === undefined || props.data === null) ? "Not Available" : props.data.details}</Text>
                                    <Text>Amount: {(props.data === undefined || props.data === null) ? "Not Available" : props.data.amount}</Text>
                                </View>
                                
                            </View>
                        
                    </Modal> 
                );
            }
            else{
                return null;
            }

}

export default ProductDetail;