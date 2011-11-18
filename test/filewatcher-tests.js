
var testCase = require('nodeunit').testCase,
	FileWatcher = require('../index').FileWatcher,
	fs = require('fs');

// This is run by nodeunit
module.exports = testCase({
	
	// Make sure we're traversing the DOM as expected
	testModify : function(test){
	
		var fw = new FileWatcher(['./test/data']);
		fw.on('change',function(file){
			test.ok();
			test.done();
		});
		fs.write('./data/test-data.txt', new Buffer("test data"), 0, 9, 0, function(){
			console.log(arguments)
		});
	
	},
	
});
