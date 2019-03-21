import fetchdata from './api';
import {AsyncStorage} from 'react-native';
const auth = {
	register: async function(params) {
	    //backend register api
	    //console.log("IN api calling");
	    //console.log(params);
	    var result = await fetchdata('POST', '/register', JSON.stringify(params), 'application/json'); //console.log('Authz res: ',result);
	    if (result !== false){
	    //console.log("Printing result");
	    //console.log(result);
	      return result;
	    }
	    else{
	    console.log("Returning false");
	      return false;
	    }
    },
    
    
  	login: async function(params) {
	  	//backend authentication api
	  	//console.log("login api");
	    var result = await fetchdata('POST', '/login', JSON.stringify(params), 'application/json');
	    if (result === false)
	      return false;
	    else{
	    //console.log("Some result reccieved");
	      return result;
	    } 
  },
  logout: async function(cb) {
	  	//backend logout api
	    var result = await fetchdata('POST', '/logout', JSON.stringify({}), 'application/json'); //console.log('Authz res: ',result);
	    if (result !== false){
	      if (result.status === 'ok'){
	        return result;
	      }
	      else
	        return false;
	    }
	    else{
	      return false;      
	    } 
  },
  protectedAuth: async function() {

    var resp = await fetchdata('POST', '/protectedAuth', JSON.stringify({}), 'application/json'); //console.log('Authz res: ',resp);
    if (resp !== false){
      if (resp.status === 'ok'){
        var disallowed_values = [null,undefined,'','true','1','undefined','null',false];
        if (disallowed_values.indexOf(AsyncStorage.getItem('userToken')) !== -1){
          await AsyncStorage.removeItem('userToken');
          //console.log("Token removed from authentication");
        }
        return false;
      }
      else if(resp.status === 'loggedin' && resp.result !== null){
        return resp;
      }
      else{
        await AsyncStorage.removeItem('userToken');
        return false;
      }
    }
    else{ 
      console.log('Error', "Couldn't communicate with server. Please try again"); 
      return false;
    }    
  },
  isAuthenticated: async function() {
    var resp = await fetchdata('POST', '/isAuthenticated', JSON.stringify({}), 'application/json'); //console.log('Authz res: ',resp);
    if (resp !== false){
      if (resp.status === 'error'){
        if (resp.result.split(" ")[0] !== 'Server')
          await AsyncStorage.removeItem('userToken');
        console.log('Error', resp.result); 
        return false;
      }
      else
        return resp;
    }
    else{ 
      console.log('Error', "Couldn't communicate with server. Please try again"); 
      return false;
    }    
  }
}

export default auth;