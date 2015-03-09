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
  it('should attach list of operations to the scope', function() {
    return expect(scope.operations).toEqual(jasmine.any(Array));
  });
  it('should attach list of categories to the scope', function() {
    return expect(scope.categories).toEqual(jasmine.any(Array));
  });
  return describe('addOperation method', function() {
    var $httpBackend;
    $httpBackend = null;
    beforeEach(inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('/api/categories').respond(200, '');
      return $httpBackend.expectGET('/api/operations').respond(200, '');
    }));
    it('should send POST request to /api/operations with amount and category', function() {
      $httpBackend.expectPOST('/api/operations', {
        amount: -500,
        category_id: 123
      }).respond(201, '');
      scope.amount = -500;
      scope.category = 123;
      scope.addOperation();
      return $httpBackend.flush();
    });
    it('should create category first if such category doesn\'t exist', function() {
      $httpBackend.expectPOST('/api/categories', {
        name: 'new category'
      }).respond(201, {
        id: 42,
        name: 'new category'
      });
      $httpBackend.expectPOST('/api/operations', {
        amount: -300,
        category_id: 42
      }).respond(201, '');
      scope.amount = -300;
      scope.newCategory = 'new category';
      scope.addOperation();
      return $httpBackend.flush();
    });
    return it('should prepend newly created operation to the operations list', function() {
      var newlyCreated;
      newlyCreated = {
        amount: 150,
        category_id: 45
      };
      $httpBackend.whenPOST('/api/operations').respond(201, newlyCreated);
      scope.operations = [
        {
          amount: 1000,
          category_id: 7
        }
      ];
      scope.amount = 150;
      scope.category = 45;
      scope.addOperation();
      $httpBackend.flush();
      return expect(angular.equals(newlyCreated, scope.operations[0])).toBe(true);
    });
  });
});
