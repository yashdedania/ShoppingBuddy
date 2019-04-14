//const Cookies = require('universal-cookie');


const Auth = require('../../models').auth;

exports.protectedAuth = (req, res) => {


  var auth_token = req.get('authorization');
  if (auth_token !== undefined && auth_token !== null && auth_token != '') {
    auth_token = auth_token.toString();
  }
  console.log(auth_token);
  var disallowed_values = [null, undefined, '', 'true', '1', 'undefined', 'null', false];

  if (disallowed_values.indexOf(auth_token) === -1) {

    var hashed_id = auth_token.split('__(break)__')[0];
    var random_string = auth_token.split('__(break)__')[1]; var session_key = auth_token.split('__(break)__')[2];
    //console.log("random string: "+random_string);
    //console.log("Session key: "+session_key);
    Auth.findOne({ where: { hashed_id: hashed_id, session_key: session_key } })
      .then(user => {
        if (user != null) {
          //console.log(user.user_details);
          if (user.random_string === random_string) {
            console.log("already Logged in sending user details");
            res.send({ status: 'loggedin', result: { user: user.user_details } });
          }
          else {
            console.log("Deleteing Auth because mismatch");
            //delete the user from Auth cuz token mismatch is a crime
            Auth.destroy({ where: { hashed_id: hashed_id, session_key: session_key }, force: true })
              .then(affectedRows => {
                res.send({ status: 'ok', result: 'You can log in' });
              })
              .catch(error => { console.log(error.message); res.send({ status: 'error', result: 'Server Error. Please try again.' }); });
          }
        }
        else {
          console.log("Null error");
          res.send({ status: 'ok', result: 'You can log in' });
        }
      })
      .catch(error => { console.log(error.message); res.send({ status: 'error', result: 'Server Error. Please try again.' }); });

  }
  else {
    res.send({ status: 'ok', result: 'You can log in', });
  }
}




exports.isAuthenticated = (req, res, next) => {
  //console.log(req.body);

  var auth_token = req.get('authorization');
  console.log("----------------------auth token-------------------");
  console.log(auth_token);
  if (auth_token !== undefined && auth_token !== null && auth_token != '') {
    auth_token = auth_token.toString();
  }
  var disallowed_values = [null, undefined, '', 'true', '1', 'undefined', 'null', false];

  if (disallowed_values.indexOf(auth_token) === -1) {

    var hashed_id = auth_token.split('__(break)__')[0];
    var random_string = auth_token.split('__(break)__')[1]; var session_key = auth_token.split('__(break)__')[2];

    Auth.findOne({ where: { hashed_id: hashed_id, session_key: session_key } })
      .then(auth_user => {
        if (auth_user != null) {
          if (auth_user.random_string === random_string) {
            console.log("----Authentication-----");
            console.log(auth_user.dataValues);
            res.locals.auth_user = auth_user.dataValues;
            next();
          }
          else {
            //delete the user from Auth cuz token mismatch is a crime
            Auth.destroy({ where: { hashed_id: hashed_id, session_key: session_key }, force: true })
              .then(affectedRows => {
                res.send({ status: 'error', result: 'Sorry. You are not authorized. Please Log In.' });
              })
              .catch(error => { console.log(error.message); res.send({ status: 'error', result: 'Server Error. Please try again.' }); });
          }
        }
        else {
          res.send({ status: 'error', result: 'Sorry. You are not authorized.' });
        }
      })
      .catch(error => { console.log(error.message); res.send({ status: 'error', result: 'Server Error. Please try again.' }); });

  }
  else {
    res.send({ status: 'error', result: 'Please log in first', });
  }

}


//just for header loginbutton
exports.headerLoggedIn = (req, res, next) => {
  console.log('auth_token: ', req.get('authorization')); //console.log(req.body);

  var auth_token = req.get('authorization').toString();

  var disallowed_values = [null, undefined, '', 'true', '1', 'undefined', 'null', false];

  if (disallowed_values.indexOf(auth_token) === -1) {

    var hashed_id = auth_token.split('__(break)__')[0];
    var random_string = auth_token.split('__(break)__')[1]; var session_key = auth_token.split('__(break)__')[2];

    Auth.findOne({ where: { hashed_id: hashed_id, session_key: session_key } })
      .then(auth_user => {
        if (auth_user != null) {
          if (auth_user.random_string === random_string) {
            let abc = JSON.parse(auth_user.user_details);
            res.send({ status: 'ok', result: { user: { ...abc } }, });
          }
          else {
            //delete the user from Auth cuz token mismatch is a crime
            Auth.destroy({ where: { hashed_id: hashed_id, session_key: session_key }, force: true })
              .then(affectedRows => {
                res.send({ status: 'error', result: 'cookie ' });
              })
              .catch(error => { console.log(error.message); res.send({ status: 'error', result: 'Server Error. Please try again.' }); });
          }
        }
        else {
          res.send({ status: 'error', result: 'Not logged in' });
        }
      })
      .catch(error => { console.log(error.message); res.send({ status: 'error', result: 'Server Error. Please try again.' }); });

  }
  else {
    res.send({ status: 'error', result: 'Not logged in', });
  }

}


exports.logout = (req, res) => {
  console.log("IN Logout");
  var req_user = JSON.parse(res.locals.auth_user.user_details);
  var auth_token = req.get('authorization');
  console.log(auth_token);
  var hashed_id = auth_token.split('__(break)__')[0];
  var random_string = auth_token.split('__(break)__')[1]; var session_key = auth_token.split('__(break)__')[2];
  const act = {};
  var extra = '1'
  act.activity_type = 'Logout';
  act.activity_detail = 'Staff Logged out';
  act.ract_user_id = req_user.id;
  //act.ract_request = extra;
  Auth.destroy({ where: { hashed_id: hashed_id, session_key: session_key }, force: true })
    .then(affectedRows => {
      req.Activity.insertActivity(act, req.io_activity);
      res.send({ status: 'ok', result: 'You have been logged out successfully' });
    })
    .catch(error => { console.log(error.message); res.send({ status: 'error', result: 'Server Error. Please try again.' }); });
}
