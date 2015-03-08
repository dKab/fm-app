'use strict';

describe 'Controller: categoriesCtrl',  ->
  beforeEach module 'fmAppApp'
  scope = $httpBackend = ctrl = null

  beforeEach inject (_$rootScope_, _$httpBackend_) ->
    scope = _$rootScope_.$new()
    $httpBackend = _$httpBackend_

  it 'should attach a list of categories to the $scope',  inject ($controller) ->
    ctrl = $controller 'CategoriesCtrl', {$scope: scope}
    expect scope.categories
      .toEqual jasmine.any Array;

  it 'should GET list of categories from /api/categories', inject ($controller) ->
    $httpBackend.expectGET '/api/categories'
      .respond 200, [ {foo: "bar", baz: 'quax'}]
    ctrl = $controller 'CategoriesCtrl', {$scope: scope}
    $httpBackend.flush()

  describe 'method addCategory',  ->

    afterEach ->
      $httpBackend.verifyNoOutstandingExpectation()
      $httpBackend.verifyNoOutstandingRequest()

    beforeEach inject ($controller) ->
      ctrl = $controller 'CategoriesCtrl', {$scope: scope}

    it 'should POST new category data to /api/categories with category name', ->
      $httpBackend.expectGET '/api/categories'
        .respond 200, ''
      $httpBackend.expectPOST '/api/categories', {name: 'food' }
        .respond 201, ''
      scope.name = 'food'
      scope.addCategory()
      $httpBackend.flush()

    it 'should append new category to the list of categories in case of success', ->
      $httpBackend.expectGET '/api/categories'
        .respond 200, ''
      justCreated =
        id: 10
        name: 'foo'
        icon: 'bar.png'
      scope.categories = [{}];
      $httpBackend.whenPOST '/api/categories'
        .respond 201, justCreated
      scope.addCategory()
      $httpBackend.flush()
      expect angular.equals scope.categories[scope.categories.length-1], justCreated
        .toBe true




