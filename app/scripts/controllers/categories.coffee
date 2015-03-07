'use strict'

angular.module 'fmAppApp'
  .controller 'CategoriesCtrl', (Category, $scope) ->
    $scope.categories = []

    $scope.addCategory = ->
      category = new Category { name: $scope.name}
      category.$save()

