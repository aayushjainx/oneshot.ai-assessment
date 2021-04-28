const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  year_of_batch: {
    type: Number,
    required: true,
  },
  college_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'College',
  },
  skills: [
    {
      type: String,
      required: true,
    },
  ],
});
module.exports = mongoose.model('Student', studentSchema);
