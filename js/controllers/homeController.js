angular.module('myApp.controllers', [])
    .controller('homeController', function($scope, $rootScope) {

        $scope.showItem = 'Main';
        $scope.tabItem = 'Sterling';

        $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
        $scope.data = [300, 500, 100];

        $scope.openComponent = function(item) {
            $scope.showItem = item;
            if (item == 'Main') {
                $scope.tabItem = 'Sterling';
            } else {
                $scope.tabItem = item;
            }


        }
    });
