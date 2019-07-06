import express from 'express';
import HumidityRepository from '../repository/humidityRepository';
import ResponseResult from '../repository/responses/responseResult';

const router = express.Router();
const humidityRepository = new HumidityRepository();

// ==========
// GET ALL
// ==========
router.get('/', (request, response) => {
  humidityRepository.getAll(result => {
    ResponseResult(result, response);
  });
});

// ==========
// GET LAST
// ==========
router.get('/last', (request, response) => {
  humidityRepository.getLast(result => {
    ResponseResult(result, response);
  });
});

// ==========
// GET BY ID
// ==========
router.get('/:id', (request, response) => {
  humidityRepository.get(request.params.id, result => {
    ResponseResult(result, response);
  });
});

// ==========
// POST
// ==========
router.post('/', (request, response) => {
  humidityRepository.create(request.body, result => {
    ResponseResult(result, response);
  });
});

// ==========
// PUT
// ==========
router.put('/', (request, response) => {
  humidityRepository.update(request.body, result => {
    ResponseResult(result, response);
  });
});

// ==========
// DELETE
// ==========
router.delete('/:id', (request, response) => {
  humidityRepository.delete(request.params.id, result => {
    ResponseResult(result, response);
  });
});

export default router;