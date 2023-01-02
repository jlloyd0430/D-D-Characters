const mongoose = require("mongoose");

// Settings for each document within this collection

const characterSchema = new mongoose.Schema({
  id: {
    type: Number,
    // unique: true,
    required: true,
  },
  name: {
    type: String,
    unique: true,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    required: true,
  },
  race: {
    type: String,
    required: true,
  },
});

const Character = mongoose.model("Character", characterSchema);

module.exports = Character;
