'use strict';

// Declare app level module which depends on filters, and services
var zbierakApp = angular.module('zbierak', ['ngRoute', 'ngResource', 'ngAnimate', 'ngCookies', 'ui.bootstrap', 'ui.slider', 'zbierak.directives']); 

zbierakApp.config( function($routeProvider) {
    $routeProvider.
        when('/', {templateUrl: 'partials/preview.html', controller: 'ZbierakPreviewCtrl'}).
        when('/home', {templateUrl: 'partials/preview.html', controller: 'ZbierakPreviewCtrl'}).
        when('/preview', {templateUrl: 'partials/preview.html', controller: 'ZbierakPreviewCtrl'}).
        when('/share/:imagesList', {templateUrl: 'partials/preview.html', controller: 'ZbierakPreviewCtrl'}).
        when('/preview/:slideImgUrl/:imagesList', {templateUrl: 'partials/preview.html', controller: 'ZbierakPreviewCtrl'}). // old links
        otherwise({redirectTo: '/home'});
});
