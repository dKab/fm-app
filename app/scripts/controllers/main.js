'use strict';

/**
 * @ngdoc function
 * @name fmAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the fmAppApp
 */
angular.module('fmAppApp')
  .controller('MainCtrl', function ($scope, $http) {
    $http.get('/api/operations').success(function(data) {
      $scope.operations = data;
    }).error(function(data) {

    });

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

