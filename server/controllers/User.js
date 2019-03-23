

const User = require('../models').user;
const Auth = require('../models').auth;
const Order = require('../models').order;
const Products = require('../models').products;
const Activity = require('../models').activity;
var bcrypt = require('bcrypt');

const safeStringify = require('fast-safe-stringify')
const nodeMailer = require('nodemailer');
let transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com', //smtp.gmail.com
    port: 465, //465
    secure: true, //true
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
});
const SERVER_API = process.env.SERVER_API;
var multer  = require('multer');
var path = require('path'); var fs = require('fs');
const imagePath = 'assets/user';
const storage_user = multer.diskStorage({
	destination: function(req, file, callback) {
		//console.log(file);
		//console.log("-----In destination");
		callback(null,imagePath);
	},
	filename:function(req,file,callback){
		console.log("In filename");
		console.log(file);
		console.log("----------prinitng data");
		let data = file.originalname.replace(/[^a-zA-Z0-9].*/g,"");
		console.log(data);
		var d = new Date();
  		d = d.getDate() + "_"+ d.getMonth() + "_" + d.getFullYear()+ "_" + d.getTime();
		callback(null,data+'_'+d+path.extname(file.originalname));
	}

});
const uploadImage = multer({storage:storage_user}).single('photo');


exports.getsingle = (req,res) =>{
	var req_user = JSON.parse(res.locals.auth_user.user_details);
	if(req_user.currentorderid !== "" && req_user.order_status !== "empty"){
		let x = {where:{id:req_user.id},include:[{model:Order,where:{id:req_user.currentorderid,paid:{$eq:false}},include:[{model:Products}]}]};
		
		User.findOne(x)
		.then(result =>{
			console.log("---------------Result found----------");
			console.log(result);
			if(result !== null && result !== undefined){
				console.log("proper result sent");
				res.send({status:'ok',result:result});
			}
			else{
				console.log("Null result sent");
				res.send({status:'ok',result:null});
			}
		})
		.catch(function(error){
			console.log(error);
			res.send({status:'error',result:error});
		})
	}
	else{
		res.send({status:'ok',result:null});
	}
	
	
}
exports.sendMail = (req,res) =>{
	var message = '';
	if(req.body !== undefined && req.body !== null){
		if(req.body.username !== undefined && req.body.username !== null){
			message +="\n Name: "+req.body.username.value+"\n";
		}
		if(req.body.screen !== undefined && req.body.screen !== null){
			message += "\n Screen Name: "+req.body.screen.value+"\n";
		}
		if(req.body.description !== undefined && req.body.description !== null){
			message += "\n Error Description: "+req.body.description.value+"\n "
		}
	}
	let mailOptions = {
		from:'yashrobinhood6@gmail.com',
		to:'yashdedania6496@gmail.com',
		subject:'Errors in Accord app',
		text:message
	};
	transporter.sendMail(mailOptions, (error, info) => {
    	if (error) { 
    		console.log(error); 
            console.log("Mail not sent");

            res.send({status:"error",result:"Mail not sent, Please try again"});
             
    	}
    	else{
            console.log("Main sent successfully");
            res.send({status:"ok",result:"Mail sent successfully"});
    		
    	}
    });
}
exports.updateUser = (req,res) =>{
	uploadImage(req,res,(err)=>{
		if(err){
			console.log(err);
		}
		else{
			console.log("In else part");
			//console.log(req.file);
			var req_user = JSON.parse(res.locals.auth_user.user_details);
			console.log("Pinting ----- normal user");
			console.log(req_user);
			if(req.body.user !== undefined && req.body.user !== null){
				console.log("Printing Body");
				//console.log(req.body.user);
				let user = {};
				let pass = false;
				var auth_token = req.get('authorization');
				if(auth_token !== undefined && auth_token !==null && auth_token != '')
				{
					auth_token = auth_token.toString();
				}
				var hashed_id = auth_token.split('__(break)__')[0]; 
    			var session_key = auth_token.split('__(break)__')[2];
				let data = JSON.parse(req.body.user);
				let unlinkerror = false;
				if(req_user.username != data.username){
					user.username = data.username;
				}
				if(req_user.email != data.email){
					user.email = data.email;
				}
				if(req_user.mobileno != data.mobileno){
					user.mobileno = data.mobileno
				}
				if(data.currentimage === null){
					user.imageuri = SERVER_API+'/public/user/personimage.png';
					user.imagename = 'personimage.png';
				}
				if(data.newpass !== undefined && data.newpass !== null && data.newpass.length >= 8){
					console.log("in data password");
					pass = true;
				}
				if(req.file !== undefined && data.currentimage !== null){
					console.log("Prinitng filename");
					user.imageuri = SERVER_API+'/public/user/'+req.file.filename;
					user.imagename = req.file.filename;
					if(req_user.imagename != 'personimage.png'){
						console.log("-----------In unlink--------------");
						fs.unlink(path.normalize("assets/user/" + req_user.imagename),(err) => {
							if(err){
								console.log("----------------------------unlink error");
								console.log(err);
								unlinkerror =true;
							}	
						});
					}	
				}
				var option1 = {where:{'id':req_user.id}};
				if(pass && !unlinkerror){
					bcrypt.hash(data.newpass, 11, function(err, hash) {
						if(err){
							hasherror =true;
							res.send({status:'error',result:'Server Error'});
						}
						else{
							console.log("in Bycrypt hash");
							user.password = hash;
							User.update(user,option1)
							.then(result => {
								if(result !== null);
								return User.findAll({where:{'id':req_user.id}});
							})
							.then(result =>{
								user = result[0].dataValues;
								return Auth.update({user_details:JSON.stringify(result[0].dataValues)},{ where: {hashed_id: hashed_id, session_key: session_key} })
							})
							.then(result =>{
								console.log(result);
								res.send({status:'ok',result:user});
							})
							.catch(function(error){
								console.log(error);
								res.send({status:'error',result:'Server Error'});
							})
						}
					});
				}
				else if(!unlinkerror){
					console.log("Before updating prinitng user");
					console.log(user);
					User.update(user,option1)
					.then(result => {
						if(result !== null);
						return User.findAll({where:{'id':req_user.id}});
					})
					.then(result =>{
						user = result[0].dataValues;
						return Auth.update({user_details:JSON.stringify(result[0].dataValues)},{ where: {hashed_id: hashed_id, session_key: session_key} })
					})
					.then(result =>{
						console.log(result);
						res.send({status:'ok',result:user});
					})
					.catch(function(error){
						console.log(error);
						res.send({status:'error',result:'Server Error'});
					})
				}
				else{
					console.log("--------last else");
					res.send({status:'error',result:'Server Error'});
				}
				
			}
		
		}
		
	});
	
}


