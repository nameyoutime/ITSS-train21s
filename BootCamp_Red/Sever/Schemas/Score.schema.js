const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
    name: String,
    img: String,
  });

module.exports=scoreSchema;