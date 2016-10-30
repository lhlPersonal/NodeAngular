/**
 * Created by bulusli on 2015/2/27.
 *
 * 登录框验证规则：先验证基本格式，再验证服务端是否存在（此处为缓存中）。
 * 验证形式都为blur验证和点击login按钮验证。
 *
 * 1.格式验证：单个输入框blur时如果有错误，则只提示单个，如果直接点击登录按钮则两个都验证。
 * 2.服务端验证：，格式验证通过后，不论哪个输入框blur或者直接点击login按钮都会对两个框进行验证。
 */
app.controller("dvLoginController", ["$scope", "dvLoginService", "svProv", "s11", function ($scope, dvLoginService, svProv, s11) {
    console.log("controller start");
    //  alert(svProv.getUrl());
    // s11.showAlert();
    $scope.nameBlurError = false;//name框blur时是否显示错误
    $scope.pwdBlurError = false;//密码框blur时是否显示错误
    $scope.blurMark = false;//blur标记
    $scope.startWatch = false;//开始监测标记

    $scope.userInfo = {
        name: "",
        pwd: ""
    }

    $scope.login = function () {
        $scope.blurMark = true;

        if (!$scope.startWatch) {
            $scope.startWatch = true;
        }

        if ($scope.sign_form.$valid) {
            if (dvLoginService.checkUser($scope.userInfo)) {
                location.href = "/views/inventory.html";
            }
        } else {
            if (!$scope.userInfo.name) {
                $scope.nameBlurError = true;
            }
            if (!$scope.userInfo.pwd) {
                $scope.pwdBlurError = true;
            }
        }
    }

    $scope.nameFocus = function () {
        $scope.blurMark = false;
        $scope.nameBlurError = false;

        //服务端检查时两个都有红色边框，此时改掉name的内容，使其不通过格式验证，需要去掉密码框的红框。
        if ($scope.pwdBlurError && $scope.userInfo.pwd) {
            $scope.pwdBlurError = false;
        }
    }

    $scope.nameBlur = function () {
        $scope.blurMark = true;

        // $scope.userInfo.name="ZZZZZZZZZZZZ";
        if (!$scope.startWatch) {
            $scope.startWatch = true;
        }
        if ($scope.sign_form.$valid) {
            if (!dvLoginService.checkUser($scope.userInfo)) {

                $scope.nameBlurError = true;
                $scope.pwdBlurError = true;
            }
        } else {
            if (!$scope.userInfo.name) {
                $scope.nameBlurError = true;

//服务端检查时两个都有红色边框，此时改掉name的内容，使其不通过格式验证，需要去掉密码框的红框。
                if ($scope.pwdBlurError && $scope.userInfo.pwd) {
                    $scope.pwdBlurError = false;
                }
            }
        }
    }

    $scope.pwdFocus = function () {
        $scope.blurMark = false;
        $scope.pwdBlurError = false;

        if ($scope.nameBlurError && $scope.userInfo.name) {
            $scope.nameBlurError = false;
        }
    }

    $scope.pwdBlur = function () {
        $scope.blurMark = true;


        if (!$scope.startWatch) {
            $scope.startWatch = true;
        }
        if ($scope.sign_form.$valid) {
            if (!dvLoginService.checkUser($scope.userInfo)) {
                $scope.pwdBlurError = true;
                $scope.nameBlurError = true;
            }
        } else {
            if (!$scope.userInfo.pwd) {
                $scope.pwdBlurError = true;

                //服务端检查时两个都有红色边框，此时改掉pwd的内容，使其不通过格式验证，需要去掉name框的红框。
                if ($scope.nameBlurError && $scope.userInfo.name) {
                    $scope.nameBlurError = false;
                }
            }
        }
    }

    $scope.show = function () {
        return $scope.sign_form.$valid && $scope.blurMark && ($scope.nameBlurError || $scope.pwdBlurError);
    }

    //不变的函数和属性可以使用bo-*避免绑定watch。
    $scope.show1 = function () {
        return true;
    }

//    $scope.$evalAsync(function () {
//        $scope.userInfo.name = "eval async";
//    });
}]);


//var app = angular.module('myApp', []);
//app.controller('watchController', function ($scope) {
//    $scope.prop_1 = {
//        'msg': 'hello'
//    };
//    $scope.prop_2 = [1, 2, 3];
//    $scope.collection = {};
//    $scope.collection.p1 = $scope.prop_1;
//    $scope.collection.p2 = $scope.prop_2;
//    console.log($scope.collection);
//    $scope.$watch('collection', function () {
//        alert("changed!");
//    }, true);
//
//
//    $scope.changeDeep = function () {
//        $scope.collection.p2[0] = 0;
//    }
//
//})