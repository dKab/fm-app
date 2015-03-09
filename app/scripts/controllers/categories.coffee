'use strict'

angular.module 'fmAppApp'
  .controller 'CategoriesCtrl', (CategoryService, $scope) ->
    $scope.categories = CategoryService.getCategories()
    $scope.addCategory = ->
      category = CategoryService.createCategory $scope.name
      category.$save (catObj) ->
        CategoryService.addCategory catObj
        $scope.name = ''
      , (errors) ->
          alert 'У вас уже есть категория с таким названием'

