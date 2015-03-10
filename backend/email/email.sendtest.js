var email = require('../utilities/utilities.email.js');

module.exports = function(req, res) {

    var respond = require('../utilities/utilities.respond.js')({
        req: req,
        res: res,
        file: __dirname + __filename
    });

    email.sendEmail({
        'subject': 'Test email subject line',
        'to': ['contact@louisjohnbichard.co.uk'],
        'template': 'backend/email/templates/example.html'
    }).then(function() {
        respond.success('send email asynx');
    });
};