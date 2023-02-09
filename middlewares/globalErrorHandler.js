//global error handler
const errorHandler = (err, req, res, next) => {
  //status
  const status = err.status ? err.status : "Failed";
  //message
  const message = err.message;
  //stack
  const stack = err.stack;
  //status code
  const statusCode = err.statusCode ? err.status : 500;
  res.status(statusCode).json({
    status,
    message,
    stack,
  });
};
//Not found error
const notFound = (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on the server`);
  next(err);
};

module.exports = { errorHandler, notFound };
