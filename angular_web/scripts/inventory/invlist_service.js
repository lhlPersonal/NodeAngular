/**
 * Created by bulusli on 2014/10/14.
 */
'use strict';
app.factory('invlistSvce', ['$http', '$window', '$location', '$resource', 'Restangular', '$q', function ($http, $window, $location, $resource, Restangular, $q) {
    var baseSvrUrl = '/svr/inv/';

    function save(data, $scope) {
        // var defer = $q.defer();

        $http({
            method: 'post',
            url: baseSvrUrl + 'add',
            data: data
        }).success(function (data) {
            //    defer.resolve(data);

            if (data.error) {
                $window.alert(data.error);
            } else {
                $scope.devices.push(data);
            }

        })
        // return defer.promise;

        //$resource主要用于和restfulAPI进行交互。普通的http请求不太合适。
//        $resource(baseSvrUrl + 'add').save({}, data, function (data) {
//            if (data.error) {
//                $window.alert(data.error);
//            } else {
//                $scope.devices.push(data);
//            }
//        });
    };
    function update(dev, $scope) {
        var q = $http({
            method: 'put',
            url: baseSvrUrl + 'update',
            cache: false,
            params: dev
        });
        q.success(function (data, status, headers, config) {
            if (data.error) {
                $window.alert(data.error);
            } else {
                $scope.devices.forEach(function (item, index) {
                    if (item._id === dev._id) {
                        $scope.devices[index] = dev;
                    }
                })
            }
        }).error(function (data, status, headers, config) {
            $window.alert(status);
        })
    };
    function getDev(id, $scope) {
        var q = $http({
            method: 'get',
            url: baseSvrUrl + 'getDev',
            params: {id: id}
        });
        q.success(function (data) {
            if (data.error) {
                $window.alert(data.error);
            } else {
                $scope.device = data;
            }
        })
    };
    function del(id, $scope) {
        $http({
            method: 'delete',
            url: baseSvrUrl + 'del',
            params: {id: id}
        }).success(function (data) {

            if (data.error) {
                $window.alert(data.error);
            } else {
                var arr = [], index;

                $scope.devices.forEach(function (item, _index) {
                    if (item._id !== id) {
                        arr.push(item);
                    } else {
                        index = _index;
                    }
                })
                //最后一个则取前一个的值
                if (index == $scope.devices.length - 1) {
                    index -= 1;
                }
                $scope.devices = arr;
                $scope.device = arr[index];
                $location.path("/ilist/detail/" + $scope.device._id);
            }
        })
    };
    function show($scope) {
        var q = $http({
            method: 'get',
            url: baseSvrUrl + 'show',
            data: {}
        });
        q.success(function (data) {
            if (!data.error) {
                $scope.devices = data;
            } else {
                $window.alert(data.error);
            }
        })
    }


    return {
        save: save,
        update: update,
        del: del,
        show: show,
        getDev: getDev
    }
}
])