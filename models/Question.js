const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  option1: {
    type: String,
    required: true
  },
  option2: {
    type: String,
    required: true
  },
    option3: {
        type: String,
        required: true
    },
    option4: {
        type: String,
        required: true
    },
    image:{
      type: String
    }
  // Add other fields as needed
});

module.exports = mongoose.model('Question', QuestionSchema);