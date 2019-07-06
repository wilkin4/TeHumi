import mongoose from 'mongoose';
import TemperatureModel from './models/temperatureModel';

class TemperatureRepository {

  // ==========
  // GET ALL
  // ==========
  getAll(callback) {
    TemperatureModel.find((error, temperatures) => {
      if (error) {
        callback({ success: false, error: error });
      }
      else {
        callback({ success: true, value: temperatures });
      }
    })
  }

  // ==========
  // GET LAST
  // ==========
  getLast(callback) {
    TemperatureModel.findOne((error, temperature) => {
      if (error) {
        callback({ success: false, error: error });
      }
      else {
        callback({ success: true, value: temperature });
      }
    })
      .sort({ creationDate: -1 });
  }

  // ==========
  // GET BY ID
  // ==========
  get(id, callback) {
    TemperatureModel.findById(id, (error, temperature) => {
      if (error || temperature === null) {
        callback({ success: false, error: 'Temperature not found.' });
      }
      else {
        callback({ success: true, value: temperature });
      }
    })
  }

  // ==========
  // CREATE
  // ==========
  create(temperature, callback) {
    const Temperature = new TemperatureModel({
      _id: new mongoose.Types.ObjectId(),
      value: temperature.value,
    });

    Temperature.save((error, temperature) => {
      if (error) {
        callback({ success: false, error: error });
      }
      else {
        callback({ success: true });
      }
    });
  }

  // ==========
  // UPDATE
  // ==========
  update(temperature, callback) {
    TemperatureModel.findById(temperature._id, (error, temperatureToUpdate) => {
      if (error || temperatureToUpdate === null) {
        callback({ success: false, error: 'Temperature not found.' });
      }
      else {
        temperatureToUpdate.value = temperature.value;

        temperatureToUpdate.save((error, temperature) => {
          if (error) {
            callback({ success: false, error: error });
          }
          else {
            callback({ success: true });
          }
        });
      }
    });
  }

  // ==========
  // DELETE
  // ==========
  delete(id, callback) {
    TemperatureModel.findById(id, (error, temperature) => {
      if (error || temperature === null) {
        callback({ success: false, error: 'Temperature not found.' });
      }
      else {
        temperature.isDeleted = true;

        temperature.save((error, temperature) => {
          if (error) {
            callback({ success: false, error: error });
          }
          else {
            callback({ success: true });
          }
        });
      }
    });
  }

}

export default TemperatureRepository;