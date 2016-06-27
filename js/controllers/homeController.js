angular.module('myApp.controllers', [])
    .controller('homeController', function($scope, $rootScope, $http, $q) {

        $scope.showItem = 'Main';
        $scope.tabItem = 'Main';

        fetch().then(function(data) {
            $scope.serviceDetails = data;
            console.log($scope.serviceDetails);
        }, function(error) {
            $scope.errorDetails = error;
            console.log($scope.errorDetails);
        });

        console.log($scope.serviceDetails);

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
                pieHole: 0.5,
                pieSliceTextStyle: {
                    color: 'black',
                },
                'backgroundColor': 'transparent',

                slices: {
                    0: {
                        color: '#58d68d' //green
                    },
                    1: {
                        color: '#e74c3c'
                    }
                },
                fill: 'transparent',
                legend: 'none',
                is3D: false,
                // width: 600,
                // height: 300,
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
                        color: '#58d68d'
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
                        color: '#58d68d'
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

            //MQ
            var mqData = google.visualization.arrayToDataTable([
                ['', ''],
                ['Up', 0],

                ['Down', 2]
            ]);

            var mqOptions = {
                title: '',
                pieHole: 0.5,
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

            var mqChart = new google.visualization.PieChart(document.getElementById('donutchartForMQMainDash'));
            mqChart.draw(mqData, mqOptions);
            //MQ            
        };

        $scope.initializeChartForMainDashboard();
        $scope.initializeSterlingMainDash();

        angular.element(window).on('resize', function() {
            angular.element(document.querySelectorAll(".chartcontainer")).css('display', 'block');
        });

        $scope.openComponent = function(item) {
            $scope.showItem = item;
            $scope.tabItem = item;
           // angular.element(document.querySelectorAll(".chartcontainer")).css('display', 'none');
            // var el = angular.element(document.querySelector('#doughnut'));
            setTimeout(function() {
                //window.dispatchEvent(new Event('resize'));


                if (document.createEvent) { // W3C
        var ev = document.createEvent('Event');
        ev.initEvent('resize', true, true);
        window.dispatchEvent(ev);
    }
    else { // IE
        element=document.documentElement;
        var event=document.createEventObject();
        element.fireEvent("onresize",event);
    }

            }, 100);
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

        function fetch(){
            var deferred = $q.defer();

            $http.get("http://localhost:12030/dashboard-rest/rest/data/getData", {timeout: 240000})
            .then(function successCallback(response){
              deferred.resolve(response);
           }, function errorCallback(response){
              deferred.reject(response);
           });

          return deferred.promise;

        }

    });