exports.register = (req, res) => {
	//console.log("Yeaaaaaaaaaaaaaaaaahhhhhhhhhhhh Server registration called");
	//console.log(req.body);
	if (req.body.username && req.body.email && req.body.pass && req.body.mobileno){
		//check if email exists
		User.findOne({ where: {email: req.body.email.value} })
		.then(user => {
			if (user != null)
				res.send({ status: 'error', result: 'User with this email id is already registered.'});
			else{
				//check if mobileno exists
				User.findOne({ where: {mobileno: req.body.mobileno.value} })
				.then(user => {
					if (user != null)
						res.send({ status: 'error', result: 'User with this mobile no. is already registered.'});
					else{

						bcrypt.hash(req.body.pass.value, 11, function(err, hash) {
							//create the user
							User.create({
							    username: req.body.username.value,
							    email: req.body.email.value,
							    password: hash,
							    mobileno: req.body.mobileno.value,
							    role:(req.body.role === undefined || req.body.role === null) ? 'user' : req.body.role.value,
							    verified:true
							})
							  .then(user => {
								  res.send({ status: "ok", result: user.username, });	  	
							  })
							  .catch(error => {
								  console.log(error.message); res.send({ status: "error", result: 'Server Error. Please try again.', });
							  });
						});
					}
				})
				.catch(error => { console.log(error.message); res.send({ status: 'error', result: 'Server Error. Please try again.'}); });				
			}
		})
		.catch(error => { console.log(error.message); res.send({ status: 'error', result: 'Server Error. Please try again.'}); });
	}
	else
		return res.send({ status: "error", result: 'Error reading values. Please Try Again. ', });
};


