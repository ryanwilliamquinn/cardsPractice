'use strict';

/* Controllers */


function MyCtrl1() {}
MyCtrl1.$inject = [];


function MyCtrl2() {
}
MyCtrl2.$inject = [];

function FrameCtrl($scope, randomRankService, randomSuitService) {
    $scope.rank1 = "A";
    $scope.rank2 = "2";
    $scope.suit1 = "hearts";
    $scope.suit2 = "spades";

    $scope.rank1 = randomRankService.getRank();
    $scope.rank2 = randomRankService.getRank();
    $scope.suit1 = randomSuitService.getSuit();
    $scope.suit2 = randomSuitService.getSuit();


}
FrameCtrl.$inject = ['$scope', "randomRankService", "randomSuitService"];
