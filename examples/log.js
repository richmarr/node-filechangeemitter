
var FileChangeEmitter = require('../index').FileChangeEmitter,
  fs = require('fs');

// This is run by nodeunit
var fw = new FileChangeEmitter(['./log-test-file.txt']);

fw.on('change',function(file){
  console.log('  \033[36mchanged\033[0m \033[90m- %s\033[0m', file);
  fw.close();
});

setTimeout(function(){
  fs.writeFile('./log-test-file.txt', "test data");
},500);
