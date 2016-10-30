/**
 * Created by bulusli on 2014/10/15.
 */
'use strict';

angular.module('app', ['ngRoute']).config(['$provide', '$controllerProvider', '$routeProvider', '$locationProvider', function ($provide, $controllerProvider, $routeProvider, $locationProvider) {
    $provide.factory('notify', ['$window', function (win) {
        var msgs = [];
        return function (msg) {
            msgs.push(msg);
            if (msg.length == 3) {
                win.alert(msg.join("\n"));
                msgs = [];
            }
        };
    }]);

    $controllerProvider.register(
        {'WelcomeCtrl': ['$scope', 'notify', function ($scope, notifySvce) {
            $scope.username = 'Conan_Z';
            $scope.callNotify = function (msg) {
                notifySvce(msg);
            }
        }],
            'DetailCtrl': ['$scope', function ($scope) {
                $scope.detail = 'this is detail content';
            }]
        });

    $routeProvider
        .when('/', {templateUrl: '/views/template/welcome.html', controller: 'WelcomeCtrl'})
        .when("/detail", {templateUrl: '/views/template/detail.html', controller: 'DetailCtrl'})
        .otherwise({redirectTo: '/'});

    $locationProvider.html5Mode(true);
}]);