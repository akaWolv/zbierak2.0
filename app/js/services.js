'use strict';

/* Services 


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  value('version', '0.1');
*/

zbierakApp.factory('ZbierakData', function($resource) {
    return $resource(
        '/zbierak_gate.php', 
        { json : 'true', actual_page : '@actual_page' }
    );
});