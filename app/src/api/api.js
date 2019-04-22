import urls from './apivariable';
import {AsyncStorage} from 'react-native';
const API = urls.SERVER_API;

const fetchdata = async (method, endpoint, body, content_type) => {
	//console.log("IN server: "+API);
	var temp_header = {
    	'Accept': 'application/json',authorization: await AsyncStorage.getItem('userToken')
  	};
  	if (content_type !== null) temp_header['Content-Type'] = content_type;
  	try {
  		console.log(`${API}${endpoint}`);
	    const response = await fetch(`${API}${endpoint}`, {
	      method: method,
	      body: body,
	      headers: temp_header,
	    });

    	let data = await response.json();
    	//console.log('server resp data: ',endpoint,data);
    	//set new auht_token
    	return data;
  	} 
	catch (err) {
	  return errHandler(err);
	}
}

const errHandler = (err) => {
	console.log("errHandler------ "); console.log(err);
	return false;
}

export default fetchdata;