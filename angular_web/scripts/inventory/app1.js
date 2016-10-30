/**
 * Created by bulusli on 2014/10/14.
 */
/**
 * Created by bulusli on 2014/10/15.
 */
'use strict';
var app=angular.module('invlist_module', ['ngRoute']);

app.config(['$provide', '$controllerProvider', '$routeProvider', '$locationProvider', function ($provide, $controllerProvider, $routeProvider, $locationProvider) {
    $provide.factory('invlistSvce', ['$scope', '$http', '$window', function ($scope, $http, $window) {
        return {
            save: function (data) {
                $http({
                    method: "post",
                    url: "/svr/addDev",
                    data: data
                }).success(function (data) {
                    {
                        if (data.error) {
                            $window.alert(data.error);
                        }
                    }
                })
            },
            del: function (id) {
                $http({
                    method: "delete",
                    url: "/svr/delDev",
                    data: {id: id}
                }).success(function (data) {
                    {
                        if (data.error) {
                            $window.alert(data.error);
                        }
                    }
                })
            },
            show: function () {
                $http({
                    method: "get",
                    url: "/svr/showDevs",
                    data: {}
                }).success(function (data) {
                    {
                        if (!data.error) {
                            $scope.devices = data;
                        } else {
                            $window.alert(data.error);
                        }
                    }
                })
            }
        }
    }
    ]);

    $controllerProvider.register({'InvlistCtrl': ['$scope','invlistSvce',function ($scope,invlistSvce) {
            $scope.device = {};
            $scope.save = function () {
                  invlistSvce.save($scope.device);
            }
            $scope.del = function (id) {
                 invlistSvce.del(id);
            }
            $scope.show = function () {
                  invlistSvce.show();
            }
        }]}
    );

    $routeProvider
        .when('/show', {templateUrl: '/views/template/invlist/show.html'})
        .when("/add", {templateUrl: '/views/template/invlist/add.html'})
        .when("/del", {templateUrl: '/views/template/invlist/del.html'})
        .otherwise({redirectTo: '/views/inventory.html'});

    $locationProvider.html5Mode(true);
}])
;