const response = (res, result, message, code) => {
  return res.status(code).json({
    data: result,
    message: message,
    code: code
  });
}

const error = (err, description, code = 500) => ({ err, code, data: null, message: description });


module.exports = {response, error}