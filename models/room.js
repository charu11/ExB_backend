var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

mongoose.connect('mongodb://localhost/explorebelihuloya');

var db = mongoose.connection;

// Room schema

var RoomSchema = mongoose.Schema({
   
    room     :{ type: Number},
    children :{ type: Number},
    Adults   :{ type: Number},
    checkin  :{type : Date},
    checkout :{ type: Date },
});

var Room = module.exports = mongoose.model('Room',RoomSchema);
module.exports.createRoom = function(newRoom, callback){
     
       newRoom.save(callback);

}