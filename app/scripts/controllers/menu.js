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
        user.logOut();
        $location.path('#/login');
      };
      var publicRoutes = [
          {
              path: '#/about',
              name: 'about'
            },
          {
            path: '#/login',
            name: 'login'
          }
        ],
        privateRoutes = [
          {
              path: '#/categories',
              name: 'categories'
          }
        ];
    console.log($location.path());
      $scope.navClass = function(path) {
        return ($location.path() == path.substr(1)) ? 'active' : '';
      };
    $scope.isActive = function (path) {
      return $location.path() === path.substr(1);
    };

      $scope.routes = (user.isSignedIn()) ? privateRoutes : publicRoutes;
      if (user.isSignedIn()) {
        $scope.name = user.currentUser().name;
      }

  });
