/**
 * Created by bulusli on 2014/10/15.
 */
'use strict';
var app = angular.module('invlist_module', ['ngRoute', 'ngGrid', 'ngResource', 'ngMessages','restangular']);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/add', {templateUrl: '/views/template/invlist/add.html'})
        .when('/ilist/detail/:id', {templateUrl: '/views/template/invlist/devList.html'})
        .otherwise({redirectTo: '/views/inventory.html'});

    $locationProvider.html5Mode(true);
}])
;