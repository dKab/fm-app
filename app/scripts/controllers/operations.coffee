'use strict'

angular.module 'fmAppApp'
  .controller 'OperationsCtrl', (Operation, $scope) ->
    $scope.operations = []

