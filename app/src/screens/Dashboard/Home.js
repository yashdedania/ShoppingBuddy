import React, { Component } from 'react';


import {TouchableOpacity} from 'react-native';
import {View,Text,Container,Content,Left,Body,Title, Right} from 'native-base';
import SocketIOClient from 'socket.io-client';
import {setUserDetails} from '../../actions/userActions';
import { connect } from 'react-redux';
import user from '../../api/user';
import urls from '../../api/apivariable';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import styles from '../../theme/styles/dashboard';
import gstyles from '../../theme/styles/general';
import hstyles from '../../theme/styles/header';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';
import UserAuthorization from '../User/UserAuthorization';
class Home extends Component {
    constructor(props) {
      super(props);
      this.props.navigation.setParams({ title: 'Dashboard' });
      this.state = {
        blur:false,

      };
      this._isMounted = false;
      //console.log(this.socket); 
    }
    /*_socketConnect = () =>{
      this.socket.on('request',(data) => {
        console.log("data recieved: "+data);
      });
      this.sales_socket.on('sales_request',(data) =>{
        console.log("Sales Data received");
        this._fetchsalescount();
      })
    }
    _socketDisconnect = () =>{
      this.socket.close();
      this.socket.disconnect();
      this.sales_socket.close();
      this.sales_socket.disconnect();
    }*/
    componentDidMount = async() =>{
      this._isMounted = true;
      //this._socketConnect();

      this.didBlurSubscription = this.props.navigation.addListener(
        'didBlur',
        payload => {
          this.setState({blur:true});
          
        }
      );
      this.willFocusSubscription = this.props.navigation.addListener(
          'willFocus',
          payload => {
            if(this.state.blur){
              if(this._isMounted){
                this.setState({blur:false});

              }
                
            }
          }
      );
    }
    componentWillUnmount(){
      this._isMounted = false;
      this.didBlurSubscription.remove();
      this.willFocusSubscription.remove();
      //this._socketDisconnect();
    }
    
    
    _renderCard = (name) =>{
      const role = this.props.user.details.role;
      return true;
    }
  	render(){
  		return(
  			<Container style={gstyles.container_background}>
          <View style={hstyles.header}>
            <View style={hstyles.headerContainer}>
              <Left style={hstyles.left}>
                <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                  <MaterialCommunityIcons name="menu" style={hstyles.icon} />
                </TouchableOpacity>
              </Left>
              <Body style={hstyles.body}>
                <Title style={hstyles.headtitle}>Dashboard</Title>
              </Body>
              <Right style={hstyles.right}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Logout')}>
                  <FontAwesome name="power-off" style={hstyles.icon} />
                </TouchableOpacity>
              </Right>
            </View>
          </View>
        <Content>
        {/* Cards Stack View - All cards inside this */}
        <View style={styles.cardStack}>


          <TouchableOpacity style={this._renderCard('Profile') === true ? styles.cardStyles : styles.hideCard} onPress={() => this.props.navigation.navigate('Profile')}>
              {/* CARD Upper-Half Icon + Circle + Text */}
              <View style={styles.cardUpper}>
                {/* Icon */}
                <View style={styles.cardIconView}>
                  <MaterialCommunityIcons name="face-profile" style={styles.cardIcon} />
                </View>
              </View>
              {/* CARD Lower-Half Text */}
              <View>
                <Text style={styles.cardNameText}>Profile</Text>
              </View>
          </TouchableOpacity>


          <TouchableOpacity style={this._renderCard('Profile') === true ? styles.cardStyles : styles.hideCard} onPress={() => this.props.navigation.navigate('Products')}>
              {/* CARD Upper-Half Icon + Circle + Text */}
              <View style={styles.cardUpper}>
                {/* Icon */}
                <View style={styles.cardIconView}>
                  <FontAwesome name="shopping-cart" style={styles.cardIcon} />
                </View>
              </View>
              {/* CARD Lower-Half Text */}
              <View>
                <Text style={styles.cardNameText}>Products</Text>
              </View>
          </TouchableOpacity>


          

        </View>
        </Content>
      </Container>
  		)
  	}
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setUserDetails: (name) => {
      dispatch(setUserDetails(name));
    }
  };
};

export default (connect(mapStateToProps,mapDispatchToProps)(Home));