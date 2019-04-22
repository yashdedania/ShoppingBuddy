const User = require('../models').user;
const Auth = require('../models').auth;
const Activity = require('../models').activity;
const Products = require('../models').products;
const sequelize = require('sequelize');
const Order = require('../models').order;
const SERVER_API = process.env.SERVER_API;

exports.findorder = (req, res) => {
	Order.findAll({ include: [{ model: Products }] })
		.then(result => {
			console.log(result);
			res.send({ status: 'ok', result: result });
		})
		.catch(function (error) {
			res.send({ status: 'error', result: error });
		})
}


exports.add = (req, res) => {
	var req_user = JSON.parse(res.locals.auth_user.user_details);
	let o;
	let first_time = false;
	let x = {};
	let option1, option2;
	let order_id;
	console.log("-------------Printing data----");
	console.log(req.body.id);
	console.log(req.body.name);
	var auth_token = req.get('authorization');
	if (auth_token !== undefined && auth_token !== null && auth_token != '') {
		auth_token = auth_token.toString();
	}
	var hashed_id = auth_token.split('__(break)__')[0];
	var session_key = auth_token.split('__(break)__')[2];
	if (req_user.currentorderid == "" && req_user.order_status == "empty") {
		first_time = true;
	}
	else {
		first_time = false;
	}
	
	if (first_time && parseFloat(req_user.budget) > parseFloat(req.body.amount) * parseFloat(req.body.quantity)) {
		console.log("-------------------In first time-------");
		option1 = {};
		option1[req.body.id] = req.body.quantity;
		x = { paid: false, quantity: option1, user_order: req_user.id.toString() };
		Order.create(x)
			.then(result => {
				o = result;
				console.log("------------first order created-----------");
				console.log(o);
				order_id = result.id;
				return Products.findOne({ where: { id: req.body.id } });
			})
			.then(result => {
				console.log("-----Product found adding the product--------");
				return o.addProducts(result);
			})
			.then(result => {
				console.log("----------product added updating user order number--------");
				option1 = { where: { id: req_user.id } };
				option2 = { currentorderid: order_id, order_status: "incart" };
				return User.update(option2, option1);
			})
			.then(result => {
				console.log("----user order updated now updating auth------");
				return User.findOne({ where: { id: req_user.id } });
			})
			.then(result => {
				console.log("-----------auth updated-------");
				x = result.dataValues;
				return Auth.update({ user_details: JSON.stringify(result.dataValues) }, { where: { hashed_id: hashed_id, session_key: session_key } });
			})
			.then(result => {
				res.send({ status: 'ok', result: x });
			})
			.catch(function (error) {
				console.log(error);
				res.send({ status: 'error', result: error });
			});
	}
	else if (parseFloat(req_user.budget) > parseFloat(req.body.amount) * parseFloat(req.body.quantity)) {
		//x = { where: { id: req_user.currentorderid } };
		x = { where: { id: req_user.currentorderid }, include: [{ model: Products }] };
		Order.findOne(x)
			.then(result => {
				console.log("---------In order displaying total amount----");
				console.log(result);
				let total_amount = 0;
				let products = result.products;
				let quantity = result.quantity;
				for (let i in result.products) {
					total_amount += parseFloat(quantity[products[i].id]) * parseFloat(products[i].amount);
				}
				total_amount += parseFloat(req.body.amount) * parseFloat(req.body.quantity);
				console.log("-----Total Amount-----" + total_amount);
				if (total_amount > req_user.budget) {
					console.log("-----Throwing Error-----");
					throw new Error('Budget full');
				}
				o = result;
				return Products.findOne({ where: { id: req.body.id } });
			})
			.then(result => {
				console.log("-----adding one more product---------");
				return o.addProducts(result);
			})
			.then(result => {
				x = o.quantity;
				console.log(req.body.id);
				if (x[req.body.id] !== null && x[req.body.id] !== undefined) {
					x[req.body.id] = parseFloat(x[req.body.id]) + parseFloat(req.body.quantity);
				}
				else {
					x[req.body.id] = parseFloat(req.body.quantity);
				}
				console.log("----------updating the quantity-------");
				console.log(x);
				option1 = { quantity: x };
				option2 = { where: { id: o.id } };
				console.log(option2);
				return Order.update(option1, option2);
			})
			.then(result => {
				res.send({ status: 'ok', result: 'Added to cart' });
			})
			.catch(function (error) {
				console.log(error.message);
				if (error == "Budget full" || error.message == "Budget full") {
					console.log("--------Sending Budget full----")
					res.send({ status: 'error', result: 'Budget full' });
				} else {
					res.send({ status: 'error', result: error.message });
				}
			});
	}
	else {
		res.send({ status: 'error', result: 'The Item is greater than your budget' });
	}
}


