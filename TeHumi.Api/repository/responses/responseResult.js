const ResponseResult = (result, response) => {
  if (result.success) {
    response.send({
      status: true,
      result: result.value
    });
  }
  else {
    response.status(500).send({
      status: false,
      result: result.error
    });
  }
}

export default ResponseResult;