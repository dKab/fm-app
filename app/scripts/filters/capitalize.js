'use strict';

/**
 * @ngdoc filter
 * @name fmAppApp.filter:capitalize
 * @function
 * @description
 * # capitalize
 * Filter in the fmAppApp.
 */
angular.module('fmAppApp')
  .filter('capitalize', function () {
    return function (input) {
      var arr = input.split('');
      arr[0] = arr[0].toUpperCase();
      return arr.join('');
    };
  });
