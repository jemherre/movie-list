var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname+'/../public/dist'));
var port = 3000;

app.get('movie',function(req,res){
    res.send('success');
});

app.listen(port, ()=>{
    console.log("Listening on Port:",port);
})

