const User = require('../models').user;
const Activity = require('../models').activity;


exports.insertActivity = (options, io) => {
    Activity.create(options)
        .then(result => {
            //console.log("Acitivity added");
            //console.log(result.dataValues);
            var options = { where: { 'id': result.dataValues.id }, include: [{ model: User }] };
            return Activity.findAll(options);
        })
        .then(extraresult => {
            var result = extraresult[0].dataValues;

        })
        .catch(function (error) {
            console.log("In activity Catch error");
            console.log(error);
        })
}

exports.fetchActivity = (req, res) => {
    var req_user = JSON.parse(res.locals.auth_user.user_details);
    var user_cond = {};
    var extra;
    if (req.body.id !== null && req.body.id !== undefined) {
        //console.log("In req body and id is: "+req.body.id);
        user_cond = { '$user.id$': req.body.id };
    }
    else {
        user_cond = { '$user.id$': req_user.id };
    }
    Activity.findAll(extra)
        .then(result => {
            //console.log(result);
            res.send({ status: 'ok', result: result });
        })
        .catch(function (error) {
            console.log(error);
            console.log("In acitvity catch error");
            res.send({ status: 'error', result: 'Error in retrieving the data' });
        });
} 
