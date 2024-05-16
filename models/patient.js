const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true,
    minlength: 10
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^[0-9]+$/.test(v) && v.length >= 10;
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  password: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true
  },
  psychiatristID: {
    type: Schema.Types.ObjectId,
    ref: 'Psychiatrist',
    required:true
  },
  hospitalID: {
    type: Schema.Types.ObjectId,
    ref: 'Hospital',
    required: true
  }
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
