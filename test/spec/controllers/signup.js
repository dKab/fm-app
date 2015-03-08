'use strict';

describe('Controller: SignupCtrl', function () {
  beforeEach(module('fmAppApp'));

  var scope, mockBackend, signupCtrl;

  describe('method signUp', function() {

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      mockBackend = _$httpBackend_;
      scope = $rootScope.$new();
      signupCtrl = $controller('SignupCtrl', {$scope: scope});
    }));

    afterEach(function() {
      mockBackend.verifyNoOutstandingExpectation();
      mockBackend.verifyNoOutstandingRequest();
    });

    it('should send POST request with user data to the server',
      function() {
        scope.name = 'John';
        scope.email = 'some@email';
        scope.password = 'somePass';
        mockBackend.expectPOST('/api/signup',
          {name:'John', email: 'some@email', password: 'somePass' }).respond(201, '');
        scope.doSignup();
        mockBackend.flush();
      });

    it('should ask UserService to save token in case of success', inject(function($injector) {
      var UserService = function() {
        return $injector.get('UserService');
      };
      var user = UserService();
      spyOn(user, 'setToken');
      mockBackend.whenPOST('/api/signup').respond(201, {token: 'asdfasfgegr'});
      scope.doSignup();
      mockBackend.flush();
      expect(user.setToken).toHaveBeenCalledWith('asdfasfgegr');
    }));

    it('should change location to `/` in case  of success', inject(function($location) {
        var location = $location;
        mockBackend.whenPOST('/api/signup').respond(201, '');
        spyOn(location, 'path');
        scope.doSignup();
        mockBackend.flush();
        expect(location.path).toHaveBeenCalledWith('/');
    }));

    it('should assign variable `errors` to the scope in case of error', function() {
      var errors = {
       errors: {
         name: 'too short'
       }
      };
      mockBackend.whenPOST('/api/signup').respond(422, errors);
      expect(scope.errors).toBeUndefined();
      scope.doSignup();
      mockBackend.flush();
      expect(scope.errors).toEqual({name: 'too short'});
    });

  });
});
