'use strict';

/**
 * @ngdoc function
 * @name fmAppApp.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the fmAppApp
 */
angular.module('fmAppApp')
  .controller('SignupCtrl', function ($scope, $http, $location, UserService) {

    var userService = UserService;

    $scope.doSignup = function () {
      $http.post('/api/signup', {
        name: $scope.name,
        email: $scope.email,
        password: $scope.password
      }).success(function(data) {
        localStorage.setItem('authToken', data.token);
        var  user = { name: data.name,
                      id: data.id };
        userService.setUser(user);
        $location.path('#');
      }).error(function(data) {
        $scope.failure = true;
        $scope.errors = data.errors;
      });
    };
  });
