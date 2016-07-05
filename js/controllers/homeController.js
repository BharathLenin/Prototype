angular.module('myApp.controllers', [])
.directive('loading', function () {
      return {
        restrict: 'E',
        replace:true,
        template: '<div class="loading"><img src="https://lh3.googleusercontent.com/-w-BTWObAuOk/V3aCcE7qqYI/AAAAAAAAOEM/w_0xxNvv0BASTvi8aL86hWkvoEpnPxIMACCo/s162/ripple%2B%25282%2529.gif" width="162px" height="162px" /></div>',
        link: function (scope, element, attr) {
              scope.$watch('loading', function (val) {
             
                  if(val)
                  {
                      $(element).fadeIn('slow');
                  }
                  else
                  {
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
        const SUN_COLOR='#F1C40F';
        const V_COLOR='#8E44AD';
        const RIVER_COLOR='#3498DB';
        const SEA_COLOR='#16A085';
        const SILVER_COLOR='#BDC3C7';

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

        $scope.pieColumns = [
        { "id": "Red", "type": "pie", "color": RED_COLOR },
            { "id": "Amber", "type": "pie", "color": CARROT_COLOR }, 
            {
                "id": "Green",
                "type": "pie",
                "color": GREEN_COLOR
            }
        ];

          $scope.unpieColumns = [
        { "id": "E", "type": "pie", "color": RED_COLOR },
            { "id": "F", "type": "pie", "color": CARROT_COLOR }, 
            {
                "id": "N",
                "type": "pie",
                "color": GREEN_COLOR
            },
            {
                "id": "P",
                "type": "pie",
                "color": SUN_COLOR
            },
            {
                "id": "A",
                "type": "pie",
                "color": SEA_COLOR
            },
             {
                "id": "L",
                "type": "pie",
                "color": RIVER_COLOR
            },
             {
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
var datetime =  currentdate.getHours() + ":"  + currentdate.getMinutes() ;

        $('.countDown_text').html(datetime) ;
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
                    fontSize:18
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
                pieSliceText: 'value',
                //localStrCount
                height:350
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
                    fontSize:18
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
                height:350,
               legend: { position: 'none' },
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
                    fontSize:18
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
                height:350,
               legend: { position: 'none' },
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
                    color: "#ffffff",
                    fontSize:18
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
                height:350,
               legend: { position: 'none' },
            };

            var mqChart = new google.visualization.PieChart(document.getElementById('donutchartForMQMainDash'));
            mqChart.draw(mqData, mqOptions);
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
            $scope.loading = true;
            $http.get("http://localhost:12030/dashboard-rest/rest/data/getData?callback=121212", { timeout: 240000 })
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
            } else {
                if (!restApiData.data) {
                    return null;
                }
                var messagingInfo = restApiData.data[0];
                var storesInfo = restApiData.data[1];
                var comInfo = restApiData.data[2];
                var dbInfo = restApiData.data[3];
            }

            if (!restApiData) {
                return null;
            }
            var messagingInfo = restApiData[0];
            var storesInfo = restApiData[1];
            var comInfo = restApiData[2];
            var dbInfo = restApiData[3];

            if (messagingInfo.messagingQueue) {

                if (messagingInfo.messagingQueue.overallStatus == RED) {
                    $scope.mqDownStatus = 1;
                } else if (messagingInfo.messagingQueue.overallStatus == AMBER) {
                    $scope.mqWarnStatus = 1;
                } else {
                    $scope.mqUpStatus = 1;
                    
                }


                /* Sterling Queue Depth */
                var sterlingQueueCount = messagingInfo.messagingQueue.components[1].sterlingDepthQueue.messageQueueCount;
                var sterlingQueuePercent = messagingInfo.messagingQueue.components[1].sterlingDepthQueue.messageQueuePercent;
                var sterlingQueueColor = messagingInfo.messagingQueue.components[1].sterlingDepthQueue.status;

                if (sterlingQueuePercent == 0) {
                    sterlingQueuePercent = 1; //100
                }

                var sterlingQueueGreen = 0,
                    sterlingQueueAmber = 0,
                    sterlingQueueRed = 0;
                if (sterlingQueueColor == GREEN) {
                    sterlingQueueGreen = sterlingQueuePercent;
                } else if (sterlingQueueColor == AMBER) {
                    sterlingQueueAmber = sterlingQueuePercent;
                } else {
                    sterlingQueueRed = sterlingQueuePercent;
                }
                $scope.sterlingQueueDonutsPts = [{ "Green": sterlingQueueGreen, "Amber": sterlingQueueAmber, "Red": sterlingQueueRed }];

                /* COM Queue Depth */
                var comQueueCount = messagingInfo.messagingQueue.components[0].comDepthQueue.messageQueueCount;
                var comQueuePercent = messagingInfo.messagingQueue.components[0].comDepthQueue.messageQueuePercent;
                var comQueueColor = messagingInfo.messagingQueue.components[0].comDepthQueue.status;

                var comQueueGreen = 0,
                    comQueueAmber = 0,
                    comQueueRed = 0;
                if (comQueueColor == GREEN) {
                    comQueueGreen = comQueuePercent;
                } else if (comQueueColor == AMBER) {
                    comQueueAmber = comQueuePercent;
                } else {
                    comQueueRed = comQueuePercent;
                }
                $scope.comQueueDonutsPts = [{ "Green": comQueueGreen, "Amber": comQueueAmber, "Red": comQueueRed }];


                /* Transmit Queue */
                var transmitQueueCount = messagingInfo.messagingQueue.components[2].transmitQueue.messageQueueCount;
                var transmitQueuePercent = messagingInfo.messagingQueue.components[2].transmitQueue.messageQueuePercent;
                var transmitQueueColor = messagingInfo.messagingQueue.components[2].transmitQueue.status;
                var transmitQueue_GuageColor = GREEN_COLOR;

                if (transmitQueueColor == GREEN) {
                    transmitQueue_GuageColor = GREEN_COLOR;
                } else if (transmitQueueColor == AMBER) {
                    transmitQueue_GuageColor = CARROT_COLOR;
                } else {
                    transmitQueue_GuageColor = RED_COLOR;
                }

                $scope.transmitGaugeColumn = [{ "id": "Transmit Queue", "type": "gauge", "color": transmitQueue_GuageColor }];
                $scope.transmitGaugePts = [{ "Transmit Queue": transmitQueueCount }];
            }
             /* Local Store calculation */
                var localStrCount = storesInfo.stores.components[1].localStores.storeCount;

            /* STORES */
            if (storesInfo.stores) {
                if (storesInfo.stores.overallStatus == RED) {
                   // $scope.storeDownStatus = 1;
                    $scope.storeDownStatus = localStrCount;
                } else if (storesInfo.stores.overallStatus == AMBER) {
                   //$scope.storeWarnStatus = 1;
                   
                     $scope.storeWarnStatus=localStrCount;
                } else {

                   // $scope.storeUpStatus = 1;
                     $scope.storeUpStatus = localStrCount;
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
                $scope.localStoreDonutsPts = [{ "Green": localStoreGreen, "Amber": localStoreAmber, "Red": localStoreRed }];

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
               
                $scope.unSyncDeltaDonutsPts = [{ "E": unSyncDeltaCountPerState.E, 
                "F": unSyncDeltaCountPerState.F, "P": unSyncDeltaCountPerState.P,
                "A": unSyncDeltaCountPerState.A,"L": unSyncDeltaCountPerState.L,
                "M": unSyncDeltaCountPerState.M,"N" : unSyncDeltaCountPerState.N, "X" : unSyncDeltaCountPerState.X }];
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
                } else if (comOrderColor == AMBER) {
                    comOrderAmber = comOrderCount;
                } else {
                    comOrderRed = comOrderCount;
                }
                $scope.comOrderDonutsPts = [{ "Green": comOrderGreen, "Amber": comOrderAmber, "Red": comOrderRed }];

                /* COM INVENTORY JVM */
                var comInventoryCount = comInfo.COM.components[1].comInventory.serverCount;
                var comInventoryColor = comInfo.COM.components[1].comInventory.status;
                var comInventoryGreen = 0,
                    comInventoryAmber = 0,
                    comInventoryRed = 0;
                if (comInventoryColor == GREEN) {
                    comInventoryGreen = comInventoryCount;
                } else if (comOrderColor == AMBER) {
                    comInventoryAmber = comInventoryCount;
                } else {
                    comInventoryRed = comInventoryCount;
                }
                $scope.comInventoryDonutsPts = [{ "Green": comInventoryGreen, "Amber": comInventoryAmber, "Red": comInventoryRed }];

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
                //var sterlingDbColor = dbInfo.DB.components[0].sterlingDB.status;
               var sterlingDbCount=9;
               var sterlingDbColor='green';
                var sterlingDbGreen = 0,
                    sterlingDbAmber = 0,
                    sterlingDbRed = 0;
                if (sterlingDbColor == GREEN) {
                    sterlingDbGreen = sterlingDbCount;
                } else if (comOrderColor == AMBER) {
                    sterlingDbAmber = sterlingDbCount;
                } else {
                    sterlingDbRed = sterlingDbCount;
                }
                $scope.sterlingDbDonutsPts = [{ "Green": sterlingDbGreen, "Amber": sterlingDbAmber, "Red": sterlingDbRed }];

                /* ODS DB */
               // var odsDbCount = dbInfo.DB.components[0].odsDatabase.serverCount;
                //var odsDbColor = dbInfo.DB.components[0].odsDatabase.status;
                 var odsDbCount = 9;
                var odsDbColor = 'green';
                var odsDbGreen = 0,
                    odsDbAmber = 0,
                    odsDbRed = 0;
                if (odsDbColor == GREEN) {
                    odsDbGreen = odsDbCount;
                } else if (odsDbColor == AMBER) {
                    odsDbAmber = odsDbCount;
                } else {
                    odsDbRed = odsDbCount;
                }
                $scope.odsDbDonutsPts = [{ "Green": odsDbGreen, "Amber": odsDbAmber, "Red": odsDbRed }];


                /* GG REPLICATION */
               // var ggReplicaCount = dbInfo.DB.components[2].ggReplication.replicaTime;
               // var ggReplicaColor = dbInfo.DB.components[2].ggReplication.status;

                  var ggReplicaCount = 4;
                var ggReplicaColor ='green';
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
