const User = require('../models').user;
const Activity = require('../models').activity;
const Products = require('../models').products;
const Order = require('../models').order;
const SERVER_API = process.env.SERVER_API;

exports.insert = (req, res) => {
	let x = {};
	x.name = req.body.name;
	x.details = req.body.details;
	x.amount = req.body.amount;
	x.prodmap = SERVER_API + "/public/" + req.body.prodmap;
	x.prodimage = SERVER_API + "/public/" + req.body.prodimage;
	Products.create(x)
		.then(result => {
			console.log(result);
			res.send({ status: 'ok', result: result });
		})
		.catch(function (error) {
			res.send({ status: 'error', result: error });
		});
}
exports.find = (req, res) => {
	Products.findAll({})
		.then(result => {
			res.send({ status: 'ok', result: result });
		})
		.catch(function (error) {
			res.send({ status: 'error', result: error });
		})
}

exports.multipleInsert = (req, res) => {
	let x = {};
	if (req.products !== null && req.products !== undefined) {
		let products = req.products;
		let finalData = [];
		for (i in products) {
			let x = {};
			x.name = products[i].name;
			x.details = products[i].details;
			x.amount = products[i].amount.replace(/[^0-9.]/g);
			x.prodmap = SERVER_API + "/public/" + products[i].prodmap;
			x.prodimage = SERVER_API + "/public/" + products[i].prodimage;
			finalData.push(x);
		}
		Products.bulkCreate(finalData)
			.then(result => {
				console.log(result);
				res.send({ status: 'ok', result: result });
			})
			.catch(function (error) {
				console.log(error);
				res.send({ status: 'error', result: error });
			})
	}
	else {
		res.send({ status: 'error', result: 'No Product found' });
	}
}

exports.delete = (req, res) => {
	if (req.body.id !== undefined && req.body.id !== null) {
		let options = { where: { id: req.body.id } };
		Products.destroy(options)
			.then(result => {
				console.log(result);
				res.send({ status: 'ok', result: 'Product with id :' + req.body.id + ' was successfully deleted' });
			})
			.catch(function (error) {
				console.log(error);
				res.send({ status: 'error', result: error });
			})

	}
	else {
		Products.destroy({})
			.then(result => {
				console.log(result);
				res.send({ status: 'ok', result: 'All products were successfully deleted' });
			})
			.catch(function (error) {
				console.log(error);
				res.send({ status: 'error', result: error });
			})
	}
}






