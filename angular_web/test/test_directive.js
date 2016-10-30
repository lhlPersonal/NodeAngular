/**
 * Created by bulusli on 2014/10/16.
 *
 * $compile(element,transclude,maxPriority):传入dom结构，调用每个指令的compile函数，将每个compile返回的link函数打包一起返回
 * 一个总的link函数。该函数传入scope即可实现数据绑定，并得到解析完成的dom元素。transclude为一个函数：如果为手动调用$compile函数，
 * 则为实际传入的函数定义，该定义会传递给指令所在的compile(element,attrs,transclude)函数的第三个参数；如果不手动调用，则该函数为
 * link函数传入compile的第三个参数，link函数传入scope属性可以到指令所在的原始节点。
 *
 *<div ng-controller="TestCtrl">
 <div show-length>{{ text }}</div>
 <button ng-click="text='xx'">改变</button>
 </div>
 从上面的 HTML 代码中，大概清楚 ng 解析它的过程（只看 show-length 那一行）：

 解析 div 时发现了一个 show-length 的指令。
 如果 show-length 指令设置了 transclude 属性，则 div 的节点内容被重新编译，得到的 link 函数作为指令 compile 函数的参数传入。
 如果 show-length 指令没有设置 transclude 属性，则继续处理它的子节点（ TextNode ）。
 不管是上面的哪种情况，都会继续处理到 {{ text }} 这段文本。
 发现 {{ text }} 是一个 Interpolate ，于是自动在此节点中添加了一个指令，这个指令的 link 函数就是为 scope 添加了一个 $watch
 实现的功能是是当 scope 作 $digest 的时候，就更新节点文本。
 *
 *
 * priority
 这个值设置指令的权重，默认是 0 。当一个节点中有多个指令存在时，就按着权限从大到小的顺序依次执行它们的 compile 函数。相同权重顺序不定。

 terminal
 是否以当前指令的权重为结束界限。如果这值设置为 true ，则节点中权重小于当前指令的其它指令不会被执行。相同权重的会执行。

 restrict
 指令可以以哪些方式被使用，可以同时定义多种方式。
 E 元素方式 <my-directive></my-directive>
 A 属性方式 <div my-directive="exp"> </div>
 C 类方式 <div class="my-directive: exp;"></div>
 M 注释方式 <!-- directive: my-directive exp -->

 transclude
 前面已经讲过基本的用法了。可以是 'element' 或 true 两种值。

 compile
 基本的定义函数。 function compile(tElement, tAttrs, transclude) { ... }

 link
 前面介绍过了。大多数时候我们不需要单独定义它。只有 compile 未定义时 link 才会被尝试。
 function link(scope, iElement, iAttrs, controller) { ... }

 scope
 scope 的形式。 false 节点的 scope ， true 继承创建一个新的 scope ， {} 不继承创建一个新的隔离 scope 。
 {@attr: '引用节点属性', =attr: '把节点属性值引用成scope属性值', &attr: '把节点属性值包装成函数'}

 controller
 为指令定义一个 controller ， function controller($scope, $element, $attrs, $transclude) { ... }

 name
 指令的 controller 的名字，方便其它指令引用。

 require
 要引用的其它指令 conroller 的名字， ?name 忽略不存在的错误， ^name 在父级查找。

 template
 模板内容。

 templateUrl
 从指定地址获取模板内容。

 replace
 是否使用模板内容替换掉整个节点， true 替换整个节点， false 替换节点内容。
 */


/**
 * 直接返回link函数的使用。link函数只有在compile没有指定的时候才使用。
 */
app.directive('color', function () {
    //link的参数为($scope, $element, $attrs,$controller)
    var link = function ($scope, $element, $attrs) {
        $scope.$watch($attrs.color, function (new_c) {
            $element.css("color", new_c);
        })
    }
    return {link: link,
        restrict: 'A'};
});

/**
 * compile函数中的link参数的使用。
 */
app.directive('more', function ($rootScope, $document) {
    var func = function (element, attrs, link) {
        var node = link($rootScope);
        node.removeAttr('more'); //不去掉每次都会重新编译一直循环执行。
        $('body', $document).append(node);
    }

    return {compile: func,
        transclude: 'element', // element是节点,true是节点的内容
        restrict: 'A'
    };
});


/**
 * compile函数中的link函数的使用。
 */
