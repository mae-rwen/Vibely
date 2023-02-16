const errorHandler = (err, req, res, next) => {

    res.status(err.statusCode || 500).send(err.message || "Ups! something went wrong" )
};

module.exports = {
    errorHandler,
}