exports.update = (req, res) => {
	let option1, option2, x, zero_flag = false;
	if (parseInt(req.body.quantity) <= 0) {
		zero_flag = true;
	}
	else {
		zero_flag = false;
	}
	if (zero_flag) {
		res.send({ status: 'error', result: 'Please Click on Remove Cart for completely removing the Product' });
	}
	else {
		x = req.body.order.quantity;
		x[req.body.id] = req.body.quantity;
		option1 = { quantity: x };
		option2 = { where: { id: req.body.order.id } };
		Order.update(option1, option2)
			.then(result => {
				console.log(result);
				res.send({ status: 'ok', result: "Order Successfully Updated" });
			})
			.catch(function (error) {
				console.log(error);
				res.send({ status: 'error', result: error });
			});
	}
}

exports.remove = (req, res) => {
	let option1, option2, x, quantity;
	var req_user = JSON.parse(res.locals.auth_user.user_details);
	var auth_token = req.get('authorization');
	if (auth_token !== undefined && auth_token !== null && auth_token != '') {
		auth_token = auth_token.toString();
	}
	var hashed_id = auth_token.split('__(break)__')[0];
	var session_key = auth_token.split('__(break)__')[2];
	if (req.body.order.products.length <= 1) {
		console.log("-------------------In products length less--------------------");
		Order.destroy({ where: { id: req.body.order.id } })
			.then(result => {
				console.log(result);
				option1 = { currentorderid: "", order_status: "empty" };
				option2 = { where: { id: req_user.id } };
				return User.update(option1, option2);
			})
			.then(result => {
				req_user.currentorderid = "";
				req_user.order_status = "empty";
				console.log("----Updating user---------");
				return Auth.update({ user_details: JSON.stringify(req_user) }, { where: { hashed_id: hashed_id, session_key: session_key } });
			})
			.then(result => {
				console.log(result);
				console.log("----Sending User data-----");
				console.log(req_user);
				res.send({ status: 'ok', result: req_user });
			})
			.catch(function (error) {
				console.log(error);
				res.send({ status: 'error', result: error });
			});

	}
	else {
		Order.findOne({ where: { id: req.body.order.id } })
			.then(result => {
				x = result;
				return Products.findOne({ where: { id: req.body.id } });
			})
			.then(product => {
				return x.removeProducts(product);
			})
			.then(result => {
				quantity = x.quantity;
				delete quantity[req.body.id];
				option1 = { quantity: quantity };
				option2 = { where: { id: req.body.order.id } };
				return Order.update(option1, option2);
			})
			.then(result => {
				res.send({ status: 'ok', result: 'Product Successfully removed from cart' });
			})
			.catch(function (error) {
				console.log(error);
				res.send({ status: 'error', result: error });
			})
	}

}

exports.billpay = (req, res) => {
	let option1, option2;
	var req_user = JSON.parse(res.locals.auth_user.user_details);
	var auth_token = req.get('authorization');
	if (auth_token !== undefined && auth_token !== null && auth_token != '') {
		auth_token = auth_token.toString();
	}
	var hashed_id = auth_token.split('__(break)__')[0];
	var session_key = auth_token.split('__(break)__')[2];
	option1 = { total: req.body.total, paid: true };
	option2 = { where: { id: req.body.id } };
	Order.update(option1, option2)
		.then(result => {
			option1 = { currentorderid: "", order_status: "status" };
			option2 = { where: { id: req_user.id } };
			return User.update(option1, option2);
		})
		.then(result => {
			req_user.currentorderid = "";
			req_user.order_status = "empty";
			return Auth.update({ user_details: JSON.stringify(req_user) }, { where: { hashed_id: hashed_id, session_key: session_key } });
		})
		.then(result => {
			res.send({ status: 'ok', result: req_user });
		})
		.catch(function (error) {
			console.log(error);
			res.send({ status: 'error', result: error });
		})

}

exports.findAllOrders = (req, res) => {
	let x = { include: [{ model: User }, { model: Products }] };
	Order.findAll(x)
		.then(result => {
			res.send({ status: 'ok', result: result });
		})
		.catch(function (error) {
			console.log(error);
			res.send({ status: 'error', result: error });
		})
}

exports.psingleUpdate = (req, res) => {
	let option1, option2;
	option1 = { order_verify: true };
	option2 = { where: { id: req.body.id } };
	Order.update(option1, option2)
		.then(result => {
			console.log(result);
			res.send({ status: 'ok', result: result });
		})
		.catch(function (error) {
			console.log(error);
			res.send({ status: 'error', result: error });
		})
}

exports.findUserOrders = (req, res) => {
	var req_user = JSON.parse(res.locals.auth_user.user_details);
	let x = { where: { paid: { $eq: true } }, include: [{ model: User, where: { id: req_user.id } }, { model: Products }] };
	Order.findAll(x)
		.then(result => {
			res.send({ status: 'ok', result: result });
		})
		.catch(function (error) {
			console.log(error);
			res.send({ status: 'error', result: error });
		})
}
