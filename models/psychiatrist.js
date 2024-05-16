const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const psychiatristSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  hospitalID: {
    type: Schema.Types.ObjectId,
    ref: 'Hospital',
    required: true
  },
  totalPatients: {
    type: Number,
    required: true,
    default: 0
  },
  patients: [{
    type: Schema.Types.ObjectId,
    ref: 'Patient'
  }]
});

const Psychiatrist = mongoose.model('Psychiatrist', psychiatristSchema);

module.exports = Psychiatrist;
