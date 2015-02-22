'use strict';

/**
 * @ngdoc function
 * @name fmAppApp.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the fmAppApp
 */
angular.module('fmAppApp')
  .controller('SignupCtrl', function ($scope) {
    var user = {};
    $scope.signup = function () {

    };
    $scope.user = user;
    $scope.logState = function (form) {
      console.log(form);
    }

  });
