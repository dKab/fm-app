'use strict';

/**
 * @ngdoc function
 * @name fmAppApp.controller:CategoriesCtrl
 * @description
 * # CategoriesCtrl
 * Controller of the fmAppApp
 */
angular.module('fmAppApp')
  .controller('CategoriesCtrl', function ($scope, $http) {
    //$scope.categories = [];
    //$http.get('/api/categories').success(function(data) {
    //  $scope.categories = data;
    //});
    $scope.categories = ['foo'];
});
