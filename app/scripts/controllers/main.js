'use strict';

/**
 * @ngdoc function
 * @name fmAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the fmAppApp
 */
angular.module('fmAppApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
