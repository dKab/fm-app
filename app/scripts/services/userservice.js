'use strict';

/**
 * @ngdoc service
 * @name fmAppApp.UserService
 * @description
 * # UserService
 * Factory in the fmAppApp.
 */
angular.module('fmAppApp')
  .factory('UserService', function () {

    var key = 'fmAppAuthToken';
    return {

      removeToken: function() {
        localStorage.removeItem(key);
      },
      getToken: function() {
        return  localStorage.getItem(key);

      },
      setToken: function(token) {
        localStorage.setItem(key, token);
      },

      isSignedIn: function() {
        return (localStorage.getItem(key) === null) ? false : true;
      }
    };

  });
