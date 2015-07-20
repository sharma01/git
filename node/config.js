var orion_auth = {

    port : 443,
    host :  'orion.lab.fiware.org',
    path : '/token'
};

var orion = {

    port : 1026,
    //host :  'orion.lab.fi-ware.org',
    host :  '192.168.2.137',
    //path : '/ngsi10/contextEntities',
    path : '/v1/contextEntities',
    enabled : true
}

var app = {

    port : 1028,
    username : '',
    password : '',
    validation : false
}


var objectStorage = {

    port : 4730,
    host :  'cloud.lab.fiware.org',
    token_path : '/v2.0/tokens',
    tenant_path : '/v2.0/tenants',
    object_path : '/cdmi_capabilities',
    region : 'Spain2',
    container : 'sumit_container_test',
    enabled : false
}

exports.orion =  orion;
exports.orion_auth =  orion_auth;
exports.app = app;
exports.objectStorage = objectStorage;