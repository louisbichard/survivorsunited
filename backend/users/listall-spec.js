var result = require('../users/listall.js')();

describe("List all users", function(){
	it("Should not return null", function(){
		result.then(function(data){
			  expect(data).not.toBe(null);
		});
	});
})