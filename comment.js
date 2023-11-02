// create a web server
// 1. create a server
// 2. register request event
// 3. bind port number, start server
// 4. send request, process response
var http = require('http');
var fs = require('fs');
var template = require('art-template');
var url = require('url');

// comments array
var comments = [
    {
        name: 'Jack',
        message: 'I am Jack',
        dateTime: '2019-12-12'
    },
    {
        name: 'Rose',
        message: 'I am Rose',
        dateTime: '2019-12-12'
    },
    {
        name: 'Lucy',
        message: 'I am Lucy',
        dateTime: '2019-12-12'
    },
    {
        name: 'Lily',
        message: 'I am Lily',
        dateTime: '2019-12-12'
    },
    {
        name: 'Tom',
        message: 'I am Tom',
        dateTime: '2019-12-12'
    }
]

http.createServer(function (req, res) {
    // use url.parse to parse url
    var parseObj = url.parse(req.url, true);
    // get path of url
    var pathname = parseObj.pathname;
    if (pathname === '/') {
        fs.readFile('./views/index.html', function (err, data) {
            if (err) {
                return res.end('404 Not Found');
            }
            // use template to render data
            var htmlStr = template.render(data.toString(), {
                comments: comments
            });
            res.end(htmlStr);
        });
    } else if (pathname === '/post') {
        fs.readFile('./views/post.html', function (err, data) {
            if (err) {
                return res.end('404 Not Found');
            }
            res.end(data);
        });
    } else if (pathname.indexOf('/public/') === 0) {
        // public resources
        // use url to get path of file
        // use fs.readFile to read file
        fs.readFile('.' + pathname, function (err, data) {
            if (err) {
                return res.end('404 Not Found');
            }
            res.end(data);
        });
    } else if (pathname === '/pinglun') {
        // get data of query string
        // use url.parse to parse query string
        // use query property of parseObj to get data of query string
        // add data of query string to comments array
        // redirect to homepage
        var comment = parseObj.query;
        comment.dateTime = '2019-12-12';
        comments.unshift(comment);
        // set status code 302 and location header to redirect
        res.statusCode = 302;
        res.setHeader('Location', '/');
        res.end();
    }


