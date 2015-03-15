angular.module('fmAppApp').factory('Operation', function($resource) {
  return $resource('/api/operations/:id', {
    id: '@id'
  }, {
    update: {
      method: 'PUT'
    }
  });
}).factory('Category', function($resource) {
  return $resource('/api/categories', {
    id: '@id'
  }, {
    update: {
      method: 'PUT'
    }
  });
});
