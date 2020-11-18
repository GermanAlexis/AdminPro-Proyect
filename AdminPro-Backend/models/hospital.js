const { Schema, model, SchemaTypes } = require('mongoose');

const hospitalSchema = Schema({
  name_hospital: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  user: {
    type: SchemaTypes.ObjectId,
    ref: 'Users',
  },
});

hospitalSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.hid = _id;
  return object;
});

module.exports = model('Hospitals', hospitalSchema);
