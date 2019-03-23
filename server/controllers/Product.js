const User = require('../models').user;
const Activity = require('../models').activity;
const Products = require('../models').products;
const Order = require('../models').order;
const SERVER_API = process.env.SERVER_API;

exports.insert = (req,res) =>{
	let x = {};
	x.name = req.body.name;
	x.details = req.body.details;
	x.amount = req.body.amount;
	x.prodmap = SERVER_API + "/public/" +req.body.prodmap;
	Products.create(x)
	.then(result =>{
		console.log(result);
		res.send({status:'ok',result:result});
	})
	.catch(function(error){
		res.send({status:'error',result:error});
	});
}
exports.find = (req,res) =>{
	Products.findAll({})
	.then(result =>{
		res.send({status:'ok',result:result});
	})
	.catch(function(error){
		res.send({status:'error',result:error});
	})
}






