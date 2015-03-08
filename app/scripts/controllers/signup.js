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

    var user = UserService;

    $scope.doSignup = function () {
      $http.post('/api/signup', {
        name: $scope.name,
        email: $scope.email,
        password: $scope.password
      }).success(function(response) {
        if (response && response.token)
        user.setToken(response.token);
        $location.path('/');
      }).error(function(response) {
        $scope.errors = response.errors;
      });
    };
  });
