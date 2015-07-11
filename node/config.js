var orion_auth = {

    port : 443,
    host :  'orion.lab.fiware.org',
    path : '/token'
};

var orion = {

    port : 1026,
    host :  'orion.lab.fi-ware.org',
    path : '/ngsi10/contextEntities'
}

var app = {

    port : 8081,
    username : '',
    password : ''
}


var objectStorage = {

    port : 4730,
    host :  'cloud.lab.fiware.org',
    token_path : '/v2.0/tokens',
    tenant_path : '/v2.0/tenants',
    object_path : '/cdmi_capabilities',
    region : 'Spain2',
    container : 'sumit_container_test'
}

exports.orion =  orion;
exports.orion_auth =  orion_auth;
exports.app = app;
exports.objectStorage = objectStorage;