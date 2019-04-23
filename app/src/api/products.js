import fetchdata from './api';
const products = {
    findAll: async function (params) {
        //console.log("In Get activity");
        var result = await fetchdata('POST', '/findproducts', JSON.stringify(params), 'application/json');
        if (result !== false) {
            //console.log("Printing result");
            //console.log(result);
            return result;
        }

        else {
            console.log("Error in Updating the form");
            return false;
        }
    },

    add: async function (params) {
        //console.log("In Get activity");
        var result = await fetchdata('POST', '/addproducts', JSON.stringify(params), 'application/json');
        if (result !== false) {
            //console.log("Printing result");
            //console.log(result);
            return result;
        }

        else {
            console.log("Error in Updating the form");
            return false;
        }
    },
    remove: async function (params) {
        //console.log("In Get activity");
        var result = await fetchdata('POST', '/removeproducts', JSON.stringify(params), 'application/json');
        if (result !== false) {
            //console.log("Printing result");
            //console.log(result);
            return result;
        }

        else {
            console.log("Error in Updating the form");
            return false;
        }
    },
    update: async function (params) {
        //console.log("In Get activity");
        var result = await fetchdata('POST', '/updateproducts', JSON.stringify(params), 'application/json');
        if (result !== false) {
            //console.log("Printing result");
            //console.log(result);
            return result;
        }

        else {
            console.log("Error in Updating the form");
            return false;
        }
    },
    paymentgateway: async function (params) {
        //console.log("In Get activity");
        var result = await fetchdata('POST', '/paymentGateway', JSON.stringify(params), 'application/json');
        if (result !== false) {
            //console.log("Printing result");
            //console.log(result);
            return result;
        }

        else {
            console.log("Error in Updating the form");
            return false;
        }
    },
    billpay: async function (params) {
        //console.log("In Get activity");
        var result = await fetchdata('POST', '/billpay', JSON.stringify(params), 'application/json');
        if (result !== false) {
            //console.log("Printing result");
            //console.log(result);
            return result;
        }

        else {
            console.log("Error in Updating the form");
            return false;
        }
    },
    singleUpdate: async function (params) {
        //console.log("In Get activity");
        var result = await fetchdata('POST', '/psingleUpdate', JSON.stringify(params), 'application/json');
        if (result !== false) {
            //console.log("Printing result");
            //console.log(result);
            return result;
        }

        else {
            console.log("Error in Updating the form");
            return false;
        }
    },
    findUserOrders: async function (params) {
        //console.log("In Get activity");
        var result = await fetchdata('POST', '/findUserOrders', JSON.stringify(params), 'application/json');
        if (result !== false) {
            //console.log("Printing result");
            //console.log(result);
            return result;
        }

        else {
            console.log("Error in Updating the form");
            return false;
        }
    },
    findAllOrders: async function (params) {
        //console.log("In Get activity");
        var result = await fetchdata('POST', '/findAllOrders', JSON.stringify(params), 'application/json');
        if (result !== false) {
            //console.log("Printing result");
            //console.log(result);
            return result;
        }

        else {
            console.log("Error in Updating the form");
            return false;
        }
    },
}

export default products;
