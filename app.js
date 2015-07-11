/**
 * Context Web Application
 *
 * User: Sumit
 * Date: 2/9/12
 */

/**
 * Create express server
 */


var dir = './node';
var config = require(dir + '/config').app;


var context = require(dir + '/context');
var objectStorage = require(dir + '/object_storage');
var express = require('express');
var app = express();
app.set('view engine', 'ejs'); 

var prompt = require('prompt');
var properties = [
{
  name: 'username', 
  //validator: /^[a-zA-Z\s\-]+$/,
  //warning: 'Username must be only letters, spaces, or dashes'
},
{
  name: 'password',
  hidden: true
}
];

prompt.start();

prompt.get(properties, function (err, result) {
    if (err) { 
        console.log(err);
        return 1; 
    }
    console.log('Command-line input received: \n');
     context.intiailize( 'sumitjha295@gmail.com',  'sumitjha295');
    objectStorage.intiailize('thareja.dixit@gmail.com',  'gaurav90POLO');
   // context.intiailize(result.username,  result.password);
   // objectStorage.intiailize(result.username,  result.password);
});
app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    next();
});
// set the view engine to ejs
app.set('view engine', 'ejs');

var bodyParser = require('body-parser');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 


/**
 * Configure
 * $ NODE_ENV=production node helloconfig.js
 */
/*
app.configure(function()
{
    app.use(express.methodOverride());
    app.use(express.bodyParser());
    app.use(app.router);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
});

app.configure('development', function()
{
    app.use(express.static(__dirname + '/public'));
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function()
{
    var oneYear = 31557600000;
    app.use(express.static(__dirname + '/public', { maxAge: oneYear }));
    app.use(express.errorHandler());
});
*/
/**
 * REST URL Mappings
 */
/*

// map other requests to an html page by that name
// hide implementation/technology specific details in the url request.
// http://server/students --> /public/students.html
app.get('/:pagename', function(req,res) {
   res.sendfile('public/' + req.params.pagename + '.html');
});
*/
/**
 * Start the application server
 */
/***********************************************************/

app.get('/fiware/xml3d', function(req,res){
    
     res.render('forms/xml3d',
            {xml3d :{
                url: 'http://xml3d.org/xml3d/tutorial/files/teapot.json',
            }
            });


});

/***********************************************************/
app.get('/forms/upload', function(req,res){    
     res.render('forms/upload');


});

app.get('/forms/filelist/:container', function(req,res){    
     res.render('forms/filelist',
                {list :{
                    url: '/fiware/store/' + req.params.container,
                    id : req.params.container ,
                    deleteUrl : '/fiware/delete/' + req.params.container,
                    downloadUrl : '/fiware/download/' + req.params.container,
                }
                });


});

app.post('/fiware/upload', objectStorage.uploadFilesToStore);
app.get('/fiware/store/:container', objectStorage.getFileList);
app.get('/fiware/download/:container/:file', objectStorage.downloadFile);
app.get('/fiware/delete/:container/:file', objectStorage.deleteFile);


/***********************************************************/
app.get('/instrument/mac_address', context.getIntrumentMacAddress);
app.get('/instrument/query', context.queryIntrument);
app.get('/instrument/:id/add', context.addIntrument);
app.get('/instrument/:id/get/:attribute', context.getIntrumentAtributeValue);
app.get('/instrument/:id/update/:attribute', context.updateIntrumentAtributeValue);


app.get('/', function (req, res) {
  res.send('App is running! \n');
});

var server = app.listen( config.port || 8080, function () {

  var host = server.address().address;
  var port = server.address().port;

  //console.log('\nApp is running at port %s', port);

});
