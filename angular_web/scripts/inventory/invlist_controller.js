/**
 * Created by bulusli on 2014/10/16.
 */

'use strict';
app.controller('InvlistCtrl', ['$scope', '$routeParams', '$http', '$compile', 'invlistSvce', function ($scope, $routeParams, $http, $compile, invlistSvce) {
    console.log("app controller called");
    $scope.device = {};
    $scope.setDevScope = function (dev) {
        //    $scope.device = dev;
    }
    $scope.detailInit = function () {
        if (!($scope.device._id)) {
            $scope.getDev($routeParams.id);
        }
    }
    $scope.save = function () {
        if (!($scope.device._id)) {
            invlistSvce.save($scope.device);
        } else {
            invlistSvce.update($scope.device, $scope);
        }
    }
    $scope.del = function (id) {
        invlistSvce.del(id, $scope);
    }
    $scope.show = function () {
        invlistSvce.show($scope);
    }
    $scope.getDev = function (id) {
        invlistSvce.getDev(id, $scope);
    }

    $scope.filterOptions = {
        filterText: "",
        useExternalFilter: true
    };
    $scope.totalServerItems = 0;
    $scope.pagingOptions = {
        pageSizes: [10, 20, 50, 100],
        pageSize: 20,
        currentPage: 1
    };
    $scope.setPagingData = function (data) {
        $scope.myData = data;
        $scope.totalServerItems = 1000;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };
    $scope.getPagedDataAsync = function (pageSize, page, searchText) {
        setTimeout(function () {
            var data;
            if (searchText) {
                var ft = searchText.toLowerCase();
                $http.get('jsonFiles/largeLoad.json').success(function (largeLoad) {
                    data = largeLoad.filter(function (item) {
                        return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                    });
                    $scope.setPagingData(data, page, pageSize);
                });
            } else {
                $http({
                    method: 'get',
                    url: '/svr/inv/getDevData',
                    cache: false,
                    params: {pageSize: pageSize, pageIndex: page}
                }).success(function (data) {
                    $scope.setPagingData(data);
                });
            }
        }, 100);
    };
    $scope.$watch('pagingOptions', function (newVal, oldVal) {
        if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);
    $scope.$watch('filterOptions', function (newVal, oldVal) {
        if (newVal !== oldVal) {
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);
    $scope.gridOptions = {
        data: 'myData',
        enablePaging: true,
        pinSelectionCheckbox: true,
        showFooter: true,
        useExternalSorting: true,
        totalServerItems: 'totalServerItems',
        pagingOptions: $scope.pagingOptions,
        filterOptions: $scope.filterOptions,
        selectedItems: $scope.mySelections,
        showSelectionCheckbox: true,
        multiSelect: true,
        showGroupPanel: false,
        showColumnMenu: true
        //   ,
        //  columnDefs: [
        //     { field: 'name', displayName: 'Very Long Name Title', sortable: false },
        //      { field: 'allowance', width: 120, aggLabelFilter: 'currency', cellTemplate: '<div ng-class="{red: row.entity[col.field] > 30}"><div class="ngCellText">{{row.entity[col.field] | currency}}</div></div>' },
        //     { field: 'birthday', width: '120px', cellFilter: 'date', resizable: false },
        //     { field: 'paid', width: '*', cellFilter: 'checkmark' }]
    };
    $scope.loadData = function () {
        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
    }
    $scope.addData = function () {
        $http({
            method: 'post',
            url: '/svr/inv/batchInsert',
            data: {}
        }).success(function (data) {

        });
    }
}])