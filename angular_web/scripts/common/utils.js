/**
 * Created by bulusli on 2015/3/18.
 */

angular.module("dvUtils", []).factory("guidService", function () {
    return {
        guid: function guidGenerator() {
            var S4 = function () {
                return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
            };
            return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
        }}
});