exports.login = (req, res) => {

	if (req.body.reg_username && req.body.reg_pass){
		//check if email exists
		console.log("In loging server");
		//console.log(req.body);
		User.findOne({ where: {username: req.body.reg_username.value} })
		.then(user => {
			if (user != null){
				
				bcrypt.compare(req.body.reg_pass.value, user.password, function(err, result) {
					if(result){
						if(user.dataValues.verified){
							bcrypt.hash(user.id.toString(), 11, function(err, hash) {
								if (err){
									console.log(err); res.send({status:'error',result:"Server error. Please try again"});														
								}
								else{
									//for authentication
									let random_string = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
									let session_key = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
									let auth_token = hash + '__(break)__' + random_string + '__(break)__' + session_key;
									//console.log(safeStringify(user.dataValues));
									Auth.create({
										user_details: JSON.stringify(user.dataValues),
										hashed_id: hash,
										random_string: random_string,
										session_key: session_key,
									  })
									  .then(auth_user => {
										  const act = {};
										  act.activity_type = 'Login';
										  act.activity_detail = 'User Logged in';
										  act.ract_user_id = user.dataValues.id;
										  req.Activity.insertActivity(act,req.io_activity);
										  res.send({ status: 'ok', 
											  result: { user: {...user.dataValues,}}, 
											  auth_token: auth_token });	  	
									  })
									  .catch(error => {
										  console.log(error); res.send({ status: "error", result: 'Server Error. Please try again.', });
									  });								
								}
							});
						}
						else{
							res.send({status:"error",result:"You are not Authorized Please contact Admin"});
						}

						
					}
					else{
						res.send({ status: 'error', result: 'Passwords did not match'});
					}
				});
			}
			
			else{
				res.send({ status: 'error', result: 'Email Id not registered'});			
			}
		})
		.catch(error => { console.log(error.message); res.send({ status: 'error', result: 'Server Error. Please try again.'}); });
	}
	else
		return res.send({ status: "error", result: 'Error reading values. Please Try Again. ', });
};

exports.singleUpdate = (req,res) =>{
	var x = {};
	var option1 = {};
	var pass = false;
	var req_user = JSON.parse(res.locals.auth_user.user_details);
	if(req.body !== undefined && req.body !== null && req.body.user !== undefined && req.body.user !== null){
		x.verified = true;
		
		/*if(req.body.accessto !== undefined && req.body.accessto !== null){
			x.accessto = req.body.accessto;
		}*/
		if(req.body.user.username !== req.body.username.value){
			x.username = req.body.username.value;
		}
		if(req.body.user.email !== req.body.email.value){
			x.email = req.body.email.value;
		}
		if(req.body.user.mobileno !== req.body.mobileno.value){
			x.mobileno = req.body.mobileno.value;
		}
		/*if(req.body.user.role !== req.body.role.value){
			x.role = req.body.role.value;
		}*/
		if(req.body.pass !== null && req.body.pass !== undefined){
			if(req.body.pass.value != ''){
				pass = true;
			}
			else{
				pass = false;
			}
		}
		if(req.body.page !== undefined && req.body.page !== null && req.body.page == "block"){
			if(req.body.name !== undefined && req.body.name !== null){
				x = {};
				if(req.body.name == "Block"){
					console.log("Blocking the user on server side");
					x.verified = false;
				}
				else{
					x.verified = true;
				}
				
			}
		}
		option1 = {where:{'id':req.body.user.id}};
		if(pass){
			bcrypt.hash(req.body.pass.value, 11, function(err, hash) {
				if(err){
					hasherror =true;
					res.send({status:'error',result:'Server Error'});
				}
				else{
					x.password = hash;
					User.update(x,option1)
					.then(result =>{
						const act = {};
						act.activity_type = 'Update';
						act.activity_detail = 'Admin updated password of user '+req.body.username;
						act.ract_user_id = req_user.id;
						req.Activity.insertActivity(act,req.io_activity);
						req.io_activity.emit('userUpdate','yes');
						res.send({status:'ok',result:result});
					})
					.catch(function(error){
						console.log("In single update error");
						console.log(error);
						res.send({status:'error',result:'error in updating the data'+error});
					})
				}
			});
		}
		else{
			console.log("In else part-----------prinitng x");
			console.log(x);
			User.update(x,option1)
			.then(result =>{
				const act = {};
				act.activity_type = 'Update';
				act.activity_detail = 'Admin updated access rights of user '+req.body.username;
				act.ract_user_id = req_user.id;
				req.Activity.insertActivity(act,req.io_activity);
				req.io_activity.emit('userUpdate','yes');
				res.send({status:'ok',result:result});
			})
			.catch(function(error){
				console.log("In single update error");
				console.log(error);
				res.send({status:'error',result:'error in updating the data'+error});
			})
		}
		
	}
	else{
		res.send({status:'error',result:'No data recieved'});
	}
}

