import { BarCodeScanner, Permissions } from 'expo';
import React, { Component } from 'react';
import { View, Text, Modal, TouchableOpacity, Image } from 'react-native';
import { Button } from 'native-base';
import styles from '../../theme/styles/requestsent';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
const ProductDetail = (props) => {
    if (props.data !== null && props.data !== undefined && JSON.stringify(props.data).length > 2) {
        return (
            <Modal visible={props.visibile} animationType={'slide'} onRequestClose={() => { console.log("Modal close") }}>
                <View style={styles.ModalContainer}><Text style={styles.Modaltitle}>Product Detail</Text><TouchableOpacity onPress={() => props.dismiss()}><MaterialCommunityIcons name='close-outline' style={styles.Modalclose} /></TouchableOpacity></View>

                <View style={{ display: 'flex', padding: 5, height: '100%', width: '100%', margin: 10, flexDirection: 'column' }}>

                    <View style={{ flex: 0.6, alignItems: 'center', justifyContent: 'center' }}><Image source={{ uri: props.data.prodmap }} style={{ width: '98%', height: '100%', marginRight: 15, resizeMode: 'stretch' }} /></View>
                    <View style={{ display: 'flex', flexDirection: 'column', padding: 10, marginTop: 15 }}>
                        <Text style={styles.modalContent}>Name: {(props.data === undefined || props.data === null) ? "Not Available" : props.data.name}</Text>
                        <Text style={styles.modalContent}>Details: {(props.data === undefined || props.data === null) ? "Not Available" : props.data.details}</Text>
                        <Text style={styles.modalContent}>Amount: {(props.data === undefined || props.data === null) ? "Not Available" : props.data.amount}</Text>
                    </View>

                </View>

            </Modal>
        );
    }
    else {
        return null;
    }

}

export default ProductDetail;
