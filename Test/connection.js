const mongoose = require('mongoose');

//connect to mongoDB

mongoose.connect('mongodb://localhost/explorebelihuloya');
mongoose.Promise  = global.Promise;
mongoose.connection.once('open', function(){
    console.log('you are good to go');

}).on('error', function(error){
    console.log('Connection error',error);
});

// connect to front end

var cors = require('cors');
app.use(
    cors(
      {
          origin:'http://localhost:4200'
      }  
    )
);