// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter',
  ['ionic',
    'ionic-material',
    'starter.controllers',
    'restangular',
    'config',
    'LocalStorageModule'
  ])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, RestangularProvider, ENV, localStorageServiceProvider,$ionicConfigProvider) {
  $stateProvider
    .state('init', {
      url:'/',
      templateUrl: 'templates/loading.html',
      controller: 'LoadCtrl'
    })
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'
    })
    .state('app.welcome', {
      url: '/welcome',
      views: {
        'menuContent': {
          templateUrl: 'templates/welcome.html',
          controller:'WelcomeCtrl'
        }
      }
    })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })
  .state('app.recent', {
      url: '/recent',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'templates/recent.html',
          controller: 'RecentCtrl'
        }
      }
    })
    .state('app.songlist', {
      url: '/songlist',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'templates/song_list.html',
          controller: 'SongListCtrl'
        }
      }
    })
    .state('app.song', {
      url: '/song/:songID',
      views: {
        'menuContent': {
          templateUrl: 'templates/song.html',
          controller: 'SongCtrl'
        }
      }
    })
    .state('app.playlist', {
      url: '/playlist',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })
    .state('app.single', {
      url: '/song/:playlistId',
      views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });

    $ionicConfigProvider.backButton.text('');
    $ionicConfigProvider.backButton.previousTitleText(false);
  // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/');




    /*Restangular Configs*/
    RestangularProvider.setBaseUrl(ENV['apiEndpoint']);
    RestangularProvider.setRestangularFields({
      id:"_id"
    });

    /*localStorageServiceProvider*/

    localStorageServiceProvider.setPrefix('ikopela');
});
