var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/explorebelihuloya');

var db = mongoose.connection;

// Room schema

var RoomSchema = mongoose.Schema({
   
    room     :{ type: Number},
    children :{ type: Number},
    Adults   :{ type: Number},
    available:{ type: Boolean, default: true },
    checkin  :{type : Date},
    checkout :{ type: Date },
});

var Room = module.exports = mongoose.model('Room',RoomSchema);
module.exports.createRoom = function(newRoom, callback){

    newRoom.save(callback);
}