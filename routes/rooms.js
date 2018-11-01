var express = require('express');
var router = express.Router();

var Room = require('../models/room');


// room book

router.get('/reservation', function(req, res){
    res.render('reservation')
});

router.post('/reservation', function(req, res){
    Room.create(req.body, function(err){
        if(err){
            res.status(400).send(err)
        }
        else{
            res.status(200).send({success:"success"})
        }
    })
});

// reservation



module.exports = router;