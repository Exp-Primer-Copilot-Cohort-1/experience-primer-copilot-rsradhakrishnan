// create a web server

// 1. load http module
var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');
var template = require('./lib/template.js');
var path = require('path');
var sanitizeHtml = require('sanitize-html');

// 2. create a web server object
