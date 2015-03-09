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
        name: 'Справка',
        path: '#/about'
      }
    ];
    $scope.privateRoutes = [
      {
        name: 'главная',
        path: '#/'
      }
    ];
    $scope.isActive = function (path) {
      return $location.path() === path.substr(1);
    };
  });
