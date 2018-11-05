var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user.js');
var Room = require('../models/room.js');


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

  }

});  

           // reservation

router.get('/reservation', function(req, res){
    res.render('reservation');
});

router.post('/reservation', function(req, res){
   
        var checkIn = req.body.checkIn;
        var checkOut = req.body.checkOut;
        var room = req.body.room;
        var adults = req.body.adults;
        var children = req.body.children;
        
        // reservation validation 

        req.checkBody('checkIn', 'checkIn is required').notEmpty();
        req.checkBody('checkOut', 'checkOut is required').notEmpty();
        req.checkBody('room', 'room is required').notEmpty();
        req.checkBody('children', 'children is required').notEmpty();
  
        var errors = req.validationErrors();

   if(errors){
       res.render('reservation',{
           errors:errors
       });
   }else{
    var newRoom = new Room({
        checkIn: checkIn,
        checkOut: checkOut,
        room: room,
        adults: adults,
        children: children,
    
});

Room.createRoom(newRoom, function(err, Room){
    if(err) throw err;
    console.log(Room);

    res.redirect('/users');
});


}

});  

module.exports = router;