app.directive("show1", function ($rootScope, $document) {
    var func = function (element, attrs, link) {
        var node = link($rootScope);//返回的是指令所在的原始节点或者原始节点的内容
        $("body", $document).append("<span>" + node.html().length + "</span>");
    };
    return {compile: func, transclude: 'element'/*element时为节点，true时为内容*/, restrict: 'A'};
});

/**
 * Controller中的$transclude参数的使用
 */
app.directive("ab", function () {
    var func = function () {
        console.log("compile");
        return function () {
            console.log("link");
        }
    };
//controller中的参数必须为带$符号的。
    var controller = function ($scope, $element, $attrs, $transclude) {
        console.log("controller");
        console.log($scope);
        var node = $transclude(function (clone_element, scope) {
            console.log(clone_element);//clone_element为原始节点，跟node一样。transclude为element时返回的是元素本身，
            // 为true时返回节点的内容。原始节点始终会被删除,以防止指令多次执行。
            console.log("..........");
            console.log(scope);
        });

        console.log(node);
    }

    return {

        compile: func,
        controller: controller,
        restrict: "A",
        transclude: true
    };

});


app.directive("c", function () {
    var ctrl = function ($scope, $element, $attrs, $transclude) {
        console.log("c ctrl");
        this.c = "aaaa";//在d指令中调用$controller.c可以取到该值。
        $scope.cScope = "cScope";//在d指令中可以取到该$scope，即子节点可以获取父节点的scope。

    };

    return {
        compile: function () {
            return function () {//该函数为post link函数，如果当前指令所在节点的子节点包含子指令，则在所有
                //子指令执行完会执行该函数。
                console.log("post link");
            }
        },
        name: "ctrl_c",
        controller: ctrl,
        restrict: "E"
    };
});

app.directive("d", function () {
    //$transclude参数传入时$compile已经完成了对原始节点的编译，即移除了原始节点，此时$element的类型为comment.
    //如果返回不指定transclude，则$element为原始节点。
    var func = function ($element, $attrs, $transclude) {
        return function ($scope, $element, $attrs, $controller) {
            console.log($controller.c);
            console.log($scope.cScope);//该scope合并了传入的$controller的scope。
            console.log($element);
            console.log($attrs);//$attrs包含$attr,$$element,$normalize,$addClass,$removeClass
            $attrs.$observe('ob', function (new_v) {//监视attr的变化。
                console.log(new_v);
            });
            $scope.ob = "oobobob";
        }
    };
    var ctrl = function ($scope, $element, $attrs, $transclude) {
        console.log("d ctrl");
        $scope.dScope = "dScope";
        $scope.ob = "ob";
        this.d = "dddddd";
    };

    return {
        compile: func,
        controller: ctrl,
        require: "?^ctrl_c",//?表示不存在则传入的$controller为undefined,^表示在父节点寻找controller。
        restrict: "E"
    };
});

/**
 * $attrs.$set的使用。
 *
 * <test1 a="" b="" c="" attr1="a1" at2="a2">test1 directive</test1>
 *
 * Xb {$attr: Object, $$element: n.fn.init[1], a: "", b: "", c: ""…}
 $$element: n.fn.init[1]

 $attr: Object
 a: "a"
 at2: "at2"
 attr1: "attr1"
 attr2: "at2"
 b: "b"
 c: "c"

 __proto__: Object
 a: ""
 at2: "a2"
 attr1: "a1"
 attr2: "a2"
 b: ""
 c: ""



 <test1 a="" b="" c="" c-d="a1" d_f="a2">test1 directive</test1>

 Xb {$attr: Object, $$element: n.fn.init[1], a: "", b: "", c: ""…}
 $$element: n.fn.init[1]
 $attr: Object
 a: "a"
 b: "b"
 c: "c"
 c-d: "c-d"
 cD: "c-d"------------------标准化的属性
 d-f: "d_f"
 dF: "d_f"------------------标准化的属性
 __proto__: Object
 a: ""
 b: ""
 c: ""
 c-d: "a1"
 cD: "a1"
 d-f: "a2"
 dF: "a2"
 */
app.directive(
    "test1", function () {
        var func = function ($element, $attrs) {
            //   $attrs.$set("attr1", "a1");
            //   $attrs.$set("attr2", "a2", true, "at2");//true时dom上会显示at2="a2",$attrs中也会有at2成员。
            //false时dom元素上不会显示at2，也不会显示attr2，$attrs里也不会有at2成员。

            $attrs.$set("c-d", "a1");
            $attrs.$set("d-f", "a2", true, "d_f");//注意原始属性值和保存到对象中的标准化的属性。

            console.log($attrs);
            $("body").append($element);
        };

        return {compile: func, restrict: "E"};
    });


