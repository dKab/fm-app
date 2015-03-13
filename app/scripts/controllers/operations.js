'use strict';
angular.module('fmAppApp').controller('OperationsCtrl', function(Operation, CategoryService, $scope) {
  $scope.operations = Operation.query();
  $scope.categories = CategoryService.getCategories();
  return $scope.addOperation = function() {
    var category, fields, operation;
    if ($scope.category) {
      fields = {
        amount: $scope.amount,
        category_id: $scope.category,
        date: new Date().getTime()
      };
      operation = new Operation(fields);
      return operation.$save(function(op) {
        return $scope.operations.unshift(op);
      });
    } else if ($scope.newCategory) {
      category = CategoryService.createCategory($scope.newCategory);
      return category.$save(function(created) {
        CategoryService.addCategory(created);
        fields = {
          amount: $scope.amount,
          category_id: created.id,
          date: new Date().getTime()
        };
        operation = new Operation(fields);
        return operation.$save(function(op) {
          return $scope.operations.unshift(op);
        });
      }, function(errors) {
        return alert('У вас уже есть категория с таким названием');
      });
    }
  };
});
