angular.module('myApp.controllers', [])
    .directive('loading', function() {
        return {
            restrict: 'E',
            replace: true,
            template: '<div class="loading"><img src="https://lh3.googleusercontent.com/-w-BTWObAuOk/V3aCcE7qqYI/AAAAAAAAOEM/w_0xxNvv0BASTvi8aL86hWkvoEpnPxIMACCo/s162/ripple%2B%25282%2529.gif" width="162px" height="162px" /></div>',
            link: function(scope, element, attr) {
                scope.$watch('loading', function(val) {

                    if (val) {
                        $(element).fadeIn('slow');
                    } else {
                        $(element).fadeOut('slow');
                    }
                });
            }
        }
    })
    .controller('homeController', function($scope, $rootScope, $http, $q, $timeout) {

        //Constants
        const RED = "red";
        const AMBER = "amber";
        const GREEN = "green";

        const RED_COLOR = '#e74c3c';
        const GREEN_COLOR = '#58d68d';
        const CARROT_COLOR = '#e67e22';
        const BLACK_COLOR = '#000';
        const SUN_COLOR = '#F1C40F';
        const V_COLOR = '#8E44AD';
        const RIVER_COLOR = '#3498DB';
        const SEA_COLOR = '#16A085';
        const SILVER_COLOR = '#BDC3C7';

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

        $scope.donutColumnsLocal = [{ "id": "Local", "type": "donut", "color": RED_COLOR }, {
            "id": "Online",
            "type": "donut",
            "color": GREEN_COLOR
        }];

        $scope.pieColumns = [
            { "id": "Red", "type": "pie", "color": RED_COLOR },
            { "id": "Amber", "type": "pie", "color": CARROT_COLOR }, {
                "id": "Green",
                "type": "pie",
                "color": GREEN_COLOR
            }
        ];

        $scope.unpieColumns = [
            { "id": "E", "type": "pie", "color": RED_COLOR },
            { "id": "F", "type": "pie", "color": CARROT_COLOR }, {
                "id": "N",
                "type": "pie",
                "color": GREEN_COLOR
            }, {
                "id": "P",
                "type": "pie",
                "color": SUN_COLOR
            }, {
                "id": "A",
                "type": "pie",
                "color": SEA_COLOR
            }, {
                "id": "L",
                "type": "pie",
                "color": RIVER_COLOR
            }, {
                "id": "M",
                "type": "pie",
                "color": V_COLOR
            },

            {
                "id": "X",
                "type": "pie",
                "color": SILVER_COLOR
            }
        ];

        $scope.formatDonut = function(value, ratio, id) {
            return d3.format()(value);
        };


        /* TIMER FUNCTION */
        var countDowner, countDown = 300;
        countDowner = function() {


            // $scope.countDown_text=datetime
            /*
            if (countDown < 0) {
                $("#warning").fadeOut(2000);
                countDown = 0;
                return; // quit
            } else {
                $scope.countDown_text = countDown; // update scope
                countDown--; // -1
                $timeout(countDowner, 1000); // loop it again
            }
            */
        };
        var currentdate = new Date();

        var hours=currentdate.getHours();
var mid='AM';
if(hours==0){ //At 00 hours we need to show 12 am
hours=12;
}
else if(hours>12)
{
hours=hours%12;
mid='PM';
}

        var datetime = currentdate.getHours() + ":" + currentdate.getMinutes() +" "+ mid;




       // $('.countDown_text').html(datetime);
        //countDowner()

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
                    color: "#ffffff",
                    fontSize: 18
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

                chartArea: {
                    left: 5,
                    top: 5,
                    width: '130%',
                    height: '65%'
                },
                fill: 'transparent',
                legend: { position: 'none' },


                is3D: false,
                // width: 600,
                // height: 300,
               pieSliceText: 'label',
                //localStrCount
                height: 350
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
                    color: "#ffffff",
                    fontSize: 18
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
                chartArea: {
                    left: 5,
                    top: 5,
                    width: '130%',
                    height: '65%'
                },
                fill: 'transparent',
                height: 350,
                legend: { position: 'none' },
                pieSliceText: 'label'
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
                    color: "#ffffff",
                    fontSize: 18
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
                chartArea: {
                    left: 5,
                    top: 5,
                    width: '130%',
                    height: '65%'
                },
                height: 350,
                legend: { position: 'none' },
            };


                


          //  var dbChart = new google.visualization.PieChart(document.getElementById('donutchartForDBMainDash'));
          $("#donutchartForDBMainDash").html('<i class="fa fa-10x fa-database" aria-hidden="true" id="dbChart"></i>');
            //dbChart.draw(dbData, dbOptions);
                if($scope.dbUpStatus)
                $("#dbChart").addClass("GREEN_COLOR");
                else if($scope.dbWarnStatus)
                $("#dbChart").addClass("CARROT_COLOR");
                else if($scope.dbDownStatus)
                $("#dbChart").addClass("RED_COLOR");
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
                    color: "#ffffff",
                    fontSize: 18
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
                chartArea: {
                    left: 5,
                    top: 5,
                    width: '130%',
                    height: '65%'
                },
                fill: 'transparent',
                height: 350,
                legend: { position: 'none' },
            };

            //var mqChart = new google.visualization.PieChart(document.getElementById('donutchartForMQMainDash'));
            //mqChart.draw(mqData, mqOptions);

            $("#donutchartForMQMainDash").html('<i class="fa fa-10x fa-list-alt" aria-hidden="true" id="mqChart"></i>');
            //dbChart.draw(dbData, dbOptions);
                if($scope.mqUpStatus)
                $("#mqChart").addClass("GREEN_COLOR");
                else if($scope.mqWarnStatus)
                $("#mqChart").addClass("CARROT_COLOR");
                else if($scope.mqDownStatus)
                $("#mqChart").addClass("RED_COLOR");


            //MQ
        };



        angular.element(window).on('resize', function() {
            angular.element(document.querySelectorAll(".chartcontainer")).css('display', 'block');
        });

        $scope.mockDB = 1;

        if ($scope.mockDB) {
            $scope.loading = true;

            $http.get('mock/data.json').success(function(data) {
                console.log(data);
                $scope.loading = false;
                $scope.initializeSterlingMainDash();
                initValues();

                formatDetails(data);
                //call this after getting the service response
                $scope.initializeChartForMainDashboard();
            });
        } else {
            fetch().then(function(data) {
                console.log(data);
                $scope.initializeSterlingMainDash();
                initValues();
                formatDetails(data);
                //call this after getting the service response
                $scope.initializeChartForMainDashboard();
            }, function(error) {
                $scope.errorDetails = error;
                console.log($scope.errorDetails);
            });
        }



        // $http.get('mock/services.json').success(function(data) {
        //     console.log(data);
        //     $scope.initializeSterlingMainDash();
        //     initValues();

        //     formatDetails(data);
        //     //call this after getting the service response
        //     $scope.initializeChartForMainDashboard();
        // });

        $scope.openComponent = function(item) {
            $scope.showItem = item;
            $scope.tabItem = item;
            setTimeout(function() {
                 $(window).trigger('resize');
                if (document.createEvent) { // W3C
                    var ev = document.createEvent('Event');
                    ev.initEvent('resize', true, true);
                    window.dispatchEvent(ev);
                } else { // IE
                    element = document.documentElement;
                    var event = document.createEventObject();
                    element.fireEvent("onresize", event);
                }
            }, 10);
            
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
            $scope.loading = true;
            // $http.get("http://localhost:12030/dashboard-rest/rest/data/getData?callback=121212", { timeout: 240000 })
            $http.get("http://c9100970e5ef9bf:8085/dashboard-rest/rest/data/getData", { timeout: 240000 })
                .then(function successCallback(response) {
                    $scope.loading = false;
                    deferred.resolve(response);
                }, function errorCallback(response) {
                    deferred.reject(response);
                });
            return deferred.promise;
        }


        function formatDetails(restApiData) {
            if ($scope.mockDB) {
                if (!restApiData) {
                    return null;
                }
                var messagingInfo = restApiData[0];
                var storesInfo = restApiData[1];
                var comInfo = restApiData[2];
                var dbInfo = restApiData[3];
                var sterlingInfo = restApiData[4];

            } else {
                if (!restApiData.data) {
                    return null;
                }
                var messagingInfo = restApiData.data[0];
                var storesInfo = restApiData.data[1];
                var comInfo = restApiData.data[2];
                var dbInfo = restApiData.data[3];
                var sterlingInfo = restApiData.data[4];
            }


            if (sterlingInfo.sterling) {

                /*if (sterlingInfo.sterling.components[0].connectionCount.status == RED) {
                    $scope.mqDownStatus = 1;
                } else if (sterlingInfo.sterling.components[0].connectionCount.status == AMBER) {
                    $scope.mqWarnStatus = 1;
                } else {
                    $scope.mqUpStatus = 1;
                }*/

                /*$scope.sterlingConnectionCountHealthStatus = 'Warning';
                $scope.sterlingProbeHealthStatus = 'Warning';
                $scope.sterlingSpaceHealthStatus = 'Healthy';
                $scope.sterlingAgentHealthStatus = 'Critical';*/

                /* Sterling Queue Depth */

                var connectionCount = sterlingInfo.sterling.components[0].connectionCount;
                var connectionCountGreen = connectionCount[0].serverCount;
                var connectionCountAmber = connectionCount[1].serverCount;
                var connectionCountRed = connectionCount[2].serverCount;

                $scope.connectionCountDonutsPts = [{
                    "Count < 80": connectionCountGreen,
                    "80 < Count < 120": connectionCountAmber,
                    "Count > 120": connectionCountRed
                }];

                $scope.connectionCountDonutColumns = [{ "id": "Count < 80", "type": "donut", "color": GREEN_COLOR },
                    { "id": "80 < Count < 120", "type": "donut", "color": CARROT_COLOR },
                    { "id": "Count > 120", "type": "donut", "color": RED_COLOR }
                ];

                /* Probe Failure*/
                var probeFailureCount = sterlingInfo.sterling.components[1].probefailure;
                var probeFailureCountGreen = probeFailureCount[0].serverCount;
                var probeFailureCountRed = probeFailureCount[1].serverCount;

                $scope.probeFailureCountDonutsPts = [{
                    "Count < 0": probeFailureCountGreen,
                    "Count > 0": probeFailureCountRed
                }];

                $scope.probeFailureCountDonutColumns = [{ "id": "Count < 0", "type": "donut", "color": GREEN_COLOR },
                    { "id": "Count > 0", "type": "donut", "color": RED_COLOR }
                ];
            }



            /* MQ component*/
            if (messagingInfo.messagingQueue) {

                if (messagingInfo.messagingQueue.overallStatus == RED) {
                    $scope.mqDownStatus = 1;
                } else if (messagingInfo.messagingQueue.overallStatus == AMBER) {
                    $scope.mqWarnStatus = 1;
                } else {
                    $scope.mqUpStatus = 1;
                }

                /* Sterling Queue Depth */
                $scope.sterlingQueueCount = messagingInfo.messagingQueue.components[1].sterlingDepthQueue.messageQueueCount;
                var sterlingQueueAmberCount = messagingInfo.messagingQueue.components[1].sterlingDepthQueue.amberlist.length;
                var sterlingQueueRedCount = messagingInfo.messagingQueue.components[1].sterlingDepthQueue.redlist.length;
                var sterlingQueueGreenCount = $scope.sterlingQueueCount - (sterlingQueueAmberCount + sterlingQueueRedCount);

                $scope.sterlingQueueDonutsPts = [{
                    "Depth < 10%": sterlingQueueGreenCount,
                    "10% < Depth < 25%": sterlingQueueAmberCount,
                    "Depth > 25%": sterlingQueueRedCount
                }];

                $scope.sterlingPieColumns = [{ "id": "Depth < 10%", "type": "pie", "color": GREEN_COLOR },
                    { "id": "10% < Depth < 25%", "type": "pie", "color": CARROT_COLOR },
                    { "id": "Depth > 25%", "type": "pie", "color": RED_COLOR }
                ];


                /* COM Queue Depth */
                $scope.comQueueCount = messagingInfo.messagingQueue.components[0].comDepthQueue.messageQueueCount;
                var comQueueAmberCount = messagingInfo.messagingQueue.components[0].comDepthQueue.amberlist.length;
                var comQueueRedCount = messagingInfo.messagingQueue.components[0].comDepthQueue.redlist.length;
                var comQueueGreenCount = $scope.comQueueCount - (comQueueAmberCount + comQueueRedCount);

                $scope.comQueueDonutsPts = [{ "Depth < 10%": comQueueGreenCount, "10% < Depth < 25%": comQueueAmberCount, "Depth > 25%": comQueueRedCount }];

                $scope.comQueuePieColumns = [{ "id": "Depth < 10%", "type": "pie", "color": GREEN_COLOR },
                    { "id": "10% < Depth < 25%", "type": "pie", "color": CARROT_COLOR },
                    { "id": "Depth > 25%", "type": "pie", "color": RED_COLOR }
                ];



                /* Transmit Queue */
                $scope.transmitQueueCount = messagingInfo.messagingQueue.components[2].transmitQueue.messageQueueCount;
                var transmitQueuePercent = messagingInfo.messagingQueue.components[2].transmitQueue.messageQueuePercent;
                var transmitQueueColor = messagingInfo.messagingQueue.components[2].transmitQueue.status;
                $scope.transmitQueueDepth = messagingInfo.messagingQueue.components[2].transmitQueue.currTxQDepth;
                var transmitQueue_GuageColor = GREEN_COLOR;

                if (transmitQueueColor == GREEN) {
                    transmitQueue_GuageColor = GREEN_COLOR;
                } else if (transmitQueueColor == AMBER) {
                    transmitQueue_GuageColor = CARROT_COLOR;
                } else {
                    transmitQueue_GuageColor = RED_COLOR;
                }

                $scope.transmitGaugeColumn = [{ "id": "Transmit Queue", "type": "gauge", "color": transmitQueue_GuageColor }];
                $scope.transmitGaugePts = [{ "Transmit Queue": $scope.transmitQueueDepth }];
            }
            /* Local Store calculation */
            var localStrCount = storesInfo.stores.components[1].localStores.storeCount;
            var localStrCountFinal = 1980 - localStrCount;


            /* STORES */
            if (storesInfo.stores) {
                if (storesInfo.stores.overallStatus == RED) {
                    // $scope.storeDownStatus = 1;
                    $scope.storeDownStatus = localStrCountFinal;
                } else if (storesInfo.stores.overallStatus == AMBER) {
                    //$scope.storeWarnStatus = 1;

                    $scope.storeWarnStatus = localStrCountFinal;
                } else {

                    // $scope.storeUpStatus = 1;
                    $scope.storeUpStatus = localStrCountFinal;
                }

                var localStrColor = storesInfo.stores.components[1].localStores.status;

                var localStoreGreen, localStoreAmber, localStoreRed = 0;
                if (localStrCount == 0) {
                    $scope.formatLocalStore = function(value, ratio, id) {
                        return d3.format()(value);
                    };
                    localStrCount = 1;
                }
                $scope.formatLocalStore = function(value, ratio, id) {
                    return null;
                };

                if (localStrColor == GREEN) {
                    localStoreGreen = localStrCount;
                } else if (localStrColor == AMBER) {
                    localStoreAmber = localStrCount;
                } else {
                    localStoreRed = localStrCount;
                }

                localStoreGreen = localStrCountFinal;
                $scope.localStoreDonutsPts = [{ "Online": localStoreGreen, "Local": localStoreAmber }];

                /* Unsynced delta's*/
                var unSyncDeltaCount = storesInfo.stores.components[0].unSyncDeltas.messageQueueCount;
                var unSyncDeltaColor = storesInfo.stores.components[0].unSyncDeltas.status;

                var unSyncDeltaCountPerState = storesInfo.stores.components[0].unSyncDeltas.deltaCountPerState;


                var unSyncDeltaGreen, unSyncDeltaAmber, unSyncDeltaRed = 0;
                if (unSyncDeltaColor == GREEN) {
                    unSyncDeltaGreen = unSyncDeltaCount;
                } else if (unSyncDeltaColor == AMBER) {
                    unSyncDeltaAmber = unSyncDeltaCount;
                } else {
                    unSyncDeltaRed = unSyncDeltaCount;
                }

                //$scope.unSyncDeltaDonutsPts = [{ "Green": unSyncDeltaGreen, "Amber": unSyncDeltaAmber, "Red": unSyncDeltaRed }];

                $scope.unSyncDeltaDonutsPts = [{
                    "E": unSyncDeltaCountPerState.E,
                    "F": unSyncDeltaCountPerState.F,
                    "P": unSyncDeltaCountPerState.P,
                    "A": unSyncDeltaCountPerState.A,
                    "L": unSyncDeltaCountPerState.L,
                    "M": unSyncDeltaCountPerState.M,
                    "N": unSyncDeltaCountPerState.N,
                    "X": unSyncDeltaCountPerState.X
                }];
            }

            /* COM */
            if (comInfo.COM) {
                if (comInfo.COM.overallStatus == RED) {
                    $scope.comDownStatus = 1;
                } else if (comInfo.COM.overallStatus == AMBER) {
                    $scope.comWarnStatus = 1;
                } else {
                    $scope.comUpStatus = 1;
                }


                /* COM ORDER JVM */
                var comOrderCount = comInfo.COM.components[0].comOrder.serverCount;
                var comOrderColor = comInfo.COM.components[0].comOrder.status;
                var comOrderGreen = 0,
                    comOrderAmber = 0,
                    comOrderRed = 0;
                if (comOrderColor == GREEN) {
                    comOrderGreen = comOrderCount;
                } else {
                    comOrderRed = comOrderCount;
                }
                $scope.comOrderDonutsPts = [{ "Up": comOrderGreen, "Down": comOrderRed }];
                $scope.comOrderDonutColumns = [{ "id": "Up", "type": "donut", "color": GREEN_COLOR },
                    { "id": "Down", "type": "donut", "color": RED_COLOR }
                ];

                /* COM INVENTORY JVM */
                var comInventoryCount = comInfo.COM.components[1].comInventory.serverCount;
                var comInventoryColor = comInfo.COM.components[1].comInventory.status;
                var comInventoryGreen = 0,
                    comInventoryRed = 0;
                if (comInventoryColor == GREEN) {
                    comInventoryGreen = comInventoryCount;
                } else if (comOrderColor == AMBER) {
                    comInventoryAmber = comInventoryCount;
                } else {
                    comInventoryRed = comInventoryCount;
                }
                $scope.comInventoryDonutsPts = [{ "Up": comInventoryGreen, "Down": comInventoryRed }];
                $scope.comInventoryDonutColumns = [{ "id": "Up", "type": "donut", "color": GREEN_COLOR },
                    { "id": "Down", "type": "donut", "color": RED_COLOR }
                ];

                /* BATCH SESSION */
                var batchSessionCount = comInfo.COM.components[2].batchSession.count;
                var batchSessionColor = comInfo.COM.components[2].batchSession.status;
                var batchSession_GuageColor = GREEN_COLOR;

                if (batchSessionColor == GREEN) {
                    batchSession_GuageColor = GREEN_COLOR;
                } else if (batchSessionColor == AMBER) {
                    batchSession_GuageColor = CARROT_COLOR;
                } else {
                    batchSession_GuageColor = RED_COLOR;
                }

                $scope.batchSessionGaugeColumn = [{ "id": "Batch Session", "type": "gauge", "color": batchSession_GuageColor }];
                $scope.batchSessionGaugePts = [{ "Batch Session": batchSessionCount }];
            }

            /* DB */
            if (dbInfo.DB) {
                if (dbInfo.DB.overallStatus == RED) {
                    $scope.dbDownStatus = 1;
                } else if (dbInfo.DB.overallStatus == AMBER) {
                    $scope.dbWarnStatus = 1;
                } else {
                    $scope.dbUpStatus = 1;
                }

                /* Sterling DB */
                //var sterlingDbCount = dbInfo.DB.components[0].sterlingDB.serverCount;
                var sterlingDbColor = dbInfo.DB.components[1].sterlingDB.status;
                var sterlingDbCount = 1;

                var design, design2=0;


                var sterlingDbGreen = 0,
                    sterlingDbAmber = 0,
                    sterlingDbRed = 0;
                if (sterlingDbColor == GREEN) {
                    sterlingDbGreen = sterlingDbCount;

                } else if (comOrderColor == AMBER) {
                    sterlingDbAmber = sterlingDbCount;
                } else {
                    sterlingDbRed = sterlingDbCount;
                    //$("#dbSGreen").hide();
                    $("#dbSRed").show();
                    design = 1;

                    $scope.longSessions = dbInfo.DB.components[1].sterlingDB.components[0].longRunningSessions.sessions;
                    $scope.blockSessions = dbInfo.DB.components[1].sterlingDB.components[1].blockingSessions.sessions;
                }

                $scope.sterlingDbDonutsPts = [{
                    "No Blocking locks, Long running queries": sterlingDbGreen,
                    "Blocking locks, Long running queries": sterlingDbRed
                }];

                $scope.sterlingDbColumns = [{ "id": "No Blocking locks, Long running queries", "type": "pie", "color": GREEN_COLOR },
                    { "id": "Blocking locks, Long running queries", "type": "pie", "color": RED_COLOR }
                ];

                /* ODS DB */
                // var odsDbCount = dbInfo.DB.components[0].odsDatabase.serverCount;
                var odsDbColor = dbInfo.DB.components[2].comDB.status;
                var odsDbCount = 1;

                var odsDbGreen = 0,
                    odsDbAmber = 0,
                    odsDbRed = 0;
                if (odsDbColor == GREEN) {
                    odsDbGreen = odsDbCount;
                } else if (odsDbColor == AMBER) {
                    odsDbAmber = odsDbCount;
                } else {
                    odsDbRed = odsDbCount;
                    //$("#dbCGreen").hide();
                    $("#dbCRed").show();
                    design2=1;
                    $scope.longSessionsCOM = dbInfo.DB.components[2].comDB.components[0].longRunningSessions.sessions;
                }
                // $scope.odsDbDonutsPts = [{ "Green": odsDbGreen, "Amber": odsDbAmber, "Red": odsDbRed }];

                $scope.odsDbDonutsPts = [{
                    "No Blocking locks, Long running queries": odsDbGreen,
                    "Blocking locks, Long running queries": odsDbRed
                }];

                $scope.odsDbColumns = [{ "id": "No Blocking locks, Long running queries", "type": "pie", "color": GREEN_COLOR },
                    { "id": "Blocking locks, Long running queries", "type": "pie", "color": RED_COLOR }
                ];


                if(design2 && design)
                {
                    $("#ggReplication").removeClass("col-xs-6").addClass("col-xs-12");
                }


                /* GG REPLICATION */
                // var ggReplicaCount = dbInfo.DB.components[0].ggReplication.replicaTime;
                // var ggReplicaColor = dbInfo.DB.components[2].ggReplication.status;

                var ggReplicaCount = dbInfo.DB.components[2].comDB.replicaTime;
                var ggReplicaColor = 'green';
                var ggReplica_GuageColor = GREEN_COLOR;
                if (ggReplicaCount == 0) {
                    ggReplicaCount = 1;
                }

                if (ggReplicaColor == GREEN) {
                    ggReplica_GuageColor = GREEN_COLOR;
                } else if (ggReplicaColor == AMBER) {
                    ggReplica_GuageColor = CARROT_COLOR;
                } else {
                    ggReplica_GuageColor = RED_COLOR;
                }

                $scope.ggReplicaGaugeColumn = [{ "id": "GG Replication", "type": "gauge", "color": ggReplica_GuageColor }];
                $scope.ggReplicaGaugePts = [{ "GG Replication": ggReplicaCount }];
            }
        }

    });