/**
 * NgModelController的引用
 */
app.directive("test", function () {
    var link = function ($scope, $element, $attrs, $controller) {

        //取值时将ngModel里的数组转换成字符串显示在文本框中。调用push进去的函数返回。
        $controller.$formatters.push(function (v) {
            console.log("formatter:" + v);
            return v.join(",");
        })
        $controller.$parsers.push(function (v) {
            console.log("parse:" + v);
            return v.split(",");
        })
    };

    return {
        compile: function () {
            return link;
        },
        require: "ngModel",
        restrict: "A"
    };
});

/**
 * 自定义derictive template实现。
 * 注意命名规则：不能使用下划线和连接线。如果需要连接线，则需要按照标准写法定义。如ysBlock对应element：ys-Block
 */
app.directive("ysBlock", function () {
    return {
        compile: angular.noop,
        template: ' <div style="width: 200px; border: 1px solid black;"><h1 style="background-color: gray; color: white; font-size: 22px;">{{ title }}</h1><div>{{ text }}</div></div>',
        replace: true,
        restrict: "E"
    };
});

/**
 * 自定义实现for，类似ng-repeat
 */
app.directive("for", function ($compile) {
        var func = function ($element) {
            var matches = $element.prop("outerHTML").match('<for (.*?)=.*? in=.*? (.*?)=.*?>');
            var item = matches[1];
            var list = matches[2];
            var link = $compile($.trim($element.html()));

            $element.empty();

            return function ($scope, $element) {
                var scope, node, oldNodes = [];

                $scope.$watch(list, function (list) {
                    angular.forEach(oldNodes, function (n) {
                        n.remove()
                    });

                    for (var i = 0, len = list.length; i < len; i++) {
                        scope = $scope.$new();
                        scope[item] = list[i];
                        node = link(scope, angular.noop);//angular.noop必须写。
                        $element.after(node);

                        oldNodes.push(node);
                    }
                });
            };
        };

        return {
            compile: func,
            restrict: "E"
        };
    }
)

/**
 * $parse:解析属性的值
 */
//app.directive("if", function ($compile, $parse) {
//    var func = function ($element, $attrs) {
//        var parseFunc = $parse($attrs["true"]);//解析属性的值，得到一个函数，参数为scope，传入可以得到属性值
//        var link = $compile($.trim($element.html()));
//
//        return function ($scope, $element, $attrs, $controller) {
//            var node = link($scope);
//            var if_node = node[0];
//            var else_node = node[2];
//            var mark = $('<!-- IF/ELSE -->');
//
//            $element.after(mark);
//            $element.remove();
//
//            $scope.$watch(function ($scope) {
//                var isTrue = parseFunc($scope);
//                if (isTrue) {
//                    mark.next().remove();
//                    mark.after(if_node);
//                } else {
//                    mark.next().remove();
//                    mark.after(else_node);
//                }
//            });
//        };
//    };
//
//    return {
//        compile: func,
//        restrict: "E"
//    };
//});

app.directive('if', function ($parse, $compile) {
    var compile = function ($element, $attrs) {
        var cond = $parse($attrs.true);
        console.log("if compile exec");

        return {
            pre: function () {
                console.log("if pre exec");
            },
            post: function ($scope, $ielement, $iattrs, $controller) {
                var mark = $('<!-- IF/ELSE -->');

                $scope.if_node = $compile($.trim($ielement.html()))($scope, angular.noop);
                $ielement.empty();
                $element.before(mark);
                $element.remove();

                console.log("if postlink exec");

                $scope.$watch(function (scope) {
                    if (cond(scope)) {
                        mark.after($scope.if_node);

                        $scope.else_node.detach();
                    } else {
                        if ($scope.else_node !== undefined) {
                            mark.after($scope.else_node);

                            $scope.if_node.detach();
                        }
                    }
                });
            }}
    }

    return {
        compile: compile,
        restrict: 'E'}
});


/**
 * 父子指令的三种函数的执行顺序：compile，pre-link，post-link.
 * if compile->else compile->if pre->else pre->else post->if post
 */
