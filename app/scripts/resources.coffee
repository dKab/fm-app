angular.module 'fmAppApp'
  .factory 'Operation', ($resource) ->
    $resource '/api/operations', null, { update: {method: 'PUT'}}
  .factory 'Category', ($resource) ->
    $resource '/api/categories', null, { update: {method: 'PUT'}}
