/**
 * Created by bulusli on 2015/2/27.
 */
var app = angular.module("dvDevListApp", ["ui.bootstrap", "ui.grid", "ui.grid.pagination", "dvUtils"]);
app.run(["$cacheFactory", "guidService", function ($cacheFactory, guidService) {
    var devGrpHash = $cacheFactory("devGrpHash");
    var devHash = $cacheFactory("devHash");
    var devGrpArr = [
        {id: guidService.guid(), name: 'dev1Grp', desc: "desc1"},
        {id: guidService.guid(), name: 'devGrp2', desc: "desc2"},
        {id: guidService.guid(), name: 'devGrp3', desc: "desc3"},
        {id: guidService.guid(), name: 'devGrp4', desc: "desc4"}
    ];
    var devs = [];

    devGrpHash.put("devGrpList", devGrpArr);
    devGrpArr.forEach(function (item, index) {
        var devList = [100];
        for (var i = 0; i < 100; i++) {
            devList[i] = {name: "dev" + i * index, ip: "172.18.190." + i, mac: ""};
        }

        var obj = {gid: item.id, devInGrp: devList};
        devs.push(obj);
    });
    devHash.put("devList", devs);
}])
    .config(["$tooltipProvider", function ($tooltipProvider) {
        $tooltipProvider.options({
            placement: 'right',
            animation: false,
            popupDelay: 0
        });
        $tooltipProvider.setTriggers({"mouseover": "mouseout"});
    }])
