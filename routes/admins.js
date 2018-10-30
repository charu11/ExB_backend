var express = require('express');
var router = express.Router();

var Admin = require('../models/admin');


// admin log in

router.get('/adminLogin', function(req, res){
    res.render('adminLogin')
});

router.post('/adminLogin', function(req, res){
    Admin.create(req.body, function(err){
        if(err){
            res.status(400).send(err)
        }
        else{
            res.status(200).send({success:"success"})
        }
    })
});

// reservation

router.get('/login/reservation', function(req, res){
    res.render('reservation');
})

module.exports = router;