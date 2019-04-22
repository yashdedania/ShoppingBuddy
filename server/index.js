const express = require('express');
const session = require('express-session');
const app = express();
const server = require('http').Server(app);
const fs = require('fs');
const errorHandler = require('errorhandler');
const methodOverride = require('method-override');
const moment = require('moment');
const morgan = require('morgan');
var bodyParser = require('body-parser');
const cors = require('cors');
var io = require('socket.io')(server);
require('dotenv').config();
const env = process.env.NODE_ENV || 'development';
//const env = 'TEST';
const port = process.env.PORT || 3000;
const config = require('./config/config')[env];
const AllowOrigin = config.alloworigin;
var path = require('path');
/*const models_path = __dirname+'/app/models';
fs.readdirSync(models_path).forEach(file => {
  require(models_path+'/'+file);
});*/



app.set("showStackError", true);
app.locals.moment = moment;

// use morgan for logging
app.use(morgan('dev', {
  skip: function (req, res) {
    return res.statusCode < 400;
  }, stream: process.stderr
}));

// use morgan for logging
app.use(morgan('dev', {
  skip: function (req, res) {
    return res.statusCode >= 400
  }, stream: process.stdout
}));

if (process.env.NODE_ENV === "development") {
  app.use(errorHandler());
  app.locals.pretty = true;
}

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

app.use('/public', express.static(path.join(__dirname, 'assets')))

app.use((err, req, res, next) => {
  console.log("Printing url: " + req.url);
  if (err.message.indexOf("not found") !== -1) {
    return next();
  }
  console.log(err.stack);

  res.send({
    status: "error", //500, not found
    error: err.message,
  });
});

app.use(cors({ origin: AllowOrigin, }));
//for sepcial routes like delete..etc, and custom headers
app.options('*', cors({ origin: AllowOrigin, }));

app.use(
  session({
    secret: "noobjs",
    resave: false,
    saveUninitialized: false,
    //cookie: { secure: true },
  })
);


require('./config/routes')(app, io);


const models = require('./models');
models.sequelize.sync({ force: false }).then(function () {

  server.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

});

module.exports = app;
