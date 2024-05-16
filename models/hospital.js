const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hospitalSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  totalPsychiatrists: {
    type: Number,
    required: true,
    default: 0
  },
  totalPatients: {
    type: Number,
    required: true,
    default: 0
  },
  psychiatrists: [{
    type: Schema.Types.ObjectId,
    ref: 'Psychiatrist'
  }]
}, {
  timestamps: true
});

const Hospital = mongoose.model('Hospital', hospitalSchema);

module.exports = Hospital;
