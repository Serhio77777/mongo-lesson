const mongoose = require('mongoose');
const connection = mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});

const qwertyScheme = mongoose.Schema({
  title: String,
  author: String,
  body: String,
  comments: [{ body: String }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs: Number
  }
});

const Qwerty = mongoose.model('Qwerty', qwertyScheme);

module.exports = {
  connection,
  Qwerty
}