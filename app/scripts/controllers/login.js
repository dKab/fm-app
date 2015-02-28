'use strict';

/**
 * @ngdoc function
 * @name fmAppApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the fmAppApp
 */
angular.module('fmAppApp')
  //TODO replace all direct interactions with localstorage with calls to UserService
  .controller('LoginCtrl', function ($scope, $http, UserService, $location) {
  var userService = UserService;
  $scope.doLogin = function() {
      $http.post('/api/login', {email: $scope.email, password: $scope.password } )
        .success(function(data) {
          userService.setUser({name: data.name, id: data.id });
          localStorage.setItem('authToken', data.token);
          $location.path('#');
        })
        .error(function(data) {
            $scope.error = data.error;
        });
  }



  });
