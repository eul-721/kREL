var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var ShipSchema = new Schema({
  fuel: Number,
  steel: Number,
  bucket: Boolean,
  //s_id : (will link to some ship DBAPI)
  //
  //user_id: Schema.ObjectId
});

//TODO: Add a one to many mapping to girls



module.exports = mongoose.model('Sortie', SortieSchema);
