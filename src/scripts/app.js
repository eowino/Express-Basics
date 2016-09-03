'use strict';

var express = require('express'),
	  posts = require('./mock/posts.json');
//In express, the convention for creating a new app is to assign it to the variable "app"
var app = express();
var port = 3000;

//set the view engine on the app
//the app.set defines various settings of the app
app.set('view engine', 'pug'); //tell express how to render templates/views
app.set('views', __dirname + '/views'); //telling express where to look for templates

//use the get method to create a route. Used to create a route for a client that makes a get request at a certain URL
//the 1st parameter is called the location parameter
app.get('/', function(req, res) {
	res.render('index.pug');
});

app.get('/blog', function(req, res){
	res.send(posts);
});

//set up dev server using listen method
app.listen(port, function() {
	console.log("The frontend server is listening on port " + port);
	// console.log("Dir: " + __dirname);
});
