const mongoose = require('mongoose');


mongoose.set('debug',true);
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGOURI, {useNewUrlParser: true});
const connection=mongoose.connection;
connection.once('open',()=>{
   console.log("MongoDB database connection established successfully");
});


module.exports.User = require('./user');
module.exports.Poll = require('./poll');
