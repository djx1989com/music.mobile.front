/**
 * Created by mizi on 2014/11/11.
 */
(function(window, angular, undefined){
'use strict';

angular.module('hrApp.resources', [
    'hrApp.resources.other'
]);

angular.module('hrApp.services', [
    'hrApp.services.other'
]);

angular.module('hrApp.controllers', [
    'hrApp.controllers.backend.other'
]);

angular.module('hrApp.filters', [
    'hrApp.filters.base',
    'hrApp.filters.main'
]);

angular.module('hrApp.directives', [
    'hrApp.directives.hh'
]);

angular.module('hrApp.config', [
    'musicApp.config.routers'
]);

angular.module('hrApp', [
    'fdf',
    'cgBusy',
    'hrApp.config',
    'hrApp.resources',
    'hrApp.services',
    'hrApp.filters',
    'hrApp.directives',
    'hrApp.controllers'
])
.value('cgBusyDefaults',{
    message:'努力与服务器通信中……'
});

angular.element(document).ready(function() {
    angular.bootstrap(document, ['musicApp']);
});

})(window, angular);
