var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('../db/index').db;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname+'/../public/dist'));
var port = 3000;

// console.log('db',db);

app.get('/movie_list', function(req, res){
	console.log('req: ',req.query);

	if(req.query.type === 'main') {
		//select all movies in db
		console.log('m');
		db.query('SELECT * FROM Movies', function (error, results, fields) {
			if (error) throw error;
			console.log('results: ', results, fields);
		});
	} else {
			//we would want to query db for specified movie status - watch/watched
	}
	res.send([{title: 'init test', status:'watch'}]);
});

app.post('/movie_add',function(req,res){
    console.log('req', req.body);
		//add movie to db
    res.send([{title: req.body.title, status:req.body.status}]);
});

app.get('/movie_watched',function(req, res){
    console.log('req: ',req.query);
    //we want to change current video status to watch and then
    //and then return array of new watched list
    res.send([{title: 'watched test', status:'watch'}]);
});

app.get('/movie_search',function(req, res){
    console.log('req: ',req.query);
    //we want to get movie with title in db
    res.send([{title: 'search test', status:'watch'}]);
});

app.listen(port, ()=>{
    console.log("Listening on Port:",port);
})

