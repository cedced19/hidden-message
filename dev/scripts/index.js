
require("angular");
var CryptoJS = require("crypto-js");

var app = angular.module('HiddenMessage', []);
app.controller('HiddenMessageCtrl', ['$scope', function ($scope) {
    $scope.result = '';
    $scope.text = 'Je t\'aime';
    $scope.config = {
        uri: 'https://cedric-jung.eu/hidden-message/guess.html?',
    };
    $scope.questions = [];
    $scope.newQuestion = {
        q: "What is the first letter of my name ? (in capital letter)",
        a: "J"
    }

    $scope.addQuestion = function (q) {
        if (q.q != '' && q.a != '') {
            $scope.questions.push(q);
            $scope.newQuestion = {
                q: '',
                a: ''
            }
            $scope.compile()
        }
    }

    $scope.compile = function () {
        if ($scope.questions.length) {
            var queries = '';
            var password = '';
            for (var i = 0; i < $scope.questions.length; i++) {
                queries += 'q';
                queries += i;
                queries += '=';
                queries += encodeURIComponent($scope.questions[i].q);
                password += $scope.questions[i].a;
                queries += '&';
            }
            queries += 'text=';
            queries += CryptoJS.AES.encrypt($scope.text, password).toString();
            $scope.result = $scope.config.uri + queries;
        }
    };

    $scope.removeQuestion = function (key) {
        $scope.questions.splice(key, 1);
    }
}]);
