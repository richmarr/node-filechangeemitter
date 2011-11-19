
Simple module that watches a given set of file system locations and emits events when files are changed.

Install
-------

	npm install filechangeemitter
	
Usage
-----

	var fsEmitter = new FileChangeEmitter([
		'./first/location',
		'./another/location'
	]);
		
	fsEmitter.on('change',function(fileName){
		// your code
	});

And to detach the watchers from the filesystem:

	fsEmitter.close();

Tests
-----

	npm test
