const mongoose = require('mongoose');

let Schema = mongoose.Schema;
let calendarSchema = new Schema({
  user_id: { type: Schema.ObjectId, required: true },
  day: { type: Number, required: true },
  events: [{
    start: { type: Number, required: true },
    duration: { type: Number, required: true },
    title: { type: String, required: true }
  }],
  created_at: Date,
  updated_at: Date
});

let Calendar = mongoose.model('Calendar', calendarSchema);

module.exports = Calendar;