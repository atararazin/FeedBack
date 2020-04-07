if(process.env.NODE_ENV == 'production'){
    module.exports = require('./prod');
} else{//dev mode -- get dev keys
    module.exports = require('./dev');
}