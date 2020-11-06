const process = require("process");
const mongoose = require("mongoose");  // import 
const autoIncrement = require('mongoose-auto-increment');

const mongoConfig = require("../config/mongodb.json");

let dbURI = mongoConfig.url;
let dbOptions = mongoConfig.options;

mongoose.connect(dbURI, dbOptions);

// When successfully connected
mongoose.connection.on('connected', function () {  
  console.log('Mongoose default connection open to ' + dbURI);
}); 

// If the connection throws an error
mongoose.connection.on('error',function (err) {  
  console.log('Mongoose default connection error: ' + err);
}); 

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {  
  console.log('Mongoose default connection disconnected'); 
});

// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function() {  
  mongoose.connection.close(function () { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
  }); 
}); 

//auto increment setup
autoIncrement.initialize(mongoose.connection);

module.exports = mongoose;