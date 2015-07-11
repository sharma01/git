/**
 * Parse Object Storage Service
 *
 * User: sumit
 *
 */


var parse = require('./parse_object_storage.js');
var config = require('./config').objectStorage;
var multiparty = require('multiparty');
//var util = require('util');
// Fetch the computer's mac address 
var getmac = require('getmac');
 
// Validate that an address is a mac address 
var mac_address;
getmac.getMac(function(err,macAddress){
    if (err)  throw err
   // console.log(macAddress)
    mac_address = macAddress;
})


/**
 * Get Query Intrument
 *
 * @param   req: the http server request object
 * @param   res: the http server response object
 */
var intiailize = function(username, password)
{
    console.log('\parse_object_storage::intiailize');
    parse.intializeToken(username , password );
};


/**
 * Get Query Intrument
 *
 * @param   req: the http server request object
 * @param   res: the http server response object
 */
var uploadFilesToStore = function(req, res)
{
    console.log('\parse_object_storage::uploadFilesToStore');
    var form = new multiparty.Form();
    
    form.parse(req, function(err, fields, files) {     
        try {
            console.log('num files ' + files.upload_to_object_store.length );
            if(files) 
            {    
                files.upload_to_object_store.forEach(function(key,value){
                    console.log(key.path);
                    var local_path = key.path;
                    var remote_container = config.container;
                    var remote_filename = key.originalFilename;
                    parse.uploadObjectToContainer(local_path, remote_container ,remote_filename,function(err ,data){
                        console.log(data);

                });
                //res.write(key.path);


                });    

                 res.send('received upload:\n\n');
            } 
            else {

                res.send('no files to upload\n\n');
             }

        } catch (ex) {
            res.send('Unkown Error occured while reading\n\n');
        }
        //res.end(util.inspect({fields: fields, files: files}));
    });
    
   // res.writeHead(200, {'content-type': 'text/plain'});        
   // res.write('received upload:\n\n');

   

};

var getFileList = function(req, res)
{
    console.log('\parse_object_storage::getFileList');
    parse.getFilesInContainer(req.params.container, function(err,data){
        if(!err){
        
            res.send(data);
        } else 
        {
             res.send(err);
        }
    });        
   // res.writeHead(200, {'content-type': 'text/plain'});        
   // res.write('received upload:\n\n');

    //res.send('received upload:\n\n');

};

var downloadFile = function(req, res)
{
    console.log('\parse_object_storage::downloadFile');
    res.set('Content-Type', 'application/octet-stream');
    parse.downloadFileFromContainer(req.params.container, req.params.file, function(err,data){
        if(!err){
            res.send(data);
        } else 
        {
             res.send(err);
        }
    });        
   // res.writeHead(200, {'content-type': 'text/plain'});        
   // res.write('received upload:\n\n');

    //res.send('received upload:\n\n');

};

var deleteFile = function(req, res)
{
    console.log('\parse_object_storage::deleteFile');
    parse.deleteFileFromContainer(req.params.container, req.params.file, function(err,data){
        if(!err){
            
            res.send(data);
        } else 
        {
             res.send(err);
        }
    });        
   // res.writeHead(200, {'content-type': 'text/plain'});        
   // res.write('received upload:\n\n');

    //res.send('received upload:\n\n');

};

exports.deleteFile = deleteFile;
exports.downloadFile = downloadFile;
exports.getFileList = getFileList;
exports.uploadFilesToStore = uploadFilesToStore;
exports.intiailize = intiailize;