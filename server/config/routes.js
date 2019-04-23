const express = require("express");
const router = express.Router();
const Users = require('../controllers/User');
const Utils = require('../controllers/utils/Auth');
const Activity = require('../controllers/Activity');
const Products = require('../controllers/Product');
const Order = require('../controllers/Order');
var Authorization = require('./middleware/Authorization');

module.exports = (app, io) => {

  app.use("/", router);


  /****
    Auth for login and register
*****/


  router.post('/protectedAuth', Authorization.protectedAuth);

  router.post('/register', Users.register);

  router.use(function (req, res, next) {
    req.io = io;
    req.io_activity = io.of('/socket_activity');
    req.Activity = Activity;
    next();
  });
  router.post('/login', Users.login);


  /****
    Auth required for each route after this
*****/
  router.use(Authorization.isAuthenticated);




  router.post('/isAuthenticated', Utils.isAuthenticated);

  /* User routes */
  router.post('/findAllUser', Users.findAllUser);
  router.post('/updateUser', Users.updateUser);
  router.post('/singleUpdateUser', Users.singleUpdate);
  router.post('/findAndUpdate', Users.findAndUpdate);
  router.post('/storeNotToken', Users.storeNotToken);
  router.post('/sendMail', Users.sendMail);
  router.post('/getsingle', Users.getsingle);
  router.post('/updatebudget', Users.updateBudget);

  /* Activity routes */
  router.post('/getactivity', Activity.fetchActivity);
  /* Logout Routes */
  router.post('/logout', Authorization.logout);


  /* Products */
  router.post('/insertproduct', Products.insert);
  router.post('/findproducts', Products.find);
  router.post('/insertMultipleProduct', Products.multipleInsert);
  router.post('/deleteproduct', Products.delete);

  /* Orders */
  router.post('/addproducts', Order.add);
  router.post('/findorders', Order.findorder);
  router.post('/updateproducts', Order.update);
  router.post('/removeproducts', Order.remove);
  router.post('/billpay', Order.billpay);
  router.post('/paymentGateway', Order.paymentModule);
  router.post('/findAllOrders', Order.findAllOrders);
  router.post('/psingleUpdate', Order.psingleUpdate);
  router.post('/findUserOrders', Order.findUserOrders);
};




