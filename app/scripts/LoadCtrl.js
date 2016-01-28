angular.module('starter.controllers')

.controller('LoadCtrl',function($scope, Restangular, $ionicLoading, localStorageService, $state){

    $ionicLoading.show({
      template:'Loading song...'
    });

    if(localStorageService.get('Songs') !== null){
      $state.go('app.welcome');
      $ionicLoading.hide();
    }else{
      Restangular.all('songs').getList().then(function(results){
        $ionicLoading.hide();
        localStorageService.set('Songs', results);
        $state.go('app.welcome');
      });
    }
  });
