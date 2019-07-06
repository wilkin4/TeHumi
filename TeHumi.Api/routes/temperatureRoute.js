import express from 'express';
import TemperatureRepository from '../repository/temperatureRepository';
import ResponseResult from '../repository/responses/responseResult';

const router = express.Router();
const temperatureRepository = new TemperatureRepository();

// ==========
// GET ALL
// ==========
router.get('/', (request, response) => {
  temperatureRepository.getAll(result => {
    ResponseResult(result, response);
  });
});

// ==========
// GET LAST
// ==========
router.get('/last', (request, response) => {
  temperatureRepository.getLast(result => {
    ResponseResult(result, response);
  });
});

// ==========
// GET BY ID
// ==========
router.get('/:id', (request, response) => {
  temperatureRepository.get(request.params.id, result => {
    ResponseResult(result, response);
  });
});

// ==========
// POST
// ==========
router.post('/', (request, response) => {
  temperatureRepository.create(request.body, result => {
    ResponseResult(result, response);
  });
});

// ==========
// PUT
// ==========
router.put('/', (request, response) => {
  temperatureRepository.update(request.body, result => {
    ResponseResult(result, response);
  });
});

// ==========
// DELETE
// ==========
router.delete('/:id', (request, response) => {
  temperatureRepository.delete(request.params.id, result => {
    ResponseResult(result, response);
  });
});

export default router;