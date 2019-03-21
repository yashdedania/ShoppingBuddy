import React,{Component} from 'react';
import { connect } from 'react-redux';
import {TouchableOpacity} from 'react-native';
import { Card, CardItem,
    Body, Text, Left, Right, View
  } from 'native-base';
import styles from '../../theme/styles/requestlist';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import format from '../../components/dateformat';
const MylistView = (props) =>(
       
            <Card style={styles.Card}>
            <CardItem>
              <Left>
                <FontAwesome name="shopping-cart" style={styles.cardIcon} />
              </Left>
              <Right>
                <Body style={styles.DateTimeBody}>
                  <Text note style={styles.boldText}>Time : {format.Time(props.data.updatedAt)} </Text>
                  <Text note style={styles.boldText}>Date : {format.Date(props.data.updatedAt)}</Text>
                </Body>
              </Right>
            </CardItem>
            <CardItem cardBody>
              <Body style={styles.cardBody}>
                <Text style={styles.bodyText}>
                  <Text style={styles.boldText}>Chemical Name: </Text>{props.data.name}</Text>
                <Text style={styles.bodyText}>
                  <Text style={styles.boldText}>CC No.: </Text>{props.data.details}</Text>
                <Text style={styles.bodyText}>
                  <Text style={styles.boldText}>Quantity :</Text> {props.data.amount} Rs </Text>
              </Body>
            </CardItem>
            <CardItem style={styles.CardItem}>
              <Body style={styles.ViewDetailsBodyStyle} >
                <TouchableOpacity style={styles.textBack} onPress = {() => props.onPressItem(props.data)} >
                   <Text style={styles.acceptText}>{props.screenname == "add" ? "Add to" : "Remove from"} Cart</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.subBack} onPress = {() => props.onPressView(props.data)}>
                  <Text style={styles.viewDetailsText}>View  Details</Text>
                </TouchableOpacity>
              </Body>
            </CardItem>
          </Card>
        );




  
  
export default MylistView;