module.exports = (req, res, next) => {
    if(req.user.credits < 1){
        return res.status(403).send({error: 'You don\'t have enough credits to create a new survey!'});
    }
    next();//next calls the next thing when its done
}