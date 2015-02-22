'use strict';

/**
 * @ngdoc directive
 * @name fmAppApp.directive:valueMatch
 * @description checks if value of one input matches the value of another (repeat password)
 * # valueMatch
 */
angular.module('fmAppApp')
  .directive('valueMatch', function () {
    return {
      require: 'ngModel',
      restrict: 'A',
      link: function postLink(scope, element, attrs, ctrl) {
        var me = attrs.ngModel,
            matchTo = attrs.valueMatch;
        scope.$watchGroup([me, matchTo], function() {
          ctrl.$setValidity('valueMatch', scope[me] === scope[matchTo]);
        });
      }
    };
  });
