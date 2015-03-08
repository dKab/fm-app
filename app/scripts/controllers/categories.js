'use strict';
angular.module('fmAppApp').controller('CategoriesCtrl', function(CategoryService, $scope) {
  $scope.categories = CategoryService.getCategories();
  return $scope.addCategory = function() {
    var category;
    category = CategoryService.createCategory($scope.name);
    category.$save();
    $scope.categories.push(category);
    return $scope.name = '';
  };
});
