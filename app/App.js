import React , { Component }from 'react';
import Root from './src';
import store from './store';
import {Provider} from "react-redux";
import { Asset, AppLoading, SplashScreen,Font } from 'expo';
import {View,Image,ImageBackground} from 'react-native';
class App extends Component {
    constructor() {
        super();
        this.state = {
          isReady: false
        };
        this.loadFonts();
      }
      
    componentDidMount() {
      
    }
    async loadFonts() {
      await Font.loadAsync({
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
        Ionicons: require('@expo/vector-icons/fonts/Ionicons.ttf'),
        Raleway_bold: require('./assets/fonts/Raleway-Bold.ttf'),
        Raleway_medium: require('./assets/fonts/Raleway-Medium.ttf'),
        Raleway_semibold: require('./assets/fonts/Raleway-Medium.ttf'),
        Raleway_regular: require('./assets/fonts/Raleway-Regular.ttf'),
        Raleway_SemiBold: require('./assets/fonts/Raleway-SemiBold.ttf'),
      });
      this.setState({isReady:true});
      console.log("Load fonts loaded");
    }

    

  
  render() {
    if(!this.state.isReady){
      return(
        <AppLoading />
      )
    }
    else{ 
        return (
          <Provider store={store}>
            <Root />
          </Provider>
        );
    }
  }
}

export default App;