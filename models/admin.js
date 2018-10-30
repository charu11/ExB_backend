var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

mongoose.connect('mongodb://localhost/explorebelihuloya');

var db = mongoose.connection;

// Admin schema

var AdminSchema = mongoose.Schema({
   
    username:{
        type: String,
        index: true
    },
    password :{
        type: String
    }
});

var Admin = module.exports = mongoose.model('Admin',AdminSchema);

module.exports.createAdmin = function(newAdmin, callback){

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newAdmin.password, salt, function(err, hash) {
       newAdmin.password = hash;
       newAdmin.save(callback);
    });
});
}