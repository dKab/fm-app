'use strict';
describe('Controller: categoriesCtrl', function() {
  var $httpBackend, ctrl, scope;
  beforeEach(module('fmAppApp'));
  scope = $httpBackend = ctrl = null;
  beforeEach(inject(function(_$rootScope_, _$httpBackend_) {
    scope = _$rootScope_.$new();
    return $httpBackend = _$httpBackend_;
  }));
  it('should attach a list of categories to the $scope', inject(function($controller) {
    ctrl = $controller('CategoriesCtrl', {
      $scope: scope
    });
    return expect(scope.categories).toEqual(jasmine.any(Array));
  }));
  it('should GET list of categories from /api/categories', inject(function($controller) {
    $httpBackend.expectGET('/api/categories').respond(200, [
      {
        foo: "bar",
        baz: 'quax'
      }
    ]);
    ctrl = $controller('CategoriesCtrl', {
      $scope: scope
    });
    return $httpBackend.flush();
  }));
  return describe('method addCategory', function() {
    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      return $httpBackend.verifyNoOutstandingRequest();
    });
    beforeEach(inject(function($controller) {
      return ctrl = $controller('CategoriesCtrl', {
        $scope: scope
      });
    }));
    it('should POST new category data to /api/categories with category name', function() {
      $httpBackend.expectGET('/api/categories').respond(200, '');
      $httpBackend.expectPOST('/api/categories', {
        name: 'food'
      }).respond(201, '');
      scope.name = 'food';
      scope.addCategory();
      return $httpBackend.flush();
    });
    return it('should append new category to the list of categories in case of success', function() {
      var justCreated;
      $httpBackend.expectGET('/api/categories').respond(200, '');
      justCreated = {
        id: 10,
        name: 'foo',
        icon: 'bar.png'
      };
      scope.categories = [{}];
      $httpBackend.whenPOST('/api/categories').respond(201, justCreated);
      scope.addCategory();
      $httpBackend.flush();
      return expect(angular.equals(scope.categories[scope.categories.length - 1], justCreated)).toBe(true);
    });
  });
});
