const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: String,
  content:String,
  createDate:Number,
  deadLine:Number
});


module.exports = taskSchema;