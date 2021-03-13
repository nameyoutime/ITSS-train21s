const mongoose = require("mongoose");

const birdSchema = new mongoose.Schema({
    name: String,
    img: String,
  });

module.exports=birdSchema;