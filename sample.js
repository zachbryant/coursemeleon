var http = require('http');
var fs = require('fs');
  fs.readFile('lauren.txt', function(err, data) {
	  console.log(data);
  });
