
var colors = require('colors');

// SPACE AT START OF LOGS
console.log(' ');
console.log(' NODE UNIT TESTS STARTED! '.white.bold.underline.bgRed);

setTimeout(function(){
	console.log('some timeout function');
}, 1000);
