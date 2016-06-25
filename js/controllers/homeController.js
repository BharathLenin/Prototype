angular.module('myApp.controllers', [])
    .controller('homeController', function($scope, $rootScope) {

        $scope.setSelected = function(item) {
            console.log(item);
        };


    });
