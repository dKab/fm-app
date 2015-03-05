'use strict';
describe('MainCtrl controller', function() {
  var httpBackend, scope;
  httpBackend = scope = null;
  beforeEach(module('fmAppApp'));
  beforeEach(inject(function($rootScope, _$httpBackend_) {
    scope = $rootScope.$new();
    return httpBackend = _$httpBackend_;
  }));
  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    return httpBackend.verifyNoOutstandingRequest();
  });
  xit('should send http GET request to /api/operation', inject(function($controller) {
    var ctrl;
    httpBackend.expectGET('/api/operation').respond(200, '');
    ctrl = $controller('MainCtrl', {
      $scope: scope
    });
    return httpBackend.flush();
  }));
  xit('should attach returned array of operations to the scope', inject(function($controller) {
    var ctrl;
    httpBackend.whenGET('/api/operation').respond(200, ['foo', 'bar', 'baz']);
    ctrl = $controller('MainCtrl', {
      $scope: scope
    });
    httpBackend.flush();
    return expect(scope.operations).toEqual(['foo', 'bar', 'baz']);
  }));
});
