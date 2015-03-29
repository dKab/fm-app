'use strict'

angular.module 'fmAppApp'
  .controller 'OperationsCtrl', (Operation, CategoryService, $scope, $timeout) ->
    $scope.operations = Operation.query()
    populateAsync = () -> $scope.categories = CategoryService.getCategories()
    populateAsync()
    $timeout populateAsync, 300
    $scope.category = {}

    $scope.addOperation = ->
      if $scope.category.selected.id?
        fields =
          amount: $scope.amount
          category_id: $scope.category.selected.id
          date: new Date().getTime()
        operation = new Operation fields
        operation.$save (op) ->
          $scope.operations.unshift op
          $scope.amount = ''
      else
        category = CategoryService.createCategory $scope.category.selected.name
        category.$save (created) ->
          CategoryService.addCategory created
          populateAsync()
          $scope.category.selected = _.find $scope.categories, (cat) -> cat.name is created.name
          fields =
            amount: $scope.amount
            category_id: created.id
            date: new Date().getTime()
          operation = new Operation fields
          operation.$save (op) ->
            $scope.operations.unshift op
            $scope.amount = ''
        , (errors) ->
            alert 'У вас уже есть категория с таким названием'

    $scope.remove = (id) ->
      Operation.remove {id: id}
      $scope.operations = (op for op in $scope.operations when op.id isnt id)

    $scope.isCategoryExists = (name) ->
      _.find $scope.categories, (cat) ->
        cat.name is name

    $scope.catTransform = (name) ->
      cat = {name: name}

    $scope.addNewObj = (searchString) ->
      $scope.filterCatTempl()
      return if (searchString.length < 1 or $scope.isCategoryExists searchString )
      $scope.categories.push $scope.catTransform searchString

    $scope.filterCatTempl  = ()->
      templ = _.find $scope.categories, (cat)->
        not cat.id?
      $scope.categories = (obj for obj in $scope.categories when obj isnt templ)








