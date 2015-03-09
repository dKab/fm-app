'use strict'

describe 'Controller: OperationsCtrl', ->
  scope = ctrl = null
  beforeEach module 'fmAppApp'

  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()
    ctrl = $controller 'OperationsCtrl', {$scope: scope}

  it 'should attach list of operations to the scope', ->
    expect scope.operations
      .toEqual jasmine.any Array

  it 'should attach list of categories to the scope', ->
    expect scope.categories
      .toEqual jasmine.any Array

  describe 'addOperation method', ->
    $httpBackend = null
    beforeEach inject (_$httpBackend_) ->
      $httpBackend = _$httpBackend_
      $httpBackend.expectGET '/api/categories'
      .respond 200, ''
      $httpBackend.expectGET '/api/operations'
        .respond 200, ''

    it 'should send POST request to /api/operations with amount and category', ->
      $httpBackend.expectPOST '/api/operations', {amount: -500, category_id: 123}
        .respond 201, ''
      scope.amount = -500
      scope.category  = 123
      scope.addOperation()
      $httpBackend.flush()

    it 'should create category first if such category doesn\'t exist', ->
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






