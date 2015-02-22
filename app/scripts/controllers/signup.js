'use strict';

/**
 * @ngdoc function
 * @name fmAppApp.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the fmAppApp
 */
angular.module('fmAppApp')
  .controller('SignupCtrl', function ($scope, $http) {
    var user = {};
    user.name = $scope.name;
    user.email = $scope.email;
    user.password = $scope.password;

    $scope.signup = function () {
      $http.post('/api/signup', user).success(function(data, status) {
        localStorage.setItem('authToken', data.token);
      }).error(function(data, status) {

      });
    };

    //$scope.user = user;
    $scope.logState = function (form) {
      console.log(form);
    }

  });
