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


