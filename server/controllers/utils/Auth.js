

const Auth = require('../../models').auth;

exports.isAuthenticated = (req,res,next) => {
  console.log('in isAuthenticated');
  
  //var auth_token = req.get('authorization');
  //var hashed_id = auth_token.split('__(break)__')[0];
  //var random_string = auth_token.split('__(break)__')[1]; var session_key = auth_token.split('__(break)__')[2];
  var hashed_id = res.locals.auth_user.hashed_id; var random_string = res.locals.auth_user.random_string;
  var session_key = res.locals.auth_user.session_key;

  //generate new auth_token to be sent. put in res header..
  let random_string_new = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  let auth_token_new = hashed_id + '__(break)__' + random_string_new + '__(break)__' + session_key;
  //update auth record
  Auth.update({ random_string: random_string_new}, { where: {hashed_id: hashed_id, session_key: session_key} })
  .then(result => {
    if (result)
      res.send({ status: 'ok', result: JSON.parse(res.locals.auth_user.user_details), auth_token: auth_token_new});
  })
  .catch(error => { console.log(error.message); res.send({ status: 'error', result: 'Server Error. Please try again.'}); });
}
