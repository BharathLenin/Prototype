angular.module('myApp.controllers', [])
    .controller('homeController', function($scope, $rootScope) {

        $scope.showItem = 'Main';


        $scope.localChart = {
            columns: [
                ['green', 32],
                ['amber', 20],
                ['red', 10]
            ],
            type: 'donut',
            colors: {
                green: '#009900',
                amber: '#FFC200',
                red: '#ff0000'
            },
            labels: true,
            bindto: "#chart1"
        };

        $scope.openComponent = function(item) {
            $scope.showItem = item;


        }

    });
