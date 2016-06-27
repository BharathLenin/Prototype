angular.module('myApp.controllers', [])
    .controller('homeController', function($scope, $rootScope) {

        $scope.showItem = 'Main';
        $scope.tabItem = 'Sterling';

        //c3js chart
        $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
        $scope.data = [300, 500, 100];


        $scope.initializeSterlingMainDash = function() {
            $scope.sterlingConnectionCountHealthStatus = 'Warning'; //green
            $scope.sterlingProbeHealthStatus = 'Warning'; //Amber
            $scope.sterlingSpaceHealthStatus = 'Healthy'; //Red
            $scope.sterlingAgentHealthStatus = 'Critical'; //Red
        }


        $scope.initializeChartForMainDashboard = function() {

            //Sterling - MainDashboard
            var storeData = google.visualization.arrayToDataTable([
                ['', ''], //required
                ['Up', 121],

                ['Down', 37]
            ]);

            var storeOptions = {
                title: '',
                pieHole: 0.6,
                pieSliceTextStyle: {
                    color: 'black',
                },
                'backgroundColor': 'transparent',

                slices: {
                    0: {
                        color: '#58d68d'
                    },
                    1: {
                        color: '#e74c3c'
                    }
                },
                fill: 'transparent',
                legend: 'none'
            };


            var storeChart = new google.visualization.PieChart(document.getElementById('donutchartForStoreMainDash'));
            storeChart.draw(storeData, storeOptions);
            //Sterling

            //COM
            var comData = google.visualization.arrayToDataTable([
                ['', ''],
                ['Up', 11],

                ['Down', 0]
            ]);

            var comOptions = {
                title: '',
                pieHole: 0.5,
                pieSliceTextStyle: {
                    color: 'black',
                },
                'backgroundColor': 'transparent',

                slices: {
                    0: {
                        color: '#e74c3c'
                    },
                    1: {
                        color: '#e74c3c'
                    }
                },
                fill: 'transparent',
                legend: 'none'
            };

            var comChart = new google.visualization.PieChart(document.getElementById('donutchartForComMainDash'));
            comChart.draw(comData, comOptions);



            //DB
            var dbData = google.visualization.arrayToDataTable([
                ['', ''],
                ['Up', 11],

                ['Down', 0]
            ]);

            var dbOptions = {
                title: '',
                pieHole: 0.5,
                pieSliceTextStyle: {
                    color: 'black',
                },
                'backgroundColor': 'transparent',

                slices: {
                    0: {
                        color: 'green'
                    },
                    1: {
                        color: '#e74c3c'
                    }
                },
                fill: 'transparent',
                legend: 'none'
            };

            var dbChart = new google.visualization.PieChart(document.getElementById('donutchartForDBMainDash'));
            dbChart.draw(dbData, dbOptions);
            //DB
        };

        $scope.initializeChartForMainDashboard();
        $scope.initializeSterlingMainDash();

        $scope.openComponent = function(item) {
            $scope.showItem = item;
            if (item == 'Main') {
                $scope.tabItem = 'Sterling';
            } else {
                $scope.tabItem = item;
            }
        };

        $scope.choseHealthColor = function(tabStatus) {
            if (tabStatus == 'Healthy') {
                return 'palette-emerald';
            } else if (tabStatus == 'Warning') {
                return 'palette-carrot';
            } else {
                return 'palette-alizarin';
            }
        };

        $scope.choseHealthIcon = function(tabStatus) {
            if (tabStatus == 'Healthy') {
                return 'fa-thumbs-up faa-vertical animated';
            } else if (tabStatus == 'Warning') {
                return 'fa-exclamation-triangle faa-flash animated';
            } else {
                return 'fa-times-circle faa-flash animated';
            }
        };

    });
