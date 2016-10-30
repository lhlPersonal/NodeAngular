/**
 * Created by bulusli on 2015/2/16.
 */

app.controller("awsController", ['$scope', function ($scope) {
    $scope.signedIn = function (authResult) {
        if (authResult['access_token']) {
            location.href = "/test/AWS/userInfo/userInfo.html";
        } else if (authResult['error']) {

        }
    }
    $scope.glSign = function () {
        gapi.signin.render('signInButton',
            {
                "class": "g-signin",
                'callback': $scope.signedIn, // Function handling the callback.
                'clientid': '687016867179-fbgudc1bk7dtfadkv0f2fho0vgfsvq6h', // CLIENT_ID from developer console which has been explained earlier.
                'requestvisibleactions': 'http://schemas.google.com/AddActivity', // Visible actions, scope and cookie policy wont be described now,
                // as their explanation is available in Google+ API Documentation.
                'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email',
                'cookiepolicy': 'single_host_origin'
            }
        )
    }
}]);