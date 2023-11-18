console.log("If module not found, install express globally `npm i express -g`!");
const port = process.env.PORT || 8080;
var express = require('express');
var Gun = require('gun');

var app    = express();
app.use(Gun.serve);
app.use(express.static(__dirname));

var server = app.listen(port);
var gun = Gun({	file: 'data', web: server });

global.Gun = Gun; /// make global to `node --inspect` - debug only
global.gun = gun; /// make global to `node --inspect` - debug only

console.log('Server started on port ' + port + ' with /gun');