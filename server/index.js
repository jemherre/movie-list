var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('../db/index').db;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname+'/../public/dist'));
var port = 3000;

app.get('/movie_list', function(req, res){
	if(req.query.type === 'main') {
		db.query('SELECT title,status FROM Movies ORDER BY title', function (error, results, fields) {
			if (error) throw error;
			res.send(results);
		});
	} else {
		db.query(`SELECT title,status FROM Movies Where status = '${req.query.type}' ORDER BY title`, function (error, results, fields) {
			if (error) throw error;
			res.send(results);
		});
	}
});

app.post('/movie_add',function(req,res){
		var q = `INSERT INTO Movies (title, status) VALUES('${req.body.title}', 'watch')`;
		db.query(q, function (error, results, fields) {
			if (error) throw error;
			db.query(`SELECT title,status FROM Movies Where status = 'watch' ORDER BY id DESC`, function (error, results, fields) {
				if (error) throw error;
				res.send(results);
			});
		});
});

app.get('/movie_watched',function(req, res){
		db.query(`UPDATE Movies SET status = 'watched' WHERE title = '${req.query.title}'`, function (error, results, fields) {
			if (error) throw error;
			db.query(`SELECT title,status FROM Movies Where status = 'watch' ORDER BY title`, function (error, results, fields) {
				if (error) throw error;
				res.send(results);
			});
		});
});

app.get('/movie_search',function(req, res){
		db.query(`SELECT title,status FROM Movies Where title = '${req.query.title}'`, function (error, results, fields) {
			if (error) throw error;
			res.send(results);
		});
});

app.listen(port, ()=>{
    console.log("Listening on Port:",port);
})

