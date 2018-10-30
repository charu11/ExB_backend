var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user.js');

// register

router.get('/register', function(req, res){
    res.render('register');
});

// log in
router.get('/login', function(req, res){
    res.render('login');
});

router.post('/login', function(req, res){
    User.create(req.body, function(err){
        if(err){
            res.status(400).send(err)
        }
        else{
            res.status(200).send({success:"success"})
        }
    })
});
 




router.get('/reservation', function(req, res){
    res.render('reservation');

});
// register User

router.post('/register', function(req, res){
    var name = req.body.name;
    var email = req.body.email;
    var country = req.body.country;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;

   // Validation

   req.checkBody('name', 'Name is required').notEmpty();
   req.checkBody('username', 'username is required').notEmpty();
   req.checkBody('email', 'Email is required').notEmpty();
   req.checkBody('email', 'email is not valid').isEmail();
   req.checkBody('country', 'country is required').notEmpty();
    req.checkBody('password', 'password is required').notEmpty();
   req.checkBody('password2', 'password do not match').equals(req.body.password);

  

var errors = req.validationErrors();

   if(errors){
       res.render('register',{
           errors:errors
       });
   }else{
    var newUser = new User({
        name: name,
        username: username,
        email: email,
        country: country,
        password: password,
       

    });
    User.createUser(newUser, function(err, User){
        if(err) throw err;
        console.log(User);

        res.redirect('/users/reservation');
    });
     req.flash('success_msg', 'you are registered now you can login');
s
  }

});  

passport.use(new LocalStrategy(
    function(username, password, done){
    User.getUserByUsername(username, function(err, User){
        if(err) throw err; 
        if(!User){
            return done(null, false, {message: 'unknown User'});       
        }

        User.comparePassword(password, User.password, function(err, isMatch){
            if(err) throw err;
            if(isMatch){
                return done(null, User);
            }else{
                return done(null, {message: 'Invalid Password'});
            }
        });
    });
}));

passport.serializeUser(function(User, done){
    done(null, User.id);
});
passport.deserializeUser(function(id, done){
    User.getUserById(id, function(err, User){
        done(err, User);
    });
});
router.post('/login',passport.authenticate('local', {successRedirect: '/users/reservation', failureRedirect: '/users/login', failureFlash: true}));

//passport.authenticate('local', {successRedirect: '/users/reservation', failureRedirect: '/users/login', failureFlash: true}) 


// reservation

router.post('/reservation', function(req, res){
    var checkin = req.body.checkin;
    var checkout = req.body.checkout;
    var rooms = req.body.rooms;
    var adults = req.body.adults;
    var children = req.body.children;

    console.log(req.body);
});    

module.exports = router;

