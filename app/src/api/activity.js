import fetchdata from './api';
const activity = {
    getactivity : async function (params) {
        //console.log("In Get activity");
        var result = await fetchdata('POST', '/getactivity', JSON.stringify(params), 'application/json');
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
export default activity;