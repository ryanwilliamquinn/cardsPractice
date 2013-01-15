'use strict';

/* Controllers */


function MyCtrl1() {}
MyCtrl1.$inject = [];


function MyCtrl2() {
}
MyCtrl2.$inject = [];

function FrameCtrl($scope, $http, randomRankService, randomSuitService, viewportSizeService) {
    $scope.rank1 = "A";
    $scope.rank2 = "2";
    $scope.suit1 = "hearts";
    $scope.suit2 = "spades";
    $scope.loadTime; // when the cards were displayed to you
    $scope.respondTime; // when you claimed mastery of them
    $scope.rank1color;
    $scope.rank2color;
    $scope.username;
    $scope.recording = false;

    $scope.refreshCards = function () {
      $scope.rank1 = randomRankService.getRank();
      $scope.rank2 = randomRankService.getRank();
      $scope.suit1 = randomSuitService.getSuit();
      $scope.suit2 = randomSuitService.getSuit();

      $scope.checkSuitsForTextColor();

      /*
      if ($scope.checkForDuplicates()) {
        $scope.refreshCards();
      }
      */
    }

    $scope.checkSuitsForTextColor = function() {
        if ($scope.suit1 == "hearts" || $scope.suit1 == "diamonds") {
            $scope.rank1color = "red";
        } else {
            $scope.rank1color = "black";
        }
        if ($scope.suit2 == "hearts" || $scope.suit2 == "diamonds") {
            $scope.rank2color = "red";
        } else {
            $scope.rank2color = "black";
        }
    }

    /*
    $scope.checkForDuplicates = function() {
        return ($scope.rank1 == $scope.rank2 && $scope.suit1 == $scope.suit2);
    }
    */

    $scope.refreshCards();

    $scope.responded = function() {
        if ($scope.recording) {
            $scope.sendResults();
        }
        $scope.refreshCards();
        $scope.loadTime = Date.now();
        $scope.$apply();
    }

    $("html").height($(document).height());
    //listen for clicks, mofo!
    $("html").hammer({swipe_min_distance : 5}).bind('swipe', function() {
        $scope.responded();
    });
    /*
    $(document).on("tap", function(event) {
        $scope.responded();
    });
    */

    /*
    content.click(function(event) {
        $scope.responded();
    })
    */

    var content = $('.content');

    $(document).keydown(function(event) {
        if(event.which == 32) {
            $scope.responded();
        };

    })


    $scope.sendResults = function() {
      //console.log("load time: " + $scope.loadTime);
      $scope.respondTime = Date.now();
      var diff = $scope.respondTime - $scope.loadTime;
      //console.log("respond time: " + $scope.respondTime);
      //console.log("diff: " + ($scope.respondTime - $scope.loadTime));
      var dataObject = {};
      dataObject.duration = diff;
      // todo: make 10s 0s for saving the card ranks
      dataObject.cards = $scope.suit1.substr(0,1) + $scope.suit2.substr(0,1) + $scope.rank1 + $scope.rank2;
      dataObject.stimulus = $scope.loadTime;
      dataObject.response = $scope.respondTime;
      dataObject.username = $scope.username || "default";
      $http.post("/timestamp", dataObject).
          success(function(data) {
              console.log("success");
              console.log(data);
          }).
          error(function(data) {
              console.log("fail!");
              console.log(data);
          })
    }

    //console.log(viewportSizeService.getHeightAndWidth());
    var heightAndWidth = viewportSizeService.getHeightAndWidth();
    var marginTop = (heightAndWidth.height - 365) / 2;
    //console.log("marginTop: " + marginTop);
    content.css("margin-top", marginTop);



}
FrameCtrl.$inject = ['$scope', '$http', "randomRankService", "randomSuitService", "viewportSizeService"];

