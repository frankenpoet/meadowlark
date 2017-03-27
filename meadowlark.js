var express = require('express');
var app = express();
var fortune = require('./lib/fortune.js');
// set up handlebars view engine
var handlebars = require('express-handlebars').create({
    defaultLayout: 'main'
});
var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({ extended: false});

var date = new Date();

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.disable('x-powered-by');
app.set('port', process.env.NODE_PORT || 3000);
app.set('ip', process.env.NODE_IP || 'localhost');
app.use(express.static(__dirname + '/public'));
app.use(function (req, res, next) {
    res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
    next();
});
app.get('/', function (req, res) {
    res.render('home');
});
app.get('health', function (req, res) {
    res.status(200);
    res.render('health');
});
app.get('/headers', function (req, res) {
    res.set('Content-Type', 'text/plain');
    var s = '';
    for (var name in req.headers) {
        s += name + ': ' + req.headers[name] + '\n';
    };
    res.send(s);
});
app.get('/about', function (req, res) {
    res.render('about', {
        fortune: fortune.getFortune()
        , pageTestScript: '/qa/tests-about.js'
    });
});

app.get('/thank-you', function (req, res){
    res.render('thank-you');
});

app.get('/tours/hood-river', function (req, res) {
    res.render('tours/hood-river');
});
app.get('/tours/request-group-rate', function (req, res) {
    res.render('tours/request-group-rate');
});

app.post('/process-contact', urlEncodedParser, function(req, res){
    console.log('Received contact from ' + req.body.name +
               " <" + req.body.email + ' >');

    var conName = req.body.name;
    var curTime = date.toString();

    // save to database...
    //res.redirect(303, '/thank-you');
    res.status(303);
    res.render('thank-you', {
        timeStamp: curTime,
        contactName: conName
    });
});

// 404 catch-all handler (middleware)
app.use(function (req, res, next) {
    res.status(404);
    res.render('404');
});
// custom 500 page
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});
app.listen(app.get('port'), app.get('ip'), function () {
    console.log('Express started on http://localhost:' + app.get('ip') + ':' + app.get('port') + '; press Ctrl-C to terminate.');
});
