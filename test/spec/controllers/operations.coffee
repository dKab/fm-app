'use strict'

describe 'Controller: OperationsCtrl', ->
  scope = ctrl = $httpBackend = null
  beforeEach module 'fmAppApp'

  beforeEach inject ($controller, $rootScope, _$httpBackend_) ->
    scope = $rootScope.$new()
    ctrl = $controller 'OperationsCtrl', {$scope: scope}
    $httpBackend = _$httpBackend_
    $httpBackend.expectGET '/api/categories'
    .respond 200, ''
    $httpBackend.expectGET '/api/operations'
    .respond 200, ''

  it 'should attach list of operations to the scope', ->
    expect scope.operations
      .toEqual jasmine.any Array

  it 'should attach list of categories to the scope', ->
    expect scope.categories
      .toEqual jasmine.any Array

  describe 'addOperation method', ->

    xit 'should send POST request to /api/operations with amount and category', ->
      $httpBackend.expectPOST '/api/operations', {amount: -500, category_id: 123}
        .respond 201, ''
      scope.amount = -500
      scope.category  = 123
      scope.addOperation()
      $httpBackend.flush()

    xit 'should create category first if such category doesn\'t exist', ->
      $httpBackend.expectPOST '/api/categories', { name: 'new category' }
        .respond 201, {id: 42, name: 'new category'}
      $httpBackend.expectPOST '/api/operations', { amount: -300, category_id: 42}
        .respond 201, ''
      scope.amount  = -300
      scope.newCategory = 'new category'
      scope.addOperation()
      $httpBackend.flush()

    it 'should prepend newly created operation to the operations list', ->
      newlyCreated =
        amount: 150
        category_id: 45
#      $httpBackend.whenPOST '/api/categories'
#        .respond 201, {name: 'foo', id: 45}
      $httpBackend.whenPOST '/api/operations'
        .respond 201, newlyCreated
      scope.operations = [{amount: 1000, category_id: 7}]
      scope.amount = 150
#      scope.newCategory = 'foo'
      scope.category = 45
      scope.addOperation()
      $httpBackend.flush()
      expect angular.equals newlyCreated, scope.operations[0]
        .toBe true

  describe 'remove method', ->
    it 'should send DELETE request with operation id to /api/operations', ->
      $httpBackend.expectDELETE '/api/operations/5'
        .respond 204, ''
      scope.remove(5);
      $httpBackend.flush()

    it 'should remove operation with particular id from operations array', ->
      scope.operations = [{id: 10, amount: -300}, {id: 5, amount: 100}]
      scope.remove(5)
      expect scope.operations
        .toEqual [{id: 10, amount: -300}]












