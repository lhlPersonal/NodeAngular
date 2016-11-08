/**
 * Created by weztt on 2016/10/31.
 */

var app = angular.module("myApp", []);
app.controller('myController', ['$scope', function ($scope) {
    $scope.msg = 'bulusli';
    $scope.msg1 = 'bulusli1';
}]).directive('msgDirective', function () {
    return {
        restrict: 'E',
        link: function ($scope, $element, $attrs, $controller, $transcludeFn) {
            $scope.$watch('msg', function (new_v) {
                $scope.msg1 = Date.now() + '';
            })
        }
    };
}).directive('msg1Directive', function () {
    return {
        restrict: 'E',
        link: function ($scope, $element, $attrs, $controller, $transcludeFn) {
            $scope.$watch('msg1', function (new_v) {
                $scope.msg = Date.now() + '';
            })
        }
    }
});