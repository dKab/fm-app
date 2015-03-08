'use strict';
angular.module('fmAppApp').controller('OperationsCtrl', function(Operation, CategoryService, $scope) {
  $scope.operations = Operation.query();
  $scope.categories = CategoryService.getCategories();
  return $scope.addOperation = function() {
    var category, fields, operation;
    if ($scope.category) {
      fields = {
        amount: $scope.amount,
        category_id: $scope.category
      };
      operation = new Operation(fields);
      operation.$save();
    } else if ($scope.newCategory) {
      category = CategoryService.createCategory($scope.newCategory);
      category.$save(function(created) {
        operation = new Operation({
          amount: $scope.amount,
          category_id: created.id
        });
        return operation.$save();
      });
    }
    return $scope.operations.unshift(operation);
  };
});
