const mongoose = require("mongoose");
const { Schema } = mongoose;

const NoteSchema = new Schema({
  title: {
    type : String,
    required: true,
  },
  description : {
    type : String,
  }
});


module.exports = mongoose.model('Note', NoteSchema)
