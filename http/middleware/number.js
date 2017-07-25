module.exports = function (req, res, next) {
    if(isNaN(req.params.id)){
        return res.status(422).json({
            message: 'id not invalid'
        });
    }
    next();
};