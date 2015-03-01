'use strict';

describe('Service: UserService', function () {

  // load the service's module
  beforeEach(module('fmAppApp'));

  // instantiate service
  var UserService, token, theKey = 'fmAppAuthToken';

  beforeAll(function() {
    token = localStorage.getItem(theKey);
  });

  afterAll(function() {
    localStorage.setItem(theKey, token);
  });

  beforeEach(inject(function (_UserService_) {
    UserService = _UserService_;
    localStorage.removeItem(theKey);
  }));


  describe('setToken method', function() {
    it('should save token to localStorage', function() {
      UserService.setToken('foo');
      expect(localStorage.getItem(theKey)).toBe('foo');
    });
  });

  describe('removeToken method', function() {
    it('should remove token from localStorage', function() {
        localStorage.setItem(theKey, 'bar');
        expect(localStorage.getItem(theKey)).toBe('bar');
        UserService.removeToken();
      expect(localStorage.getItem(theKey)).toBeNull();
    });
  });

  describe('getToken method', function() {
    it('should return token from localStorage', function() {
        localStorage.setItem(theKey, 'baz');
        expect(UserService.getToken()).toBe('baz');
    });
  });

  describe('isSignedIn method', function() {
    it('should return true if there is token stored in localStorage and false if not', function() {
      expect(UserService.isSignedIn()).toBe(false);
      localStorage.setItem(theKey, 'quax');
      expect(UserService.isSignedIn()).toBe(true);
    });
  });

});
