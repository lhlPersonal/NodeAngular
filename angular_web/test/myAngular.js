/**
 * Created by weztt on 2016/10/31.
 */

var app = angular.module("myApp", []);
app.controller('myController', ['$scope', function ($scope) {
    $scope.msg = 'bulusli';
    // $scope.msg1 = 'bulusli1';
}]).directive('msgDirective', function () {
    return {
        restrict: 'E',
        scope: true,
        link: function ($scope, $element, $attrs, $controller, $transcludeFn) {
            $scope.$watch('msg', function (new_v) {
                setTimeout(()=> {
                    //    $scope.$apply(function () {
                    $scope.msg = 'zzzzzz'; //$scope继承的属性值
                    $scope.$digest();  //此时调用$scope.$digest方法不会触发父scope的msg的watch方法，因此不能更改父节点的值。
                    //    })
                }, 3000);

                //  $scope.$parent.msg = 'new value';
                //    $scope.$digest();
                //  alert(new_v);
                // $scope.msg1 = Date.now() + '';
            })
        }
    }
}).directive('msg1Directive', function () {
    return {
        restrict: 'E',
        scope: true,
        link: function ($scope, $element, $attrs, $controller, $transcludeFn) {
            $scope.$watch('msg1', function (new_v) {
                alert('msg triggered');
            })
        }
    }
});