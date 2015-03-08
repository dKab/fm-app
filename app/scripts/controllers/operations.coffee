'use strict'

angular.module 'fmAppApp'
  .controller 'OperationsCtrl', (Operation, CategoryService, $scope) ->
    $scope.operations = Operation.query()
    $scope.categories = CategoryService.getCategories()

    $scope.addOperation = ->
      if $scope.category
        fields =
          amount: $scope.amount
          category_id: $scope.category
        operation = new Operation fields
        operation.$save()
      else if $scope.newCategory
        category = CategoryService.createCategory $scope.newCategory
        category.$save (created) ->
          operation = new Operation { amount: $scope.amount, category_id: created.id }
          operation.$save()
      $scope.operations.unshift operation









