'use strict';
angular.module('fmAppApp').factory('CategoryService', function(Category) {
  var catServiceInstance, categories;
  categories = Category.query();
  return catServiceInstance = {
    getCategories: function() {
      return categories;
    },
    createCategory: function(name) {
      var category;
      return category = new Category({
        name: name
      });
    },
    addCategory: function(category) {
      return categories.push(category);
    },
    deleteCategory: function(id) {}
  };
});
