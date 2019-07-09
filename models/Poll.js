const mongoose = require('mongoose');

const pollSchema = mongoose.Schema({
  title: String,
  description: String
});

const Poll = mongoose.model('Poll', pollSchema);  

module.exports = Poll;