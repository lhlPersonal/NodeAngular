/**
 * Created by bulusli on 2015/2/27.
 */

app.directive("dvGrprepeat", function () {
    return {
        restrict: "E",
        replace: true,
        templateUrl: "/views/devList/templ/left_name.html"
    }
});

app.directive("dvShowbar", function () {
    return {
        restrict: "A",
        link: function (scope, element, attr) {
            element.on("click", function () {
                element.next("ul").css({top: element.offset().top - 40, left: element.offset().left + 15});
            })
        }
    }
});