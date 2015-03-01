'use strict';

/**
 * @ngdoc function
 * @name fmAppApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the fmAppApp
 */
angular.module('fmAppApp')
  .controller('LoginCtrl', function ($scope, $http, UserService, $location) {
  var user = UserService;
  $scope.doLogin = function() {
      $http.post('/api/login', {email: $scope.email, password: $scope.password } )
        .success(function(data) {
          user.setToken(data.token);
          $location.path('/');
        })
        .error(function(data) {
            $scope.error = data.error;
        });
  }



  });
