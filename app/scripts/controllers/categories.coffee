'use strict'

angular.module 'fmAppApp'
  .controller 'CategoriesCtrl', (CategoryService, $scope) ->
    $scope.categories = CategoryService.getCategories()
    $scope.addCategory = ->
      category = CategoryService.createCategory $scope.name
      category.$save()
      $scope.categories.push category
      $scope.name = ''

