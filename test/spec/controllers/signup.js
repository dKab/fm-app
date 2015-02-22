'use strict';

describe('Controller: SignupCtrl', function () {
  beforeEach(module('fmAppApp'));

  var ctrl,
    scope, mockBackend;

  describe('method signUp', function() {

    beforeEach(inject(function(_$httpBackend_, $rootScope) {
      mockBackend = _$httpBackend_;
      scope = $rootScope.$new();
    }));

    it('should send POST request with user data to the server',
      inject (function($controller) {
        scope.name = 'John';
        scope.email = 'some@email';
        scope.password = 'somePass';
        ctrl = $controller('SignupCtrl', { $scope: scope });
        mockBackend.expectPOST('/api/signup',
          {name:'John', email: 'some@email', password: 'somePass' }).respond(200, '');
        scope.signup();
        mockBackend.flush();
      }));

    it('should set token from response to localstorage in case of success', inject(function($controller) {
      localStorage.removeItem('authToken');
      var token = 'asdfasfgegr';
      expect(localStorage.getItem('authToken')).toBeNull();
      ctrl = $controller('SignupCtrl', {$scope: scope});
      mockBackend.expectPOST('/api/signup').respond(200, {token: token});
      scope.signup();
      mockBackend.flush();
      expect(localStorage.getItem('authToken')).toBe(token);
    }));

    it('should change location to / in case  of success', function() {

    });

    it('should assign status "error" to the scope in case of error', function() {

    });

  });
});
