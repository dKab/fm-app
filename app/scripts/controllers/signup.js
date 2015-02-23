'use strict';

/**
 * @ngdoc function
 * @name fmAppApp.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the fmAppApp
 */
angular.module('fmAppApp')
  .controller('SignupCtrl', function ($scope, $http, $location) {
    $scope.signup = function () {
      $http.post('/api/signup', {
        name: $scope.name,
        email: $scope.email,
        password: $scope.password
      }).success(function(data) {
        localStorage.setItem('authToken', data.token);
        $location.path('/');
      }).error(function(data) {
        $scope.failure = true;
        $scope.errors = data.errors;
      });
    };

    //$scope.user = user;
    $scope.logState = function (form) {
      console.log(form);
    }

  });
