const {constants} = require('../constants');
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;

    switch (statusCode){
        case constants.NOT_FOUND_ERR:
            res.json({
                title: statusCode+' Not Found',
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case constants.UNAUTHORIZED:
            res.json({
                title: statusCode+' Unauthorized',
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case constants.VALIDATION_ERR:
            res.json({
                title: statusCode+' Validation Failed',
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case constants.SERVER_ERR:
            res.json({
                title: statusCode+' Server Error',
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case constants.FORBIDDEN:
            res.json({
                title: statusCode+' Forbidden',
                message: err.message,
                stackTrace: err.stack
            });
            break;
        default:
            console.log('No error, all good!')
            break;
    }
};


module.exports = errorHandler;