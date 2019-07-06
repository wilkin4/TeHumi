import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const humiditySchema = new Schema({
  _id: Schema.Types.ObjectId,
  value: Number,
  creationDate: { type: Date, default: Date.now },
  modificationDate: { type: Date, default: null},
  deleteDate: { type: Date, default: null },
  isDeleted: { type: Boolean, default: false }
});

const HumidityModel = mongoose.model('Humidity', humiditySchema);

export default HumidityModel;