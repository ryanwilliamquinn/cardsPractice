'use strict';

/* Controllers */


function MyCtrl1() {}
MyCtrl1.$inject = [];


function MyCtrl2() {
}
MyCtrl2.$inject = [];

function FrameCtrl($scope, $http, randomRankService, randomSuitService) {
    $scope.rank1 = "A";
    $scope.rank2 = "2";
    $scope.suit1 = "hearts";
    $scope.suit2 = "spades";
    $scope.loadTime; // when the cards were displayed to you
    $scope.respondTime; // when you claimed mastery of them

    $scope.refreshCards = function () {
      $scope.rank1 = randomRankService.getRank();
      $scope.rank2 = randomRankService.getRank();
      $scope.suit1 = randomSuitService.getSuit();
      $scope.suit2 = randomSuitService.getSuit();
      $scope.loadTime = Date.now();
    }

    $scope.refreshCards();

    $scope.responded = function() {
        $scope.refreshCards();
        $scope.$apply();
    }

    //listen for clicks, mofo!

    $(document).click(function(event) {
        $scope.sendResults();
        $scope.responded();
    });


    $scope.sendResults = function() {
      //console.log("load time: " + $scope.loadTime);
      $scope.respondTime = Date.now();
      var diff = $scope.respondTime - $scope.loadTime;
      //console.log("respond time: " + $scope.respondTime);
      //console.log("diff: " + ($scope.respondTime - $scope.loadTime));
      $http.post("/timestamp", {time : diff}).
          success(function(data) {
              console.log("success");
              console.log(data);
          }).
          error(function(data) {
              console.log("fail!");
              console.log(data);
          })
    }



}
FrameCtrl.$inject = ['$scope', '$http', "randomRankService", "randomSuitService"];

