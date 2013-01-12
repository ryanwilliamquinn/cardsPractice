'use strict';

/* Directives */


var myApp = angular.module('myApp.directives', []);

myApp.directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);

myApp.directive('otherVersion',function() {
    return function(scope, elm, attrs) {
        elm.text("RYAN");
    };
});