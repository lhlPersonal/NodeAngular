/**
 * Created by bulusli on 2015/2/16.
 */
app.directive('googleSignin', function () {
    return {
        restrict: 'A',
        template: '<span id="signinButton"></span>',
        replace: true,
        scope: {
            afterSignin: '&'
        },
        link: function (scope, ele, attrs) {
// 设置标准的google类
            attrs.$set('class', 'g-signin');
// 设置clientid
            attrs.$set('data-clientid',
                    attrs.clientId + '.apps.googleusercontent.com');
// 建立作用域的url
            var scopes = attrs.scopes || [
                'auth/plus.login',
                'auth/userinfo.email'
            ];
            var scopeUrls = [];
            for (var i = 0; i < scopes.length; i++) {
                scopeUrls.push('https://www.googleapis.com/' + scopes[i]);
            }
            ;
// 创建一个自定义回调方法
            var callbackId = "_googleSigninCallback",
                directiveScope = scope;
            window[callbackId] = function () {
                var oauth = arguments[0];
                directiveScope.afterSignin({oauth: oauth});
                window[callbackId] = null;
            };
// 设置标准的google登录按钮的设置
            attrs.$set('data-callback', callbackId);
            attrs.$set('data-cookiepolicy', 'single_host_origin');
            attrs.$set('data-requestvisibleactions',
                'http://schemas.google.com/AddActivity')
            attrs.$set('data-scope', scopeUrls.join(' '));
// 最后，刷新客户端库
// 强迫按钮在浏览器中重绘
//            (function () {
//                var po = document.createElement('script');
//                po.type = 'text/javascript';
//                po.async = true;
//                po.src = 'https://apis.google.com/js/client:plusone.js';
//                var s = document.getElementsByTagName('script')[0];
//                s.parentNode.insertBefore(po, s);
//            })();
        }
    }
});
