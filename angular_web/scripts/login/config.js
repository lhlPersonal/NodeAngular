/**
 * Created by bulusli on 2015/2/27.
 */
var app = angular.module("dvLoginApp", ["ngMessages", "pasvaz.bindonce", "pascalprecht.translate"]);

app.run(["$cacheFactory", function ($cacheFactory) {
    console.log("run start");
    var usrInfo = $cacheFactory("userInfo");
    usrInfo.put("userList", [
        {name: "aaaaaaaaaaaaaaaaa", pwd: "11111111111111"},
        {name: "bbbbbbbbbbbbbbbbb", pwd: "22222222222222"},
        {name: "ccccccccccccccccc", pwd: "33333333333333"},
        {name: "ddddddddddddddddd", pwd: "44444444444444"},
        {name: "eeeeeeeeeeeeeeeee", pwd: "55555555555555"}
    ]);
}]).
    config(["$provide", "svProvProvider", "KEY", function (provide, svProv, key) {
        svProv.setUrl("http://localhost:8732");

        provide.decorator("s11", ["$delegate", function (delegate) {
            return {
                showAlert: function () {
                    alert("delegate called");
                    delegate.showAlert();
                    alert(key);
                }}
        }]);
    }])
;
