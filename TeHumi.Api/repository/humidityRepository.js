import mongoose from 'mongoose';
import HumidityModel from './models/humidityModel';

class HumidityRepository {

  // ==========
  // GET ALL
  // ==========
  getAll(callback) {
    HumidityModel.find((error, humidity) => {
      if (error) {
        callback({ success: false, error: error });
      }
      else {
        callback({ success: true, value: humidity });
      }
    })
  }

  // ==========
  // GET LAST
  // ==========
  getLast(callback) {
    HumidityModel.findOne((error, humidity) => {
      if (error) {
        callback({ success: false, error: error });
      }
      else {
        callback({ success: true, value: humidity });
      }
    })
      .sort({ creationDate: -1 });
  }

  // ==========
  // GET BY ID
  // ==========
  get(id, callback) {
    HumidityModel.findById(id, (error, humidity) => {
      if (error || humidity === null) {
        callback({ success: false, error: 'Humidity not found.' });
      }
      else {
        callback({ success: true, value: humidity });
      }
    })
  }

  // ==========
  // CREATE
  // ==========
  create(humidity, callback) {
    const Humidity = new HumidityModel({
      _id: new mongoose.Types.ObjectId(),
      value: humidity.value,
    });

    Humidity.save((error, humidity) => {
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
  update(humidity, callback) {
    HumidityModel.findById(humidity._id, (error, humidityToUpdate) => {
      if (error || humidityToUpdate === null) {
        callback({ success: false, error: 'Humidity not found.' });
      }
      else {
        humidityToUpdate.value = humidity.value;

        humidityToUpdate.save((error, humidity) => {
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
    HumidityModel.findById(id, (error, humidity) => {
      if (error || humidity === null) {
        callback({ success: false, error: 'Humidity not found.' });
      }
      else {
        humidity.isDeleted = true;

        humidity.save((error, temperature) => {
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

export default HumidityRepository;