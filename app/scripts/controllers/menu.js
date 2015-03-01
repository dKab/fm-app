'use strict';

/**
 * @ngdoc function
 * @name fmAppApp.controller:MenuCtrl
 * @description
 * # MenuCtrl
 * Controller of the fmAppApp
 */
angular.module('fmAppApp')
  .controller('MenuCtrl', function ($scope, UserService, $location) {
      var user = UserService;
      $scope.isSignedIn = user.isSignedIn;

      $scope.logout = function() {
        user.removeToken();
        $location.path('/login');
      };
    $scope.publicRoutes = [
      {
        name: 'about',
        path: '#/about'
      },
      {
        name: 'login',
        path: '#/login'
      }
    ];
    $scope.privateRoutes = [
      {
        name: 'home',
        path: '#/'
      }
    ];
    $scope.isActive = function (path) {
      return $location.path() === path.substr(1);
    };
  });
