'use strict';

/**
 * @ngdoc overview
 * @name fmAppApp
 * @description
 * # fmAppApp
 *
 * Main module of the application.
 */
angular
  .module('fmAppApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider, $httpProvider) {

    var checkAuth = function($location, $q, UserService) {
      var deferred = $q.defer(),
        user = UserService;
      if (!user.isSignedIn()) {
        deferred.reject();
        $location.path('/login');
      } else {
       deferred.resolve();
      }
      return deferred.promise;
    };


    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        resolve: {
          authNeeded: checkAuth
        }
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/categories', {
        templateUrl: 'views/categories.html',
        controller: 'CategoriesCtrl',
        resolve: {
          authNeeded: checkAuth
        }
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    var AuthCheckHttpInterceptor = function($q, UserService, $location) {
      var user = UserService,
        service = {
          request: function (config) {
            config.headers = config.headers || {};
            if (user.isSignedIn()) {
              config.headers.Authorization = user.getToken();
            }
            return config;
          },
          responseError: function(response) {
            if(response.status === 401 || response.status === 403) {
              $location.path('/login');
            }
            return $q.reject(response);
          }
        };
      return service;
    };

    $httpProvider.interceptors.push(AuthCheckHttpInterceptor);

  });
