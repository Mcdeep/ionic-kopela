angular.module('starter.controllers')

.controller('SongListCtrl',function($scope, Restangular){

    Restangular.all('songs').getList().then(function(results){
      $scope.songs = results;
    });


  });
