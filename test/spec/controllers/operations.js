'use strict';
describe('Controller: OperationsCtrl', function() {
  var ctrl, scope;
  scope = ctrl = null;
  beforeEach(module('fmAppApp'));
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    return ctrl = $controller('OperationsCtrl', {
      $scope: scope
    });
  }));
  return it('should attach list of operations to the scope', function() {
    return expect(scope.operations).toEqual(jasmine.any(Array));
  });
});
