/**
 * Created by bulusli on 2015/2/16.
 */

var app = angular.module("awsModule", ["ngRoute"]).config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
<<<<<<< HEAD:angular_web/test/AWS/main/config.js
    $routeProvider
        .when("/userInfo", {templateUrl: "/test/AWS/userInfo.html"})
        .otherwise({redirectTo: "/test/AWS/main/main.html"});
    $locationProvider.html5Mode(true);
=======
//    $routeProvider
//        .when("/userInfo", {templateUrl: "/views/test/AWS/userInfo.html"})
//        .otherwise({redirectTo: "/views/test/AWS/main.html"});
//    $locationProvider.html5Mode(true);
>>>>>>> add userinfo.html.:angular_web/test/AWS/config.js
}])