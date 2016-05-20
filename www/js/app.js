// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'firebase'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.factory('Items', ['$firebaseArray', function($firebaseArray) {
  var itemsRef = new Firebase('https://sharethespoil.firebaseio.com');
  return $firebaseArray(itemsRef);
}])

.controller('ListCtrl', function($scope, $ionicListDelegate, Items) {

  $scope.items = Items;

  $scope.addItem = function() {
    var name = prompt('Ecrivez votre spoil !!');
    if (name) {
      $scope.items.$add({
        'name': name
      });
    }
  };

  $scope.purchaseItem = function(item) {
    var itemRef = new Firebase('https://sharethespoil.firebaseio.com' + item.$id);
    itemRef.child('status').set('purchased');
    $ionicListDelegate.closeOptionButtons();
  };
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('liste', {
    url: '/liste',
    templateUrl: 'templates/liste.html'        
  })

    .state('home', {
    url: '/home',
    templateUrl: 'templates/home.html'        
  })

    .state('test', {
    url: '/test',
    templateUrl: 'templates/test.html'        
  })

    .state('add', {
    url: '/add',
    templateUrl: 'templates/add.html'        
  })

    .state('concent', {
    url: '/concent',
    templateUrl: 'templates/concent.html'        
  })

    .state('film', {
    url: '/film',
    templateUrl: 'templates/film.html'        
  })

    .state('serie', {
    url: '/serie',
    templateUrl: 'templates/serie.html'        
  })

    .state('jeux', {
    url: '/jeux',
    templateUrl: 'templates/jeux.html'        
  })

    .state('livre', {
    url: '/livre',
    templateUrl: 'templates/livre.html'        
  })

    .state('single', {
    url: '/single',
    templateUrl: 'templates/single.html'        
  })

   $urlRouterProvider.otherwise('');


});