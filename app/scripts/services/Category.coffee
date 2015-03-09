'use strict'

angular.module 'fmAppApp'
  .factory 'CategoryService', (Category) ->
    categories = Category.query()
    catServiceInstance =
        getCategories: ->
          categories
        createCategory: (name) ->
          category = new Category { name: name }
        addCategory: (category)->
          categories.push category
        deleteCategory: (id) ->
#          TODO implement this method
