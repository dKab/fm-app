'use strict'

angular.module 'fmAppApp'
  .factory 'CategoryService', (Category) ->
    catServiceInstance =
        getCategories: ->
          Category.query()
        createCategory: (name) ->
          category = new Category { name: name}