exports.findAllUser = (req,res) =>{
	var options = {};
	if(req.body.page !== undefined && req.body.page !== null && req.body.page == "auth"){
		options = {where:{role:{$ne:"admin"}},order:[['createdAt','DESC']],include:[{model:Activity}]};
	}
	else if(req.body.page !== undefined && req.body.page !== null && req.body.page == "details"){
		options = {where:{'id':req.body.id},include:[{model:Activity}]};
	}
	else{
		options= {include:[{model:Activity},{model:Order,include:[{model:Products}]}],order: [
			[ { model: Activity }, 'createdAt', 'DESC']
		  ]};
	}
	User.findAll(options)
	.then(result =>{
		res.send({status:'ok',result:result});
	})
	.catch(function(error){
		console.log("In findall user error");
		console.log(error);
		res.send({status:'error',result:'Error in retreiving the data'});
	})
};

exports.findAndUpdate = (req,res) =>{
	var auth_token = req.get('authorization');
	var hashed_id = '';
	var session_key='';
	var user;
	var req_user = JSON.parse(res.locals.auth_user.user_details);
	if(auth_token !== undefined && auth_token !==null && auth_token != '')
	{				
		auth_token = auth_token.toString();
		hashed_id = auth_token.split('__(break)__')[0];
		session_key = auth_token.split('__(break)__')[2];
	}
	if(req.body !== undefined && req.body !== null){
		if(req.body.id !== null && req.body.id !== undefined){
			User.findAll({where:{'id':req.body.id}})
			.then(result =>{
				console.log(result);
				user = result[0].dataValues;
				return Auth.update({user_details:JSON.stringify(result[0].dataValues)},{ where: {hashed_id: hashed_id, session_key: session_key} })
			})
			.then(result =>{
				console.log(result);
				res.send({status:'ok',result:user});
			})
			.catch(function(error){
				console.log(error);
				res.send({status:'error',result:'Server Error'});
			});
		}
	} 
	else{
		res.send({status:'error',result:'No Data received'});
	}
}

exports.storeNotToken = (req,res) =>{
	var auth_token = req.get('authorization');
	var hashed_id = '';
	var session_key='';
	var user;
	var req_user = JSON.parse(res.locals.auth_user.user_details);
	if(auth_token !== undefined && auth_token !==null && auth_token != '')
	{				
		auth_token = auth_token.toString();
		hashed_id = auth_token.split('__(break)__')[0];
		session_key = auth_token.split('__(break)__')[2];
	}
	if(req.body !== undefined && req.body !== null){
		if(req.body.token !== undefined && req.body.token !== null){
			var option1 = {'notificationToken':req.body.token}
			var option2 = {where:{'id':req_user.id}};
			User.update(option1,option2)
			.then(result => {
				console.log("------Notifiction token stored------");
				console.log(result);
				return User.findAll({where:{'id':req_user.id}});
			})
			.then(result =>{
				user = result[0].dataValues;
				return Auth.update({user_details:JSON.stringify(result[0].dataValues)},{ where: {hashed_id: hashed_id, session_key: session_key} })
			})
			.then(result =>{
				console.log(result);
				res.send({status:'ok',result:user});
			})
			.catch(function(error){
				console.log(error);
				res.send({status:'error',result:'Server Error'});
			});
		}
		else{
			res.send({status:'error',result:'No Data received'});
		}
	}
	else{
		res.send({status:'error',result:'No Data received'});
	}
}