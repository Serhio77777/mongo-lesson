const mongoose = require('mongoose');
const connection = mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});

const qwertyScheme = mongoose.Schema({
  title: String,
  author: String,
  year: String,
  pages: Number,
  comment: String,
  date: { type: Date, default: Date.now }
});

const Qwerty = mongoose.model('Qwerty', qwertyScheme);

module.exports = {
  connection,
  Qwerty
}