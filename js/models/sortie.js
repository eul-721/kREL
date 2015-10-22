var mongoose = require('mongoose');


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
});

//TODO: Add a one to many mapping to girls

SortieSchema.index({map: 1});

module.exports = mongoose.model('Sortie', SortieSchema);
