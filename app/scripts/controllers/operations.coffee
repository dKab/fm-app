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
          date: new Date().getTime()
        operation = new Operation fields
        operation.$save (op) ->
          $scope.operations.unshift op

      else if $scope.newCategory
        category = CategoryService.createCategory $scope.newCategory
        category.$save (created) ->
          CategoryService.addCategory created
          fields =
            amount: $scope.amount
            category_id: created.id
            date: new Date().getTime()
          operation = new Operation fields
          operation.$save (op) ->
            $scope.operations.unshift op
        , (errors) ->
            alert 'У вас уже есть категория с таким названием'

    $scope.remove = (id) ->
      Operation.remove {id: id}
       $scope.operations = (op for op in $scope.operations when op.id isnt id)









