'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
var myApp = angular.module('myApp.services', []);

myApp.value('version', '0.1');

myApp.service('randomNumberService', function() {
  this.getNumber = function(startInclusive, endExclusive) {
    return Math.floor(Math.random() * (endExclusive - startInclusive + 1)) + startInclusive;
  }
});

myApp.service('randomSuitService', ["randomNumberService", function(randomNumberService) {
  this.getSuit = function() {
    var suits = ["clubs", "diamonds", "hearts", "spades"];
    var randomNumber = randomNumberService.getNumber(0,3);
    return suits[randomNumber];
  }
}]);

myApp.service('randomRankService', ["randomNumberService", function(randomNumberService) {
    this.getRank = function() {
        var num = randomNumberService.getNumber(1,13);
        var rank = num;
        switch(num) {
            case 1:
                rank = "A";
                break;
            case 11:
                rank = "J";
                break;
            case 12:
                rank = "Q";
                break;
            case 13:
                rank = "K";
                break;
        }
        return rank;
    }
}]);

myApp.service('viewportSizeService', function() {
    this.getHeightAndWidth = function() {
        var e = window
            , a = 'inner';
        if ( !( 'innerWidth' in window ) ) {
            a = 'client';
            e = document.documentElement || document.body;
        }
        return { width : e[ a+'Width' ] , height : e[ a+'Height' ] }
    }
})
