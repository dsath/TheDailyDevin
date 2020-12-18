var http = require("http");
var fs = require('fs');
var hbs = require('handlebars');
var exphbs=require('express-handlebars');
var express = require('express');
var mariadb = require('mariadb/callback');
var app = express();
var fileUpload = require('express-fileupload');
var showdown = require('showdown'), converter = new showdown.Converter();
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
var db = require('./database/db');


var con = db.create();

con.connect( (err) => {
  if(err) {
    console.log("Whoops, couldn't connect to the databse: " + err);
  } else {
    console.log("Database connected!");
  }
});

con.query('SELECT * FROM blog_posts', function(err, rows, fields) {
  if (err) throw err;
});

app.use(express.static('public'));
app.use('/bootstrap/css', express.static('node_modules/bootstrap/dist/css'));
app.use('/bootstrap/js', express.static('node_modules/bootstrap/dist/js'));
app.use(fileUpload());


app.get('/', (req, res) => {
  res.render('home');
});

app.get('/posts', (req, res) => {
  res.send(data);
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/blog', (req, res) => {
  con.query('SELECT * FROM blog_posts', function(err, rows, fields) {
    if (err) throw err;
    res.render('blog', rows);
  });
});

app.get('/posts/:id', (req, res) => {
  con.query('SELECT * FROM blog_posts WHERE id = ' + req.params.id, function(err, rows, fields) {
    if (err) throw err;
    res.render('content', rows[0]);
  });
});

app.get('/upload_page', (req, res) => {
  res.render('upload');
});

app.post('/upload', (req, res) => {
  var file = req.files.filename;
  var md = file.data.toString('ascii');
  var html = converter.makeHtml(md);
  var db_query = "INSERT INTO blog_posts (title, markdown, html)" +
  " VALUES ('test', '" + md + "', '" + html + "')";
  con.query(db_query, function(err, rows, fields) {
    if (err) throw err;
  });
});

app.listen('8080');

