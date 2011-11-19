
var testCase = require('nodeunit').testCase,
	FileWatcher = require('../index').FileWatcher,
	fs = require('fs');

// This is run by nodeunit
module.exports = testCase({
	
	// Make sure we're traversing the DOM as expected
	testModify : function(test){
	
		var fw = new FileWatcher(['./test/data']);
		
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
