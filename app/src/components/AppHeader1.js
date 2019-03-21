import React, { Component } from 'react';
import {Header,Left, Body, Title,Right} from 'native-base';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native';
import fonts from '../theme/font';
import colors from '../theme/color';
import {StyleSheet} from 'react-native';

class AppHeader extends Component {
	
	render(){
		//console.log("In App Header");
		//console.log(this.props);
		const { params = {} } = this.props.route.state;
		//console.log("In App header");
		//console.log(params.title);
		if(params.title == undefined){
			params.title = "Hello World";
		}
		return(
		<Header style={styles.header}>
            <Left>
				<TouchableOpacity onPress={() => this.props.route.openDrawer()}>
					<MaterialCommunityIcons name="menu" style={styles.icon} />
				</TouchableOpacity>
            </Left>
            <Body>
              <Title style={styles.headtitle}>{params.title}</Title>
            </Body>
        </Header>
		);
	}

	
}

const styles = StyleSheet.create({
	header:{
	    backgroundColor:colors.primary,
	    height:70,
	    paddingTop:15
  	},
	icon:{
	    fontSize:28,
	    color:'white',
	    marginTop:2,
	},
	headtitle:{
		fontSize:20,
		color:'rgb(255,255,255)',
		fontFamily:fonts.bold,
		textAlign:'center'
	}
});


export default AppHeader;