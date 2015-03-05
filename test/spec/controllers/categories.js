'use strict';
describe('Controller: categoriesCtrl', function() {
  var $httpBackend, ctrl, scope;
  beforeEach(module('fmAppApp'));
  scope = $httpBackend = ctrl = null;
  beforeEach(inject(function(_$rootScope_, _$httpBackend_, _$controller_) {
    scope = _$rootScope_.$new();
    $httpBackend = _$httpBackend_;
    return ctrl = _$controller_('CategoriesCtrl', {
      $scope: scope
    });
  }));
  it('should attach a list of categories to the $scope', function() {
    return expect(scope.categories).toEqual(jasmine.any(Array));
  });
  return describe('method addCategory', function() {
    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      return $httpBackend.verifyNoOutstandingRequest();
    });
    return it('should POST new category data to /api/category with category model value', function() {
      $httpBackend.expectPOST('/api/category', {
        name: 'food'
      }).respond(200, '');
      scope.name = 'food';
      scope.addCategory();
      return $httpBackend.flush();
    });
  });
});
