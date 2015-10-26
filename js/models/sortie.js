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
SortieSchema.index({date: 1});

SortieSchema.statics.getRecordsForYearMonth = function(user_id,map,yearMonth){
  yearMonth = yearMonth.split(",");
  var start = new Date(yearMonth[0],yearMonth[1]-1,1);
  var end = new Date(yearMonth[0],yearMonth[1],0);
  return this.find({user_id:user_id,map:map,date:{$gte: start, $lt: end}});
};

module.exports = mongoose.model('Sortie', SortieSchema);
