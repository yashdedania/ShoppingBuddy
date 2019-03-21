import fetchdata from './api';
const products = {
    findAll : async function (params) {
        //console.log("In Get activity");
        var result = await fetchdata('POST', '/findproducts', JSON.stringify(params), 'application/json');
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
    add :  async function (params) {
        //console.log("In Get activity");
        var result = await fetchdata('POST', '/addproducts', JSON.stringify(params), 'application/json');
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
}
export default products;