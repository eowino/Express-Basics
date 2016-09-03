'use strict';

var express = require('express'),
	  posts = require('./mock/posts.json');
//In express, the convention for creating a new app is to assign it to the variable "app"

var postList = Object.keys(posts).map(function(value){
	return posts[value];
});

var app = express();

//use method defines middleware for the app
/* 
	Middleware is the logic that tells express how to handle a request in between the time 
	the request is made by the client but before it arrives at a route.

	Can be used for authentication where certain users are only allowed to see certain files
	to serving static files.
*/
app.use('/static', express.static(__dirname + '/public'));

var port = 3000;

//set the view engine on the app
//the app.set defines various settings of the app
app.set('view engine', 'pug'); //tell express how to render templates/views
app.set('views', __dirname + '/views'); //telling express where to look for templates

//use the get method to create a route. Used to create a route for a client that makes a get request at a certain URL
//the 1st parameter is called the location parameter
app.get('/', function(req, res) {
	var path = req.path;
	//res.locals represents variables that will be available in the template
	res.locals.path = path; // same as res.render('index', path); below
	res.render('index');
});

app.get('/blog/:title?', function(req, res){
	var title = req.params.title;
	if ( title === undefined ){
		res.status(503);
		res.render('blog', {posts: postList});
	}else {
		var post = posts[title] || {};
		//can access the post variable by passing it a 2nd param in the res.render method
		res.render('post', {post: post});
	}
});

app.get('/posts', function(req, res){
	if (req.query.raw) {
		//res.json() same as res.send() but can coerce nulls and undefined values into valid json
		res.json(posts); 
	}else {
		res.json(postList);
	}
});

//set up dev server using listen method
app.listen(port, function() {
	console.log("The frontend server is listening on port " + port);
	// console.log("Dir: " + __dirname);
});
