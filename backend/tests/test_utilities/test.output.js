
var colors = require('colors');

// SPACE AT START OF LOGS
console.log(' ');
console.log(' NODE ENDPOINT TESTS STARTED! '.white.bold.underline.bgRed, '\n');

//TODO: FIND SOME WAY TO MAKE FOREVER RUN WITHOUT A WAIT
setTimeout(function(){
	console.log('Waiting 1 second for forever to boot server');
}, 1000);
