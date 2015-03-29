'use strict';
angular.module('fmAppApp').controller('OperationsCtrl', function(Operation, CategoryService, $scope, $timeout) {
  var populateAsync;
  $scope.operations = Operation.query();
  populateAsync = function() {
    return $scope.categories = CategoryService.getCategories();
  };
  populateAsync();
  $timeout(populateAsync, 300);
  $scope.category = {};
  $scope.addOperation = function() {
    var category, fields, operation;
    if ($scope.category.selected.id != null) {
      fields = {
        amount: $scope.amount,
        category_id: $scope.category.selected.id,
        date: new Date().getTime()
      };
      operation = new Operation(fields);
      return operation.$save(function(op) {
        $scope.operations.unshift(op);
        return $scope.amount = '';
      });
    } else {
      category = CategoryService.createCategory($scope.category.selected.name);
      return category.$save(function(created) {
        CategoryService.addCategory(created);
        populateAsync();
        $scope.category.selected = _.find($scope.categories, function(cat) {
          return cat.name === created.name;
        });
        fields = {
          amount: $scope.amount,
          category_id: created.id,
          date: new Date().getTime()
        };
        operation = new Operation(fields);
        return operation.$save(function(op) {
          $scope.operations.unshift(op);
          return $scope.amount = '';
        });
      }, function(errors) {
        return alert('У вас уже есть категория с таким названием');
      });
    }
  };
  $scope.remove = function(id) {
    var op;
    Operation.remove({
      id: id
    });
    return $scope.operations = (function() {
      var i, len, ref, results;
      ref = $scope.operations;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        op = ref[i];
        if (op.id !== id) {
          results.push(op);
        }
      }
      return results;
    })();
  };
  $scope.isCategoryExists = function(name) {
    return _.find($scope.categories, function(cat) {
      return cat.name === name;
    });
  };
  $scope.catTransform = function(name) {
    var cat;
    return cat = {
      name: name
    };
  };
  $scope.addNewObj = function(searchString) {
    $scope.filterCatTempl();
    if (searchString.length < 1 || $scope.isCategoryExists(searchString)) {
      return;
    }
    return $scope.categories.push($scope.catTransform(searchString));
  };
  return $scope.filterCatTempl = function() {
    var obj, templ;
    templ = _.find($scope.categories, function(cat) {
      return cat.id == null;
    });
    return $scope.categories = (function() {
      var i, len, ref, results;
      ref = $scope.categories;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        obj = ref[i];
        if (obj !== templ) {
          results.push(obj);
        }
      }
      return results;
    })();
  };
});
