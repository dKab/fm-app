'use strict';

describe 'Controller: categoriesCtrl',  ->
  beforeEach module 'fmAppApp'
  scope = $httpBackend = ctrl = null

  beforeEach inject (_$rootScope_, _$httpBackend_, _$controller_) ->
    scope = _$rootScope_.$new()
    $httpBackend = _$httpBackend_
    ctrl = _$controller_ 'CategoriesCtrl', {$scope: scope}

  it 'should attach a list of categories to the $scope',  ->
      expect scope.categories
        .toEqual jasmine.any Array;

  describe 'method addCategory',  ->

    afterEach ->
      $httpBackend.verifyNoOutstandingExpectation()
      $httpBackend.verifyNoOutstandingRequest()

    it 'should POST new category data to /api/category with category model value', ->
      $httpBackend.expectPOST '/api/category', {name: 'food' }
        .respond 200, ''
      scope.name = 'food'
      scope.addCategory()
      $httpBackend.flush()




