export const globalErrHandler = (err, req, res, next) => {
  const stack = err?.stack;
  const statusCode = err?.statusCode ? err?.statusCode : 500;
  const message = err?.message;

  res.status(statusCode).json({
    stack,
    message,
  });
};


// 404 error handler
export const notFound = (req, res, next) => {
  const error = new Error(`Route Not Found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};