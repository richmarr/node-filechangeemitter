/*!
 * FileChangeEmitter - Watches a filesystem and emits events when changes occur. Adapted from the Cluster restart module
 *
 * Copyright (c) 2011 Richard Marr <dev@learnboost.com>
 * Copyright (c) 2011 Learnboost <dev@learnboost.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var fs = require('fs'),	
	EventEmitter = require('events').EventEmitter,
	basename = require('path').basename,
	extname = require('path').extname;

/**
 *
 * Options:
 *
 *   - `interval` Watcher interval, defaulting to `100`
 *   - `extensions` File extensions to watch, defaults to ['.js']
 *
 * @param {String|Array} files
 * @param {Options} options
 * @return {Function}
 * @api public
 */

var FileChangeEmitter = exports.FileChangeEmitter = function(files, options){
	
	var self = this;
	EventEmitter.call(this);
	
	options = options || {};
	var interval = options.interval || 100,
		extensions = options.extensions || ['.js'],
		openStat = 0;
	
	self.files = 0;
		
	if (!files) files = process.execPath;
	if (!Array.isArray(files)) files = [files];
	//files.forEach(traverse);
	traverse( files, watch );
		
	// traverse file if it is a directory
	// otherwise setup the watcher
	function traverse( files, fileCallback, level ) {
		//file = master.resolve(file);
		if ( !level ) level = 0;
		for ( var i = 0; i < files.length; i++ ){
			var file = files[i];
			fs.stat( file, function( err, stat ){
				if ( !err ) {
					if ( stat.isDirectory() ) {
						fs.readdir( file, function( err, files ){
							traverse( files.map( function( f ){
								return file + '/' + f;
							}), fileCallback, level+1 );
						});
					} else {
						fileCallback( file );
					}
				}
			});
		}
	}

	// watch file for changes
	function watch(file) {
		self.files++;
		fs.watchFile( file, { interval:interval }, function( curr, prev ){
			if (curr.mtime > prev.mtime) {
				console.log('  \033[36mchanged\033[0m \033[90m- %s\033[0m', file);
				self.emit('change',file);
			}
		});
	}
	
	// remove listeners
	function unwatch(file) {
		self.files--;
		fs.unwatchFile( file );
	}
	
	self.close = function(){
		traverse( files, unwatch );
	};
};

FileChangeEmitter.prototype = new EventEmitter();

