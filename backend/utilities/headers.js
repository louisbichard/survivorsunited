module.exports = function(app) {

    //ALLOW CORS
    //----------
    app.all('*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "http://survivorsunited.dev");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Credentials", "true");
        next();
    });

}