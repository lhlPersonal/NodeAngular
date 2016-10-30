/**
 * Created by bulusli on 2015/2/27.
 */
app.controller('dvDevListController', ['$scope', '$modal', 'dvDevListService', 'guidService', function ($scope, $modal, dvDevListService, guidService) {
    var getData = function () {
        return dvDevListService.devListByGrpId($scope.gid || $scope.devGrps[0].id);
    };

    $scope.refershData = function () {
        $scope.myData = getData();
    };
    $scope.devGrps = dvDevListService.devGrpList();
    $scope.showDelAlert = function (gid) {
        var modalInstance = $modal.open({
            templateUrl: '/views/devList/templ/modal_delMsg.html',
            backdrop: 'static',
            keyboard: false,
            controller: ['$scope', '$modalInstance', function (scope, modalInstance) {
                scope.ok = function () {
                    modalInstance.close(gid);
                };

                scope.cancel = function () {
                    modalInstance.dismiss('cancel');
                };
            }]
        });

        modalInstance.result.then(function (gid) {
            dvDevListService.delDevGrp(gid);
        }, function () {

        });
    }
    $scope.showEdit = function (devGrp) {
        var modalInstance = $modal.open({
            templateUrl: '/views/devList/templ/modal_edit_new.html',
            backdrop: 'static',
            keyboard: false,
            controller: ['$scope', '$modalInstance', function (scope, modalInstance) {
                scope.ok = function () {
                    modalInstance.close(scope.devGrp);
                };

                scope.cancel = function () {
                    modalInstance.dismiss('cancel');
                };

                scope.devGrp = angular.copy(devGrp);

                scope.title = "Edit Device Group"
            }]
        });

        modalInstance.result.then(function (devGrp) {
            dvDevListService.editDevGrp(devGrp);
        }, function () {
        });
    }
    $scope.showNew = function (size) {
        var modalInstance = $modal.open({
            templateUrl: '/views/devList/templ/modal_edit_new.html',
            backdrop: 'static',
            keyboard: false,
            controller: ['$scope', '$modalInstance', function (scope, modalInstance) {
                scope.ok = function () {
                    modalInstance.close(scope.devGrp);
                };

                scope.cancel = function () {
                    modalInstance.dismiss('cancel');
                };

                scope.devGrp = {id: guidService.guid(), name: "", desc: ""};

                scope.title = "New Device Group";
            }],
            size: size
        });

        modalInstance.result.then(function (devGrp) {
            dvDevListService.addDevGrp(devGrp);
        }, function () {

        });
    }
    $scope.showDevs = function (gid) {
        $scope.gid = gid;
        $scope.refershData();
    }
    $scope.refershData();

    $scope.gridOptions = {
        data: $scope.myData,
        jqueryUITheme: true,
       // showGroupPanel: true,
       // jqueryUIDraggable: true,
      //  showGridFooter: true,
        //showColumnFooter: true,
        //  showFooter: true,
        paginationPageSizes: [10, 20, 50],
        paginationPageSize: 20,
        paginationCurrentPage: 1
    };
}])