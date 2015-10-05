var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/kREL');

var Schema = mongoose.Schema;

var SortieSchema = new Schema({
  date: {type: Date, default: Date.now},
  map: String,
  fuel: Number,
  ammo: Number,
  steel: Number,
  bauxite: Number,
  result: String,
  comments: String,
  user_id: Schema.ObjectId
})

module.exports = mongoose.model('Sortie', SortieSchema);
