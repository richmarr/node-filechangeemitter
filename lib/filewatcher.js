/*!
 * FileWatcher - Watches a filesystem and emits events when changes occur. Adapted from the Cluster restart module
 *
 * Copyright (c) 2011 Richard Marr <dev@learnboost.com>
 * Copyright (c) 2011 Learnboost <dev@learnboost.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var fs = require('fs'),	
	EventEmitter = require('event').EventEmitter,
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

var FileWatcher = exports.FileWatcher = function(files, options){
	
	var self = this;
	EventEmitter.call(this);
	
	options = options || {};
	var interval = options.interval || 100,
		extensions = options.extensions || ['.js'];
		
	if (!files) files = process.execPath;
	if (!Array.isArray(files)) files = [files];
	files.forEach(traverse);
	
	// traverse file if it is a directory
	// otherwise setup the watcher
	function traverse( file ) {
		//file = master.resolve(file);
		fs.stat( file, function( err, stat ){
			if ( !err ) {
				if ( stat.isDirectory() ) {
					fs.readdir( file, function( err, files ){
						files.map( function( f ){
							return file + '/' + f;
						}).forEach(traverse);
					});
				} else {
					watch( file );
				}
			}
		});
	}

	// watch file for changes
	function watch(file) {
		if ( !~extensions.indexOf(extname(file)) ) return;
		fs.watchFile( file, { interval:interval }, function( curr, prev ){
			if (curr.mtime > prev.mtime) {
				console.log('  \033[36mchanged\033[0m \033[90m- %s\033[0m', file);
				self.emit('change',file);
			}
		});
	}
	
	
	
};

FileWatcher.prototype = new EventEmitter();

