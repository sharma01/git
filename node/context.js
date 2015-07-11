/**
 * REST Service
 *
 * User: sumit
 *
 */


var parse = require('./parse_orion.js');
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
exports.intiailize = function(username, password)
{
    console.log('\ncontext::intiailize');
    parse.intializeToken(username , password );
};
/**
 * Get Query Intrument
 *
 * @param   req: the http server request object
 * @param   res: the http server response object
 */
exports.queryIntrument = function(req, res)
{
    console.log('\ncontext::queryIntrument');
    parse.query(mac_address,
        function(statusCode, result)
        {
            // The service will need the full objects for processing in the service
           // console.log(result);
            res.statusCode = statusCode;
            res.send(result);
        });
};

/**
 * addIntrument
 *
 * @param   req: the http server request object
 * @param   res: the http server response object
 */

exports.addIntrument = function(req, res)
{
    console.log('\ncontext::addIntrument');
    var item = {
              'attributes' : [
                {
                  'name' : 'printer_' + req.params.id,
                  'type' : 'printer',
                  'value' : mac_address
                },
                {
                  'name' : 'temperature_'  + req.params.id ,
                  'type' : 'float',
                  'value' : '0.0'
                }
              ]
    };
    console.log(mac_address);
    parse.create( mac_address , item, function(statusCode, result){       
                 
        // The service will need the full objects for processing in the service
        //console.log(result);
        res.statusCode = statusCode;
        res.send(result);
    });
    
};

exports.getIntrumentAtributeValue = function(req, res)
{
    console.log('\ncontext::getIntrumentAtributeValue');
    parse.retrieve(mac_address , req.params.attribute + '_' + req.params.id, function(statusCode, result){       
                 
        // The service will need the full objects for processing in the service
        //console.log(result);
        res.statusCode = statusCode;
        res.send(result);
    });
    
};

exports.updateIntrumentAtributeValue = function(req, res)
{
    console.log('\ncontext::updateIntrumentAtributeValue');

    var attribute = {
        
                  'name' : req.params.attribute + '_'  + req.params.id ,
                  'type' : 'float',
                  'update' : {'value' : req.query.value}
    };

    parse.update( mac_address , attribute, function(statusCode, result){       
                 
        // The service will need the full objects for processing in the service
        //console.log(result);
        res.statusCode = statusCode;
        res.send(result);
    });
    
};

exports.getIntrumentMacAddress = function(req, res)
{
    console.log('\ncontext::getIntrumentMacAddress');
    res.send(mac_address);

}
