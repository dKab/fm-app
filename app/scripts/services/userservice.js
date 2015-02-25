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

    var currentUser;

    return {
      currentUser: function () {
        return currentUser;
      },
      setUser: function(user) {
        // check password on server, get user data, unique token, etc.
        currentUser = user;
      },
      logOut: function() {
        // clear current_user data, unset logged in status, etc.
          currentUser = undefined;
        localStorage.removeItem('authToken');
      },

      isSignedIn: function() {
        return (localStorage.getItem('authToken') === null) ? false : true;
      }
    };
  });
