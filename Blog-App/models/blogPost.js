const mongoose = require("./mongo"); // mongodb connection setup
var autoIncrement = require('mongoose-auto-increment'); //for auto incrementing during create

let Schema = mongoose.Schema;

var blogPost = new Schema({
    postId: {
        type: Number,
        unique: true, // primary key
    },
    postHeader: String,
    createdBy : String,
    createdOn : {type: Date, default: Date.now},
    updatedBy : String,
    updatedOn : {type: Date, default: Date.now}
}, { strict: false });  // in order to capture unstructured data you can go with flexible schema

blogPost.plugin(autoIncrement.plugin, {model: 'blogPost', field: 'postId', startAt: 1});
module.exports = mongoose.model('blogPost', blogPost);

