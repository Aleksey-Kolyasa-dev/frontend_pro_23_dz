const express = require('express');
const usersRouter = express.Router();
const User = require('../models/user.model').User;


usersRouter.get('/', function (req, res) {
    res.render('../dist/index.html', {title: 'DO It APP'});
});


// POST USER REGISTRATION
usersRouter.post('/users/registration', function (req, res) {
    let newUser = req.body;

    if (!newUser.login || !newUser.password || !newUser.name) {
        res.send(new UserValidationError('VALIDATION'));
    }
    else {
        let user = new User({
            login: newUser.login,
            password: newUser.password,
            name: newUser.name,
            isLogged: false
        });

        user.save(function (err, data) {
            if (err) {
                console.log(err);
                res.sendStatus(401);
            } else {
                res.json(data);
                console.log('CALL POST BY: NEW USER: ' + data.name + ' REGISTRED - OK');
            }
        });
    }


});

// POST USER LOGIN
usersRouter.post('/users/login', function (req, res) {
    let loginData = req.body;

    if (!loginData.login || !loginData.password) {
        res.send(new UserValidationError('VALIDATION'));
    }
    else {
        User.findOne({ login : loginData.login }, function (err, data) {
            if (err) {
                console.log(err);
                res.send(err);
            }
            else if(!data){
                console.log(new UserNotFoundError(loginData.login));
                res.end();
            }
            else if(!data.checkPassword(loginData.password + data.salt)){
                console.log('PASSWORD VALIDATION FAILED! - ERROR');
                res.sendStatus(401);
            }
            else {
                User.update(data, { $set: { isLogged: true} }, {}, function (err) {
                    if(err){
                        res.sendStatus(404);
                    } else {
                        res.json(data);
                        console.log('CALL POST LOGIN BY: USER: ' + data.name + ' - OK');
                    }
                });
            }
        });
    }


});

// PUT USER LOGOUT
usersRouter.put('/users/logout/:id', function (req, res) {
        if(req.params.id){
            User.findOne({_id: req.params.id}).update( {$set: { isLogged: false }}, function (err, data) {
                if (err) {
                    console.log(err);
                    res.send(err);
                }
                else {
                    console.log('CALL PUT By USER LOG OUT - OK');
                    res.send(data);
                }
            });
        } else {
            console.log('CALL PUT By USER LOG OUT: NOT FOUND - ERROR');
            res.sendStatus(404);
        }
});

// PUT USER MARKERS SAVE
usersRouter.put('/users/saveMarkers/:id', function (req, res) {

    if(req.params.id && Array.isArray(req.body)){

        User.findOne({_id: req.params.id}).update( {$set: { markers: req.body }}, function (err, data) {
            if (err) {
                console.log(err);
                res.send(err);
            }
            else {
                console.log('CALL PUT By USER SAVE MARKERS - OK');
                res.send(data);
            }
        });

    }
    else {
        console.log('CALL PUT By USER SAVE MARKERS: NOT FOUND Or BAD DATA REQUEST - ERROR');
        res.sendStatus(404);
    }
});

// GET USER MARKERS
usersRouter.get('/users/getMarkers/:id', function (req, res) {

    if(req.params.id){

        User.findOne({_id: req.params.id}, function (err, user) {
            if (err) {
                console.log(err);
                res.send(err);
            }
            else {
                console.log('CALL GET MARKERS By USER - OK');
                res.send(user.markers);
            }
        });

    }
    else {
        console.log('CALL GET MARKERS By USER: NOT FOUND - ERROR');
        res.sendStatus(404);
    }
});

module.exports = usersRouter;



// USER NOT FOUND Error Ctor Fn
function UserNotFoundError(property) {
    Error.call(this, property);
    this.name = 'UserNotFoundError';
    this.property = property;
    this.message = "ERROR: " + property + " NOT FOUND!";
    if (Error.captureStackTrace) {
        Error.captureStackTrace(this, UserNotFoundError);
    } else {
        this.stack = (new Error()).stack;
    }
}
UserNotFoundError.prototype = Object.create(Error.prototype);

// USER VALIDATION FAILED Error Ctor Fn
function UserValidationError(property) {
    Error.call(this, property);
    this.name = 'UserValidationError';
    this.property = property;
    this.message = "ERROR: USER" + property + " FAILED!";
    if (Error.captureStackTrace) {
        Error.captureStackTrace(this, NewUserValidationError);
    } else {
        this.stack = (new Error()).stack;
    }
}
UserValidationError.prototype = Object.create(Error.prototype);