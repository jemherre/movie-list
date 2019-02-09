var mysql = require('mysql');
var db_info = require('../config');

var db = mysql.createConnection(db_info);

//before connecting run schema in mysql shell

db.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connection established on port:',db_info.port);
});

  module.exports = {db};