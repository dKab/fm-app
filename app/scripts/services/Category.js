'use strict';
angular.module('fmAppApp').factory('CategoryService', function(Category) {
  var catServiceInstance;
  return catServiceInstance = {
    getCategories: function() {
      return Category.query();
    },
    createCategory: function(name) {
      var category;
      return category = new Category({
        name: name
      });
    }
  };
});
