/**
 * Created by bulusli on 2015/2/27.
 */

app.directive("validateStyle", function () {
    console.log("directive start");
    var compile = function ($element) {
        var mark = $("<!--validate-style -->");

        $element.after(mark);
        $element.remove();

        var link = function (scope) {
            // if(!scope.blurMark){
            console.log("no blurMark");
            //  }
            //监测输入框的边框样式。
            scope.$watch(function () {
                return scope.blurMark;
            }, function (new_val) {
                if (scope.startWatch) {
                    var valid = (new_val && scope.sign_form.$valid && !scope.nameBlurError && !scope.pwdBlurError);
                    var eleName = angular.element("[name=username]");
                    var elePwd = angular.element("[name=pwd]");

                    eleName.removeClass("invalid").addClass("valid");
                    elePwd.removeClass("invalid").addClass("valid");

                    if (!valid) {
                        if (scope.nameBlurError) {
                            eleName.removeClass("valid").addClass("invalid");
                        }
                        if (scope.pwdBlurError) {
                            elePwd.removeClass("valid").addClass("invalid");
                        }
                    }
                }
            });
        }

        return link;
    }

    return {
        restrict: "E",
        compile: compile
    };
})

/**
 * $formatters用与实际绑定的值发生改变时，比如$scope.userInfo.name="ZZZZZZZZZZZZZZZ";
 */
app.directive("nameFormat", function () {
    console.log("directive2 start");
    var link = function (scope, element, attrs, ngModel) {
        var lower = function (v) {
            if (v) {
                return v.toLowerCase();
            }
        }
        var f = function (v) {
            if (v) {
                var zz = ngModel;
                return v + "dddd";
            }
        }

      //  ngModel.$formatters.push(lower);
      //  ngModel.$parsers.push(f);
    }

    return {
        link: link,
        restrict: "A",
        require: "ngModel"
    };
});