module.exports = function(req, res, next) {
    if(req.body.author === '' || req.body.author === undefined){
        return res.status(422).json({
            message : 'Indispensable author'
        })
    }
    next();
};