app.directive('else', function ($compile) {
    var compile = function ($element, $attrs) {
        console.log("else compile exec");

        return{
            pre: function () {
                console.log("else pre exec");
            },
            post: function ($scope, $ielement, $iattrs, $controller) {
                $scope.else_node = $compile($.trim($ielement.html()))($scope, angular.noop);
                $element.remove();

                console.log("else postlink exec");
                //此函数先于if指令的postlink函数执行。
            }
        }
    }

    return {
        compile: compile,
        restrict: 'E'}

})

/**
 * $scope.$apply()
 */
app.directive("ta", function () {
    var func = function () {

        return function ($scope, $element) {
            $element.click(function () {
                //dom元素的click事件引起的变化不会自动应用$wacth进行更新。必须手动调用$scope.$apply方法。
                $scope.$apply(function () {
                    $scope.para = "click para";
                });
            })
        }
    }

    return {
        compile: func,
        restrict: "A"
    }
});
/**
 * jquery 中的$apply
 * angular 模块执行顺序：config->directive compile->service->controller->postlink
 */
app.directive("ta1", function () {
    console.log("app directive called");
    var func = function () {
        console.log("jquery compile called");
        return function ($scope) {
            $(function () {
                console.log("jquery directive called");
                setTimeout(function () {
                    //window事件引起的变化不会自动应用$wacth进行更新。必须手动调用$scope.$apply方法。
                    $scope.$apply(function () {
                        $scope.jqueryPara = "jquery changed para";
                    })
                }, 2000);
            })
        }
    }

    return {
        compile: func,
        restrict: "A"
    }
});

/**
 * $parse
 */
app.directive("tp", function ($parse) {
    var func = function () {
        return function ($scope, $element, $attrs) {
            var watchVal = $attrs["ngModel"];

            $scope.$watch(watchVal, function (newVal, oldVal) {
                var parseVal = $parse(watchVal)($scope);
                if (parseVal === "same") {
                    // if (newVal == oldVal) {
                    $scope.testVal = "same value";
                } else {
                    $scope.testVal = "different value";
                }
            });
        };
    }

    return{
        compile: func,
        restrict: "A"
    }
});
/**
 * $interpolate
 */
app.directive("ti", function ($interpolate) {
    var func = function () {
        return function ($scope) {
            $scope.$watch("to", function () {
                var temp = $interpolate($scope.emailBody);
                $scope.previewText = temp({to: $scope.to});
            });
        }
    }
    return {
        compile: func,
        restrict: "A"
    }
});

/**
 * template ng-transclude的使用：意指将指令myDialog元素的内容作为ng-transclude指令所在元素的内容。
 *
 * transclude的意义：在compile函数中为第三个参数，在link函数中为第五个参数，该参数
 * 为一个函数，传入$scope，会返回指令所在的原始节点信息，而$element已经变成了comment，无法取原始节点中的信息。
 * 如果transclude为element，则会返回原始节点，如果为其它值，则返回原始节点的内容。
 *
 * 当transclude为element时，template不会呈现,ng-transclude没有意义。
 *
 *
 */
app.directive("myDialog", function () {
    //第三个参数为$transclude
    var compileFunc = function ($element, $attr, $transclude) {
        return function ($scope, $element, $attr, $controller) {
            var node = $transclude($scope);
        };
    }
    //第五个参数为$transclude
    var postLink = function ($scope, $element, $attr, $controller, $transclude) {
        var node = $transclude($scope);
    }

    return {
        restrict: "E",
        transclude: "element",//如果为element则必须加上replace：true，否则template不会起作用，如果为其它值，则无需加。
        // compile: func,
        link: postLink,
        replace: true,
//        template: '<div class="sidebox"><div class="content"><h2 class="header">' +
//            '{{ name1 }}</h2><span class="content" ng-transclude></span></div></div>'
        templateUrl: "../test/temp.html"
    };
});

/**
 * 从dom中向指令私有scope传值
 */
app.directive("privScope", function () {
    return {
        restrict: "A",
        scope: {
            myUrl: "@",
            myLinkText: "@"
        },
        template: "<div><a href='{{myUrl}}'>{{myLinkText}}</a></div>"
    }
});

/**
 * 将外部ngModel的值传入指令内部的私有scope
 */
app.directive("privScope1", function () {
    return {
        restrict: "A",
        link: function ($scope) {
            var s = $scope;
        },
        scope: {
            myUrl: "=",
            myLinkText: "@"
        },
        template: '<label>My Url Field:</label><input type="text" ng-model="myUrl" /><a href="{{myUrl}}">{{myLinkText}}</a></a></div>'
    }
});

//app.directive("")


