angular.module 'fmAppApp'
  .factory 'Operation', ($resource) ->
    $resource '/api/operation', null, { update: {method: 'PUT'}}
  .factory 'Category', ($resource) ->
    $resource '/api/category', null, { update: {method: 'PUT'}}
