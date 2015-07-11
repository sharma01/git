/**
 * Parse module
 *
 * User: sumit
 * Date: 2/9/12
 */
var config = require('./config').objectStorage;
var rest = require("./rest");
var secret = require("./secret");
var url = require('url');
var fs = require('fs');


var tenantId = '';
var token1 =  '';
var  token2 =  '';
var publicURL = '';
var region = '';
var objectStoreHost = '';
var objectStorePort = '';
var endpoint = {};

var getTokenOptions = function()
{
    var options = {
        host: config.host || 'cloud.lab.fiware.org',
        port: config.port || 4730,
        path: config.token_path || '/v2.0/tokens',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    return options;
}

exports.token1 = "";
exports.intializeToken = function(username , password)
{
    var options = getTokenOptions();
    var credentianls = { 
        'auth' : { 
            'passwordCredentials' : {
                'username' : username,
                'password' : password
            }
        }

    
    };
    secret.getAuthToken(options, credentianls ,function(err, data){
        //console.log(JSON.parse(data));
        
        if(!err){
            //console.log(data);
            result = JSON.parse(data);
            
            exports.token1 = result.access.token.id;
            //console.log("token1 : " + exports.token1);
            getFirstTenant(exports.token1, function(err, tenantId){
                if(tenantId)
                {
                    exports.tenantId = tenantId;
                    //console.log("tenant_id : " + exports.tenant_id);
                    authenticateTenant(credentianls,tenantId , function(err,token, endpoints){
                        //console.log("endpoint: " + JSON.stringify(endpoint));
                        exports.token2 = token;

                        findStoreByRegion(config.region, endpoints);
                        var endpoint = exports.endpoint;
                        console.log(exports.endpoint);
                        if(endpoint){                       
                            exports.publicURL = endpoint.publicURL;
                            exports.objectStoreHost = url.parse(endpoint.publicURL).hostname;
                            exports.objectStorePort = url.parse(endpoint.publicURL).port;
                            exports.region = endpoint.region;
                        }
                         getContainers(function(err,result){
                            if(result)
                            {
                                console.log(result);
                            }
                            else
                            {
                                console.log("err :" + err);
                            }

                        });
                        
                        getFilesInContainer(config.container,function(err,result){
                            if(result)
                            {
                                console.log(result);
                            }
                            else
                            {
                                console.log("err :" + err);
                            }

                        } );

                    });
                }

            });
                
                
           // console.log("tenant_id : " + tenant_id);
        }
    })
};

var findStoreByRegion =function(region,endpoints){
    
    exports.endpoint = {};
    endpoints.some(function(key,value){
        
        
        if(key.region.indexOf(region) !== -1 )
        {
            exports.endpoint = key;
        }

    });
};

var getFirstTenant =  function(token, callback){
    
    var options = getTokenOptions();
    options.path = config.tenant_path;
    options.headers = {};
    options.headers["x-auth-token"] = token;
    options.method = 'GET';
    
    rest.getJSON(options, function(err, data){
        //console.log(JSON.parse(err));
        if(!err.message){
            //console.log(data);
            result = JSON.parse(data);
            //console.log(JSON.parse(result.tenants[0].id));
            callback(null, result.tenants[0].id);
        }
        else 
        {
            callback(err, null);
        }
    });
   

};

var authenticateTenant =  function(credentianls, tenantId, callback){
    
    var options = getTokenOptions();
    options.path = config.token_path;

    
    options.method = 'POST';
    
    credentianls.auth["tenantId"] = tenantId;
    //console.log(credentianls);
    
        rest.postJSON(options,credentianls, function(err, data){
        //console.log(JSON.parse(err));
        if(!err.message){
            //console.log(data);
            result = JSON.parse(data);
            result.access.serviceCatalog.forEach(
                function(key)
                { 
                    if(key.name === "swift"){                    
                       // exports.pubURL = key.endpoints[0].publicURL;
                        callback(null, result.access.token.id, key.endpoints);
                        return;
                    
                    }                
                
                });
            //console.log(JSON.parse(result.tenants[0].id));
            
        }
        else 
        {
            callback(err, null);
        }
    });

    
};

var createContainer = function(name, callback){
    /*
    console.log("token2 : " + exports.token2);
    console.log("publicURL : " + exports.publicURL);
    console.log("Region : " + exports.region);
    console.log("Host : " + exports.objectStoreHost);
    console.log("Port : " + exports.objectStorePort);
    console.log("TenantID : " + exports.tenantId);
    */
    var options = getTokenOptions();
    
    options.path = '/cdmi_capabilities' + '/AUTH_' + exports.tenantId + '/' + name;
    options.port = exports.objectStorePort;
    options.host = exports.objectStoreHost;
    options.method = 'PUT';
    options.headers = {};
    options.headers["X-Auth-Token"] = exports.token2;
    options.headers["Accept"] = 'application/cdmi-container';
    options.headers["X-CDMI-Specification-Version"] = '1.0.1';
    options.headers["Content-type"] = 'application/cdmi-container';
            //console.log(options);
    rest.getJSON(options, function(err, data){
        //console.log(JSON.parse(err));

        //console.log(data);
        //console.log(err);
        if(!err.message){
            //console.log(data);
            //result = JSON.parse(data);
            //console.log(JSON.parse(result.tenants[0].id));
            callback(null, data);
        }
        else 
        {
            callback(err, null);
        }
    });
    
    //console.log(options);

};

var uploadObjectToContainer = function(local_path, remote_container ,remote_filename, callback){
    var options = getTokenOptions();
    options.path = '/cdmi_capabilities' + '/AUTH_' + exports.tenantId + '/' + remote_container + '/' + remote_filename;
    options.port = exports.objectStorePort;
    options.host = exports.objectStoreHost;
    options.method = 'PUT';
    options.headers = {};
    options.headers["X-Auth-Token"] = exports.token2;
    options.headers["Accept"] = '*/*';
    options.headers["X-CDMI-Specification-Version"] = '1.0.1';
    options.headers["Content-type"] = 'application/stream-octet';
    
    var file_data = fs.readFileSync(local_path);
    //console.log(binary_data);
    var base64Data = file_data.toString('base64');
   rest.putBinary(options, base64Data , function(err, data){
        //console.log(JSON.parse(err));

        console.log(data);
        console.log(err);
        if(!err.message){
            //console.log(data);
            //result = JSON.parse(data);
            //console.log(JSON.parse(result.tenants[0].id));
            callback(null,data);
        }
        else 
        {
            callback(err, null);
        }
    });




};

var getContainers = function(callback){
    var options = getTokenOptions();
    options.path = '/cdmi_capabilities' + '/AUTH_' + exports.tenantId;
    options.port = exports.objectStorePort;
    options.host = exports.objectStoreHost;
    options.method = 'GET';
    options.headers = {};
    options.headers["X-Auth-Token"] = exports.token2;
    options.headers["Accept"] = '*/*';
    options.headers["X-CDMI-Specification-Version"] = '1.0.1';
    options.headers["Content-type"] = 'application/cdmi';
    
   rest.getJSON(options, function(err, data){
        if(!err.message)
        {
            callback(null, data.trim().split("\n"));        }
        else 
        {
            callback(err, null);
        }
    });



};

var getFilesInContainer = function(container, callback){
    var options = getTokenOptions();
    options.path = '/cdmi_capabilities' + '/AUTH_' + exports.tenantId +  '/' + container ;
    options.port = exports.objectStorePort;
    options.host = exports.objectStoreHost;
    options.method = 'GET';
    options.headers = {};
    options.headers["X-Auth-Token"] = exports.token2;
    options.headers["Accept"] = '*/*';
    options.headers["X-CDMI-Specification-Version"] = '1.0.1';
    options.headers["Content-type"] = 'application/cdmi';
    
   rest.getJSON(options, function(err, data){
        if(!err.message)
        {
            callback(null, data.trim().split("\n"));        }
        else 
        {
            callback(err, null);
        }
    });



};

var downloadFileFromContainer = function(container, file, callback){
    var options = getTokenOptions();
    options.path = '/cdmi_capabilities' + '/AUTH_' + exports.tenantId +  '/' + container + '/' + file ;
    options.port = exports.objectStorePort;
    options.host = exports.objectStoreHost;
    options.method = 'GET';
    options.headers = {};
    options.headers["X-Auth-Token"] = exports.token2;
    
   rest.getBinary(options, function(err, data){
        if(!err.message)
        {
            decodedData = new Buffer(data, 'base64');
            callback(null, decodedData);        
        }
        else 
        {
            callback(err, null);
        }
    });
}

var deleteFileFromContainer = function(container, file, callback){
    var options = getTokenOptions();
    options.path = '/cdmi_capabilities' + '/AUTH_' + exports.tenantId +  '/' + container + '/' + file ;
    options.port = exports.objectStorePort;
    options.host = exports.objectStoreHost;
    options.method = 'DELETE';
    options.headers = {};
    options.headers["X-Auth-Token"] = exports.token2;
    
   rest.getJSON(options, function(err, data){
        if(!err.message)
        {
            callback(null, data.trim().split("\n"));        }
        else 
        {
            callback(err, null);
        }
    });


};

exports.tenantId = tenantId;
exports.token1 =  token1;
exports.token2 =  token2;
exports.publicURL = publicURL;
exports.region = region;
exports.objectStoreHost = objectStoreHost;
exports.objectStorePort = objectStorePort;
exports.endpoint = endpoint;
exports.uploadObjectToContainer = uploadObjectToContainer;
exports.downloadFileFromContainer = downloadFileFromContainer;
exports.getFilesInContainer = getFilesInContainer;
exports.getContainers = getContainers;
exports.createContainer = createContainer;
exports.deleteFileFromContainer = deleteFileFromContainer;




