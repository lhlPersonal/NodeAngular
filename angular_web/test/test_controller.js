/**
 * Created by bulusli on 2014/10/24.
 */
'use strict';
var app = angular.module('test_module', ['ngMessages']);

app.controller('TestCtrl', ['$scope', function ($scope) {
    $scope.b = [1, 2, 3];

    $scope.show = function (v) {
        console.log(v);
    }

    $scope.color_click = function () {
        $scope.color = 'green';
    }

    $scope.a = 1;

    $scope.title = "this is a title";
    $scope.text = "this is a text";

    $scope.para = "init para";

    $scope.jqueryPara = "jquery init para";

    $scope.to = 'ari@fullstack.io';
    $scope.emailBody = 'Hello {{ to }},\n\nMy name is Ari too!';

    $scope.signup = {
        name: ""
    };

    $scope.submitted = false;

    $scope.signupForm = function () {
        if ($scope.signup_form.$valid) {
            // 正常提交
        } else {
            $scope.signup_form.submitted = true;
        }
    }
    $scope.name1 = 'Tobias';
    $scope.hideDialog = function () {
        $scope.dialogIsHidden = true;
        setTimeout(function () {
            $scope.$apply(function () {
                $scope.dialogIsHidden = false;
            })
        }, 2000);
    };

// 反模式，裸值
    $scope.someBareValue = 'hello computer';
// 设置 $scope 本身的操作，这样没问题
    $scope.someAction = function () {
// 在SomeController和ChildController中设置{{ someBareValue }}
        $scope.someBareValue = 'hello human, from parent';
    };


}]).controller('ChildController', function ($scope) {
    $scope.childAction = function () {
// 在ChildController中设置{{ someBareValue }}
        $scope.someBareValue = 'hello human, from child';
    }
});