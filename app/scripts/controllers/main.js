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
    $scope.categories = [];
    $http.get('/api/categories').success(function(data) {

      $scope.categories = data;
    }).error(function(data) {

    });

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

