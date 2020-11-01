var http = require("http");
var fs = require('fs');
var hbs = require('handlebars');
var exphbs=require('express-handlebars');
var express = require('express');
var app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars')

var raw_data = fs.readFileSync('public/posts/posts.json');
var data = JSON.parse(raw_data);

app.use((req, res, next) => {
    console.log("RECIEVED A REQUEST");
    next();
});

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('home', data);
});

app.get('/posts', (req, res) => {
    res.send(data);
});

app.get('/posts/:id', (req, res) => {
    var requested_post;
    for( var i = 0; i < data.posts.length; i++) {
        if ( data.posts[i].id == req.params.id) {
            requested_post = data.posts[i];
            break;
        }
    }
    res.render(requested_post.url, requested_post);
});


app.listen('8080');

