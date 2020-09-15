const { Schema, model, SchemaTypes } = require('mongoose');

const medicSchema = Schema({
  name_medic: {
    type: String,
    required: true,
  },
  area_medic: {
    type: String,
    required: true,
    default: 'General',
  },
  img: {
    type: String,
  },
  user: {
    type: SchemaTypes.ObjectId,
    ref: 'Users',
  },
  hospital: {
    type: SchemaTypes.ObjectId,
    ref: 'Hospitals',
  },
});

medicSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.uid = _id;
  return object;
});

module.exports = model('Medics', medicSchema);
