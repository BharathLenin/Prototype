angular.module('myApp.controllers', [])
    .controller('homeController', function($scope, $rootScope) {

        $scope.showItem = 'Main';




        $scope.data = {
            columns: [
                ['green', 32],
                ['amber', 20],
                ['red', 10]
            ],
            type: 'donut', //pie
            colors: {
                green: '#009900',
                amber: '#FFC200',
                red: '#ff0000'
            },
            labels: true
        };

        $scope.openComponent = function(item) {
            $scope.showItem = item;


        }

    });
