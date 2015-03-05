angular.module('fmAppApp').factory('Operation', function($resource) {
  return $resource('/api/operation', null, {
    update: {
      method: 'PUT'
    }
  });
}).factory('Category', function($resource) {
  return $resource('/api/category', null, {
    update: {
      method: 'PUT'
    }
  });
});
