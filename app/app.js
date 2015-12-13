(function () {
    "use strict";

    var app = angular.module('HackerEarth', ['chieffancypants.loadingBar', 'ngAnimate'])
    app.config(function (cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = true;
    });
    app.controller("ProblemController", ['$scope', '$http','total', 'cfpLoadingBar', function ($scope, $http,total,cfpLoadingBar) {
        cfpLoadingBar.start();

        $http.get("//hackerearth.0x10.info/api/problems?type=json&query=list_problems").success(function (data) {
            var i;
            for (i = 0; i <= data.problems.length - 1 ; i++) {
                var newProd = "like"
                var newValue = 0;
                data.problems[i][newProd] = newValue;

            }
            if (localStorage.getItem("likelocalstorage") === null) {
                $scope.problems = data;
                $scope.totallikes = total.say($scope.problems.problems.length, $scope.problems);
                
            }
            else
            {
                $scope.problems = JSON.parse(localStorage.getItem("likelocalstorage"));
                $scope.totallikes = total.say($scope.problems.problems.length, $scope.problems);
            }

        });
        $http.get("//hackerearth.0x10.info/api/problems?type=json&query=api_hits").success(function (data) {
            $scope.apihits = data;
        });
        this.like1 = function (se) {
            cfpLoadingBar.start();
            $scope.index =  $scope.problems.problems.map(function (e) { return e.name; }).indexOf(se);
            var num = parseInt($scope.problems.problems[$scope.index].like) + 1;
            $scope.problems.problems[$scope.index].like = num;
            localStorage.setItem("likelocalstorage", JSON.stringify($scope.problems));
            $scope.problems = JSON.parse(localStorage.getItem("likelocalstorage"));
            $scope.totallikes = total.say($scope.problems.problems.length, $scope.problems);
            cfpLoadingBar.complete();
        }
        cfpLoadingBar.complete();
    }])
    app.factory('total', function () {
        return {
            say: function (len,dat) {
                var total = 0;
                for (var i = 0; i < len; i++) {
                    total += parseInt(dat.problems[i].like, 10);
                }
                return total;
            }
        }
    });

    app.directive('starRating', function () {
        return {
            restrict: 'A',
            template: '<ul class="rating">' +
                '<li ng-repeat="star in stars" ng-class="star" style="font-size:1.2em">' +
                '&#x2605' +
                '</li>' +
                '</ul>',
            scope: {
                ratingValue: '=',
                max: '='
            },
            link: function (scope, elem, attrs) {

                scope.stars = [];
                for (var i = 0; i < scope.max; i++) {
                    scope.stars.push({
                        filled: i < Math.floor(scope.ratingValue)
                    });
                }
            }
        }
    });
})();

