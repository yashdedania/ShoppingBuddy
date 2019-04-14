import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native';
import {
  Card, CardItem,
  Body, Text, Left, Right, View, Thumbnail
} from 'native-base';
import styles from '../../theme/styles/requestlist';
import format from '../../components/dateformat';
const MylistView = (props) => (

  <Card style={styles.Card}>
    <CardItem>
      <Left>
        <Thumbnail circle large source={{ uri: props.data.prodimage }} />
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
          <Text style={styles.boldText}>Product Name : </Text>{props.data.name}</Text>
        <Text style={styles.bodyText}>
          <Text style={styles.boldText}>Product Id : </Text>{props.data.id}</Text>
        <Text style={styles.bodyText}>
          <Text style={styles.boldText}>Details : </Text>{props.data.details}</Text>
        {(props.screenname !== "add") ? (<Text style={styles.bodyText}>
          <Text style={styles.boldText}>Quantity : </Text> {props.order.quantity[props.data.id]}</Text>) : null}
        <Text style={styles.bodyText}>
          <Text style={styles.boldText}>Amount : </Text> {props.data.amount} Rs </Text>
      </Body>
    </CardItem>
    <CardItem style={styles.CardItem}>
      <Body style={styles.ViewDetailsBodyStyle} >
        <TouchableOpacity style={[styles.textBack, { display: props.user.details.role == "admin" ? 'none' : 'flex' }]} onPress={() => props.onPressItem(props.data)} >
          <Text style={styles.acceptText}>{props.screenname == "add" ? "Add to" : "Remove from"} Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.subBack} onPress={() => props.onPressView(props.data)}>
          <Text style={styles.viewDetailsText}>{props.screenname == "add" ? "View" : "Edit"} Details</Text>
        </TouchableOpacity>
      </Body>
    </CardItem>
  </Card>
);





const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default (connect(mapStateToProps)(MylistView))  
