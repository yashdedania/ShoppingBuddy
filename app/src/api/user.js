import fetchdata from './api';
const user = {
    findAllUser : async function (params) {
        //console.log("In Get users");
        var result = await fetchdata('POST', '/findAllUser', JSON.stringify(params), 'application/json');
        if(result !== false){
            //console.log("Printing result");
            //console.log(result);
            return result;
        }
        
        else{
            console.log("Error in Updating the form");
            return false;
        }  
    },
    update:async function(params){
        var result = await fetchdata('POST', '/updateUser', params,'multipart/form-data');
        if(result !== false){
            //console.log("Printing result");
            //console.log(result);
            return result;
        }
        
        else{
            console.log("Error in Updating the form");
            return false;
        }
    },
    singleUpdate:async function(params){
        var result = await fetchdata('POST', '/singleUpdateUser', JSON.stringify(params),'application/json');
        if(result !== false){
            //console.log("Printing result");
            //console.log(result);
            return result;
        }
        
        else{
            console.log("Error in Updating the form");
            return false;
        }
    },
    findAndUpdate:async function(params){
        var result = await fetchdata('POST', '/findAndUpdate', JSON.stringify(params),'application/json');
        if(result !== false){
            //console.log("Printing result");
            //console.log(result);
            return result;
        }
        
        else{
            console.log("Error in Updating the form");
            return false;
        }
    },
    storeNotToken:async function(params){
        var result = await fetchdata('POST', '/storeNotToken', JSON.stringify(params),'application/json');
        if(result !== false){
            //console.log("Printing result");
            //console.log(result);
            return result;
        }
        
        else{
            console.log("Error in Updating the form");
            return false;
        }
    },
    sendMail:async function(params){
        var result = await fetchdata('POST', '/sendMail', JSON.stringify(params),'application/json');
        if(result !== false){
            //console.log("Printing result");
            //console.log(result);
            return result;
        }
        
        else{
            console.log("Error in Updating the form");
            return false;
        }
    }
}

export default user;