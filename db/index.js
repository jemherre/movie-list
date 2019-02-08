var mysql = require('mysql');
var db_info = require('../config');
// var schema = require('../db/schema.sql');
//import schema

var connection = mysql.createConnection(db_info);

connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    console.log('connection established');
  });

  // run/query schema to initialize db

  module.exports = {db: connection};