angular.module('myApp.controllers', [])
    .controller('homeController', function($scope, $rootScope) {

    	$scope.showItem = 'Main';

        $scope.setSelected = function(item) {
            console.log(item);
            console.log($scope.showItem);
        };

        $scope.openComponent= function(item) {
        	alert(item);
        	$scope.showItem = item;
        }

    });
