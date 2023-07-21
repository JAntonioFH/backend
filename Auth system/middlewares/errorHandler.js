const {ValidationError} = require('sequelize')


function logErrors (error, req, res, next){
  console.log(error);
  next(error);
}
function boomErrorHandler(error, req, res, next){
  if (error.isBoom) {
    const {output} = error;
    res.status(output.statusCode).json(output.payload)
  }
  next(error);
}

function ormErrorHandler(err,req,res,next){
  if(err instanceof ValidationError){
    res.status(409).json({
      statusCode:409,
      message:err.name,
      errors:err.errors
    });
  }
  next(err);
}

function errorHandler(error, req, res, next){
  // res.status(500).json({
  //   message:error.message,
    // stack:error.stack,
      res.json({
    message:error.message,
  })
}

module.exports = {logErrors,errorHandler,boomErrorHandler,ormErrorHandler};


