'use strict';

/**
 * @ngdoc function
 * @name fmAppApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the fmAppApp
 */
angular.module('fmAppApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
