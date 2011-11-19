
var testCase = require('nodeunit').testCase,
	FileChangeEmitter = require('../index').FileChangeEmitter,
	fs = require('fs');

// This is run by nodeunit
module.exports = testCase({
	
	// Make sure we're traversing the DOM as expected
	testModify : function(test){
	
		var fw = new FileChangeEmitter(['./test/data']);
		
		fw.on('change',function(file){
			test.ok(file);
			test.done();
			fw.close();
		});
		
		setTimeout(function(){
			fs.writeFile('./test/data/test-data.txt', "test data");
		},500);
	}
});
