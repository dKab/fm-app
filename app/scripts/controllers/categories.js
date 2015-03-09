'use strict';
angular.module('fmAppApp').controller('CategoriesCtrl', function(CategoryService, $scope) {
  $scope.categories = CategoryService.getCategories();
  return $scope.addCategory = function() {
    var category;
    category = CategoryService.createCategory($scope.name);
    return category.$save(function(catObj) {
      CategoryService.addCategory(catObj);
      return $scope.name = '';
    }, function(errors) {
      return alert('У вас уже есть категория с таким названием');
    });
  };
});
