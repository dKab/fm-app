'use strict';

describe('Controller: MenuCtrl', function () {

  // load the controller's module
  beforeEach(module('fmAppApp'));

  var MenuCtrl,
    scope, location, userService;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $location, $injector) {
    scope = $rootScope.$new();
    MenuCtrl = $controller('MenuCtrl', {
      $scope: scope
    });
    location = $location;

      var UserService = function() {
        return $injector.get('UserService');
      };
      userService = UserService();
  }));

  it('should attach a list of private routes and a list of public routes to the scope', function () {
    expect(scope.privateRoutes).toEqual(jasmine.any(Array));
    expect(scope.publicRoutes).toEqual(jasmine.any(Array));

  });

  it('should use UserService\'s method `isSignedIn` to determine if user is signed in ', function() {
    expect(scope.isSignedIn).toBe(userService.isSignedIn);
  });

  describe('logout method', function() {

    it('should ask UserService to remove token', function() {
      spyOn(userService, 'removeToken');
      scope.logout();
      expect(userService.removeToken).toHaveBeenCalled();
    });

    it('should redirect browser to the login path', function() {
        spyOn(location, 'path');
        scope.logout();
        expect(location.path).toHaveBeenCalledWith('/login');
    });

  });

  describe('isActive method', function() {

    it('should return true if its argument equals current path and false if not', function() {
     var  routes = [
        {
          name: 'about',
          path: '#/about'
        },
        {
          name: 'login',
          path: '#/login'
        }
      ];
      spyOn(location, 'path').and.returnValue('/about');
      expect(scope.isActive(routes[0].path)).toBe(true);
      expect(scope.isActive(routes[1].path)).toBe(false);
    });
  });
});
