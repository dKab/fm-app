'use strict';
angular.module('fmAppApp').controller('CategoriesCtrl', function(Category, $scope) {
  $scope.categories = [];
  return $scope.addCategory = function() {
    var category;
    category = new Category({
      name: $scope.name
    });
    return category.$save();
  };
});
