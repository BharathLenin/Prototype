'use strict';

google.load('visualization', '1', {
  packages: ['corechart']
});

google.setOnLoadCallback(function() {
  //angular.bootstrap(document.body, ['myApp']);
});

angular.module('myApp', [
	'c3',
	'gridshore.c3js.chart',
	//'chart.js',
    'myApp.controllers'
])