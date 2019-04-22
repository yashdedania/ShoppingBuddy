import { IntentLauncherAndroid,BackHandler } from 'expo';
import React, { PureComponent } from 'react';
import { View, Text, NetInfo, Dimensions, StyleSheet,SafeAreaView,Platform,Linking } from 'react-native';
import color from '../theme/color';
const { width } = Dimensions.get('window');
import AlertAsync from "react-native-alert-async";
function MiniOfflineSign() {
  return (
    <SafeAreaView style={styles.offlineContainer}>
      <Text style={styles.offlineText}>No Internet Connection</Text>
    </SafeAreaView>
  );
}

class OfflineNotice extends PureComponent {
  state = {
    isConnected: true
  };

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  handleConnectivityChange = isConnected => {
    console.log('First, is ' + (isConnected ? 'online' : 'offline'));
    if (isConnected) {
      this.setState({ isConnected });
    } else {
      this.setState({ isConnected });
      this._showAlert();
    }
  };
  _showAlert = async() =>{
    var choice = false;
      choice = await AlertAsync(
        'No Internet',
        'Could not find an Internet connection. Please check your settings and try again.',
        [
          {text:'Open Settings',onPress:() => true},
          {text:'Cancel',onPress:() => false}
        ],
        {cancelable:false}
      );
      if(choice){
        this._handlePress();
      }
      else{
        //BackHandler.exitApp();
      }
  }
  _handlePress = async() =>{
    if(Platform.OS == 'android'){
      IntentLauncherAndroid.startActivityAsync(
        IntentLauncherAndroid.ACTION_SETTINGS);
    }
    else{
      Linking.openURL('app-settings:');
    }
  }
  render() {
    if (!this.state.isConnected) {
      return null;
    }
    return null;
  }
}

const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: color.dark,
    height: 40,
    width,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    top: 80
  },
  offlineText: { color: '#fff' }
});

export default OfflineNotice;