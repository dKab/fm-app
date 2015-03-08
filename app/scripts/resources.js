angular.module('fmAppApp').factory('Operation', function($resource) {
  return $resource('/api/operations', null, {
    update: {
      method: 'PUT'
    }
  });
}).factory('Category', function($resource) {
  return $resource('/api/categories', null, {
    update: {
      method: 'PUT'
    }
  });
});
