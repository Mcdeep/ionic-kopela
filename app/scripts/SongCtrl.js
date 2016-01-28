angular.module('starter.controllers')

.controller('SongListCtrl',function($scope, Restangular, SongsService){
    /*Songs from Local Storage*/
    $scope.songs = SongsService.getSongs();

  })
.controller('SongCtrl',function($scope,SongsService, $stateParams){
  //$scope.song = resp;
  $scope.song = SongsService.getSingleSong($stateParams.songID);

  SongsService.setRecentSong($scope.song);
});
