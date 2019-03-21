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


exports.findorder = (req,res) =>{
	Order.find({where:{id:"5"}})
	.then(result =>{
		console.log(result);
		return result.getProducts();
		
	})
	.then(result =>{
		res.send({status:'ok',result:result});
	})
	.catch(function(error){
		res.send({status:'error',result:error});
	})
}

exports.add = (req,res) =>{
	var req_user = JSON.parse(res.locals.auth_user.user_details);
	let o;
	console.log("-------------Printing data----");
	console.log(req.body.id);
	console.log(req.body.name);
	let x = {paid:false,user_order:req_user.id.toString()};
	Order.find({where:{id:"5"}})
	.then(order =>{
		console.log(order);
		o = order;
		return Products.find({where:{id:req.body.id}});
		
	})
	.then(product =>{
		console.log(product);
		return o.addProducts(product);
	})
	.then(result =>{
		console.log(result);
		res.send({status:'ok',result:result});
	})
	.catch(function(error){
		console.log(error);
		res.send({status:'error',result:error});
	});
}