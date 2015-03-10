var Promise = require('bluebird');
var _ = require('lodash');
var fs = require('fs');

// load aws sdk
var aws = require('aws-sdk');

// load aws config
aws.config.loadFromPath('./config.json');

var ses = new aws.SES({
    apiVersion: '2010-12-01'
});


Promise.promisifyAll(ses);



module.exports = {
    sendEmail: function(config) {
        var template_html;

        if (config.template) {
            template_html = fs.readFileSync(config.template, 'utf-8');
        }

        // TODO: DO SOME TYPE CHECKING ON THE TO ARRAY ETC
        return ses.sendEmailAsync({
            Source: 'contact@louisjohnbichard.co.uk',
            Destination: {
                ToAddresses: config.to
            },
            Message: {
                Subject: {
                    Data: config.subject
                },
                Body: {
                    Html: {
                        Data: template_html ? template_html : ''
                    }
                }
            }
        });
    }
};