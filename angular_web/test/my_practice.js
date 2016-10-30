/**
 * Created by weztt on 2016/10/30.
 */

var myApp = angular.module('myApp', []).controller('myCtrl', function ($scope) {
        $scope.title = 'transclude title';
        $scope.attr = {readValue: 'read'};
        $scope.bidirectionalBindValue = 'bidirectionalBind';
        $scope.onewayBindValue = 'onewayBindValue';
    })
    ;
myApp.directive('transcludeDirec', function ($compile) {
    return {
        compile: function (tElement, tAttrs) {
            var next = tElement.next();
            return function ($scope, $element, $attrs, $controller, $transcludeFn) {
                var originEle = $transcludeFn(function (cloneEle, scope) {
                    var html = $compile(cloneEle.html())(scope);
                    next.append(html);
                    scope.r = "children value";
                    scope.bid = "children bidirectionalBind value";
                    scope.oneway = 'children onewayBindValue';
                });
            }
        },
        scope: {'r': '@ngBind', 'bid': '=', 'oneway': '<'},
        transclude: 'element',
        restrict: 'E'
    };
});