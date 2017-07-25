module.exports = function(req, res, next) {
    if(req.body.name === '' || req.body.name === undefined){
        return res.status(422).json({
            message : 'Indispensable name'
        })
    }
    next();
};