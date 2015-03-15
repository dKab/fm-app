angular.module 'fmAppApp'
  .factory 'Operation', ($resource) ->
    $resource '/api/operations/:id', {id: '@id'}, { update: {method: 'PUT'}}
  .factory 'Category', ($resource) ->
    $resource '/api/categories', {id: '@id'}, { update: {method: 'PUT'}}
