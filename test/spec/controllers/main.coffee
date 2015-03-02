'use strict'

describe 'MainCtrl controller',
  ->
    httpBackend = scope = null

    beforeEach module 'fmAppApp'

    beforeEach inject ($rootScope, _$httpBackend_) ->
      scope = $rootScope.$new()
      httpBackend = _$httpBackend_

    afterEach ->
      httpBackend.verifyNoOutstandingExpectation()
      httpBackend.verifyNoOutstandingRequest()

    it 'should send http GET request to /api/operations', inject ($controller) ->
        httpBackend
          .expectGET '/api/operations'
          .respond 200, ''
        ctrl = $controller 'MainCtrl', {$scope: scope}
        httpBackend.flush()

    it 'should attach returned array of operations to the scope', inject ($controller) ->
      httpBackend
        .whenGET '/api/operations'
        .respond 200, ['foo', 'bar', 'baz']
      ctrl = $controller 'MainCtrl', {$scope: scope}
      httpBackend.flush()
      expect scope.operations
        .toEqual ['foo', 'bar', 'baz']

    return

