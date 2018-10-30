const express = require('express');
const router = express.Router(); 
const User = require('../models/user');

router.get('/users', function(req, res){
    res.send({type: GET});
});


// add a new ninja to the db

router.post('/api/users', function(req, res){
   User.create(req.body).then(function(User){
    res.send(User);
   });
   
});