// Load the http module to create an http server.
var http = require('http');

/* Get the required URL parts */
var url = require('url');

/* Colours for output colours */
var colors = require('colors');
var incrementer = 0;

var express = require('express');
var app = express();

app.get('/', function(request, response) {

    var url_parts = url.parse(request.url, true);
    var query = url_parts.query;
    var api_name = query.api || "";
    var href = url.parse(request.url).href;
    var status = "200";
    incrementer++
    var incrementer_string = "" + incrementer;
    var response_obj = {
        error: false
    };

    console.log("Request recieved for API: " + api_name.blue.underline);
    console.log("Request ID: ".yellow + incrementer_string.blue);
    console.log("Request href: ".yellow + href.blue);
    console.log("Parameters:".yellow);
    console.log(query);

    if (!api_name) {
        status = 500;
        console.log('Result: Failed!'.red);
        response_obj.result;
        response_obj.error_message = "No API name specified";
    } else {
        console.log('Result: Success!'.green);
        response_obj.result = "result from " + api_name;
    }
    console.log(''); /*Break*/

    response.writeHead(status, {
        "Content-Type": "text/plain"
    });

    response_obj = JSON.stringify(response_obj);
    response.end(response_obj);
});

app.listen(3000);

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:3000/");