'use strict';

describe('Controller: LoginCtrl', function () {

  // load the controller's module
  beforeEach(module('fmAppApp'));

  var LoginCtrl, userService,
    scope, mockBackend, token;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$httpBackend_) {
    mockBackend = _$httpBackend_;
    scope = $rootScope.$new();
    LoginCtrl = $controller('LoginCtrl', {
      $scope: scope
    });
  }));

  afterEach(function() {
    mockBackend.verifyNoOutstandingExpectation();
    mockBackend.verifyNoOutstandingRequest();
  });

  it('should send POST request with login and password to the server', function () {
      mockBackend.expectPOST('/api/login', {email: 'someEmail', password: 'somePass'})
          .respond(200, '');
      scope.email = 'someEmail';
      scope.password = 'somePass';
      scope.doLogin();
      mockBackend.flush();
  });

  it('should ask userService to save token in case of success',
    inject(function($injector) {
      var UserService = function() {
        return $injector.get('UserService');
      };
      userService = UserService();
      spyOn(userService, 'setToken');
      mockBackend.whenPOST('/api/login').respond(200,{ token: 'xxx'} );
      scope.doLogin();
      mockBackend.flush();
      expect(userService.setToken).toHaveBeenCalledWith('xxx');
    }));

  it('should redirect to home path in case of success', inject(function($location) {
      mockBackend.whenPOST('/api/login').respond(200, '');
      spyOn($location, 'path');
      scope.doLogin();
      mockBackend.flush();
      expect($location.path).toHaveBeenCalledWith('/');
  }));

  it('should attach a list of errors to the scope in case of error', function() {
    mockBackend.whenPOST('/api/login').respond(401, { errors: { someErr: 'oh noez! error occurred!'}});
    expect(scope.errors).toBeUndefined();
    scope.doLogin();
    mockBackend.flush();
    expect(scope.errors).toEqual({someErr: 'oh noez! error occurred!'});
  });

});
