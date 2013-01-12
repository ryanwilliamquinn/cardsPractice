'use strict';


// Declare app level module which depends on filters, and services
angular.module('cardsApp', ['myApp.filters', 'myApp.services', 'myApp.directives']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: MyCtrl1});
    $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: MyCtrl2});
    $routeProvider.when('/frame', {templateUrl: 'partials/frame.html', controller: FrameCtrl});
    $routeProvider.otherwise({redirectTo: '/view1'});
  }]);
