angular.module('starter', ['ionic', 'firebase', 'bucketList.controllers'])

.run(function($ionicPlatform, $rootScope, $firebaseAuth, $firebase, $window, $ionicLoading) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }

        $rootScope.userEmail = null;
        $rootScope.baseUrl = 'https://bucketlist-app.firebaseio.com/';
        var authRef = new Firebase($rootScope.baseUrl);
        $rootScope.auth = $firebaseAuth(authRef);

        $rootScope.show = function(text) {
            $rootScope.loading = $ionicLoading.show({
                content: text ? text : 'Loading..',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
        };

        $rootScope.hide = function() {
            $ionicLoading.hide();
        };
    });
})

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('auth', {
            url: "/auth",
            abstract: true,
            templateUrl: "templates/auth.html"
        })
        .state('auth.signin', {
            url: '/signin',
            views: {
                'auth-signin': {
                    templateUrl: 'templates/auth-signin.html',
                    controller: 'SignInCtrl'
                }
            }
        })
        .state('auth.signup', {
            url: '/signup',
            views: {
                'auth-signup': {
                    templateUrl: 'templates/auth-signup.html',
                    controller: 'SignUpCtrl'
                }
            }
        })
        .state('bucket', {
            url: "/bucket",
            abstract: true,
            templateUrl: "templates/bucket.html"
        })
        .state('bucket.list', {
            url: '/list',
            views: {
                'bucket-list': {
                    templateUrl: 'templates/bucket-list.html',
                    controller: 'myListCtrl'
                }
            }
        })
        .state('bucket.completed', {
            url: '/completed',
            views: {
                'bucket-completed': {
                    templateUrl: 'templates/bucket-completed.html',
                    controller: 'completedCtrl'
                }
            }
        })
    $urlRouterProvider.otherwise('/auth/signin');
});