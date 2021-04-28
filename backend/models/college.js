const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const collegeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  year_founded: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  no_of_students: {
    type: Number,
    required: true,
  },
  courses: [
    {
      type: String,
      required: true,
    },
  ],
});

module.exports = mongoose.model('College', collegeSchema);
