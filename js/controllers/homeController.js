angular.module('myApp.controllers', [])
    .controller('homeController', function($scope, $rootScope, $http, $q) {

        //Constants
        const RED = "red";
        const AMBER = "amber";
        const GREEN = "green";

        const RED_COLOR = '#e74c3c';
        const GREEN_COLOR = '#58d68d';
        const CARROT_COLOR = '#e67e22';
        const BLACK_COLOR = '#000';

        $scope.showItem = 'Main';
        $scope.tabItem = 'Main';


        $scope.mqUpStatus = 0;
        $scope.mqDownStatus = 0;
        $scope.mqWarnStatus = 0;

        $scope.storeDownStatus = 0;
        $scope.storeUpStatus = 0;
        $scope.storeWarnStatus = 0;

        $scope.comDownStatus = 0;
        $scope.comUpStatus = 0;
        $scope.comWarnStatus = 0;

        $scope.dbDownStatus = 0;
        $scope.dbUpStatus = 0;
        $scope.dbWarnStatus = 0;

        $scope.initializeSterlingMainDash = function() {
            $scope.sterlingConnectionCountHealthStatus = 'Warning'; //green
            $scope.sterlingProbeHealthStatus = 'Warning'; //Amber
            $scope.sterlingSpaceHealthStatus = 'Healthy'; //Red
            $scope.sterlingAgentHealthStatus = 'Critical'; //Red
        }

        function initValues() {
            $scope.localStoreGreen = 0;
            $scope.localStoreAmber = 0;
            $scope.localStoreRed = 0;
        }


        $scope.donutColumns = [{ "id": "Red", "type": "donut", "color": RED_COLOR },
            { "id": "Amber", "type": "donut", "color": CARROT_COLOR }, {
                "id": "Green",
                "type": "donut",
                "color": GREEN_COLOR
            }
        ];

        $scope.pieColumns = [{ "id": "Red", "type": "pie", "color": RED_COLOR },
            { "id": "Amber", "type": "pie", "color": CARROT_COLOR }, {
                "id": "Green",
                "type": "pie",
                "color": GREEN_COLOR
            }
        ];

        $scope.formatDonut = function(value, ratio, id) {
            return d3.format()(value);
        };


        $scope.initializeChartForMainDashboard = function() {

            //Sterling - MainDashboard
            var storeData = google.visualization.arrayToDataTable([
                ['', ''], //required
                ['Up', $scope.storeUpStatus],
                ['Warning', $scope.storeWarnStatus],
                ['Down', $scope.storeDownStatus]
            ]);

            var storeOptions = {
                title: '',
                pieHole: 0.5,
                pieSliceTextStyle: {
                    color: BLACK_COLOR,
                },
                'backgroundColor': 'transparent',

                slices: {
                    0: {
                        color: GREEN_COLOR
                    },
                    1: {
                        color: CARROT_COLOR
                    },
                    2: {
                        color: RED_COLOR
                    }
                },
                fill: 'transparent',
                legend: 'none',
                is3D: false,
                // width: 600,
                // height: 300,
                pieSliceText: 'value'
            };


            var storeChart = new google.visualization.PieChart(document.getElementById('donutchartForStoreMainDash'));
            storeChart.draw(storeData, storeOptions);
            //Sterling

            //COM
            var comData = google.visualization.arrayToDataTable([
                ['', ''],
                ['Up', $scope.comUpStatus],
                ['Warning', $scope.comWarnStatus],
                ['Down', $scope.comDownStatus]
            ]);

            var comOptions = {
                title: '',
                pieHole: 0.5,
                pieSliceTextStyle: {
                    color: BLACK_COLOR,
                },
                'backgroundColor': 'transparent',

                slices: {
                    0: {
                        color: GREEN_COLOR
                    },
                    1: {
                        color: CARROT_COLOR
                    },
                    2: {
                        color: RED_COLOR
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
                ['Up', $scope.dbUpStatus],
                ['Warning', $scope.dbWarnStatus],
                ['Down', $scope.dbDownStatus]
            ]);

            var dbOptions = {
                title: '',
                pieHole: 0.5,
                pieSliceTextStyle: {
                    color: BLACK_COLOR,
                },
                'backgroundColor': 'transparent',

                slices: {
                    0: {
                        color: GREEN_COLOR
                    },
                    1: {
                        color: CARROT_COLOR
                    },
                    2: {
                        color: RED_COLOR
                    }
                },
                // fill: 'transparent',
                legend: 'none'
            };

            var dbChart = new google.visualization.PieChart(document.getElementById('donutchartForDBMainDash'));
            dbChart.draw(dbData, dbOptions);
            //DB

            //MQ
            var mqData = google.visualization.arrayToDataTable([
                ['', ''],
                ['Up', $scope.mqUpStatus],
                ['Warning', $scope.mqDownStatus],
                ['Down', $scope.mqWarnStatus]
            ]);

            var mqOptions = {
                title: '',
                pieHole: 0.5,
                pieSliceTextStyle: {
                    color: BLACK_COLOR,
                },
                'backgroundColor': 'transparent',

                slices: {
                    0: {
                        color: GREEN_COLOR
                    },
                    1: {
                        color: CARROT_COLOR
                    },
                    2: {
                        color: RED_COLOR
                    }
                },
                fill: 'transparent',
                legend: 'none'
            };

            var mqChart = new google.visualization.PieChart(document.getElementById('donutchartForMQMainDash'));
            mqChart.draw(mqData, mqOptions);
            //MQ            
        };



        angular.element(window).on('resize', function() {
            angular.element(document.querySelectorAll(".chartcontainer")).css('display', 'block');
        });

        // fetch().then(function(data) {
        //     $scope.serviceDetails = data;
        //     console.log($scope.serviceDetails);
        //     formatDetails(data);
        // }, function(error) {
        //     $scope.errorDetails = error;
        //     console.log($scope.errorDetails);
        // });

        $http.get('mock/services.json').success(function(data) {
            console.log(data);
            $scope.initializeSterlingMainDash();
            initValues();

            formatDetails(data);
            //call this after getting the service response
            $scope.initializeChartForMainDashboard();
        });

        $scope.openComponent = function(item) {
            $scope.showItem = item;
            $scope.tabItem = item;
            setTimeout(function() {
                if (document.createEvent) { // W3C
                    var ev = document.createEvent('Event');
                    ev.initEvent('resize', true, true);
                    window.dispatchEvent(ev);
                } else { // IE
                    element = document.documentElement;
                    var event = document.createEventObject();
                    element.fireEvent("onresize", event);
                }
            }, 50);
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

        function fetch() {
            var deferred = $q.defer();
            $http.get("http://localhost:12030/dashboard-rest/rest/data/getData?callback=121212", { timeout: 240000 })
                .then(function successCallback(response) {
                    deferred.resolve(response);
                }, function errorCallback(response) {
                    deferred.reject(response);
                });
            return deferred.promise;
        }

        function formatDetails(restApiData) {
            if (!restApiData.data) {
                return null;
            }
            var messagingInfo = restApiData.data[0];
            var storesInfo = restApiData.data[1];
            var comInfo = restApiData.data[2];
            var dbInfo = restApiData.data[3];

            if (messagingInfo.messagingQueue) {
                if (messagingInfo.messagingQueue.overallStatus == RED) {
                    $scope.mqDownStatus = 1;
                } else if (messagingInfo.messagingQueue.overallStatus == AMBER) {
                    $scope.mqWarnStatus = 1;
                } else {
                    $scope.mqUpStatus = 1;
                }
            }

            if (storesInfo.stores) {
                if (storesInfo.stores.overallStatus == RED) {
                    $scope.storeDownStatus = 1;
                } else if (storesInfo.stores.overallStatus == AMBER) {
                    $scope.storeWarnStatus = 1;
                } else {
                    $scope.storeUpStatus = 1;
                }

                /* Local Store calculation */
                var localStrCount = storesInfo.stores.components[1].localStores.storeCount;
                var localStrColor = storesInfo.stores.components[1].localStores.status;
                var localStoreGreen, localStoreAmber, localStoreRed = 0;
                if (localStrColor == GREEN) {
                    localStoreGreen = localStrCount;
                } else if (localStrColor == AMBER) {
                    localStoreAmber = localStrCount;
                } else {
                    localStoreRed = localStrCount;
                }
                $scope.localStoreDonutsPts = [{ "Green": localStoreGreen, "Amber": localStoreAmber, "Red": localStoreRed }];

                /* Unsynced delta's*/
                var unSyncDeltaCount = storesInfo.stores.components[0].unSyncDeltas.messageQueueCount;
                var unSyncDeltaColor = storesInfo.stores.components[0].unSyncDeltas.status;
                var unSyncDeltaGreen, unSyncDeltaAmber, unSyncDeltaRed = 0;
                if (unSyncDeltaColor == GREEN) {
                    unSyncDeltaGreen = unSyncDeltaCount;
                } else if (unSyncDeltaColor == AMBER) {
                    unSyncDeltaAmber = unSyncDeltaCount;
                } else {
                    unSyncDeltaRed = unSyncDeltaCount;
                }
                $scope.unSyncDeltaDonutsPts = [{ "Green": unSyncDeltaGreen, "Amber": unSyncDeltaAmber, "Red": unSyncDeltaRed }];
            }

            if (comInfo.COM) {
                if (comInfo.COM.overallStatus == RED) {
                    $scope.comDownStatus = 1;
                } else if (comInfo.COM.overallStatus == AMBER) {
                    $scope.comWarnStatus = 1;
                } else {
                    $scope.comUpStatus = 1;
                }
            }

            if (dbInfo.DB) {
                if (dbInfo.DB.overallStatus == RED) {
                    $scope.dbDownStatus = 1;
                } else if (dbInfo.DB.overallStatus == AMBER) {
                    $scope.dbWarnStatus = 1;
                } else {
                    $scope.dbUpStatus = 1;
                }
            }





        }

    });
