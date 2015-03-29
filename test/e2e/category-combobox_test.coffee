require '../../node_modules/jasmine-beforeAll/src/jasmine-beforeAll'
'use strict'

describe 'select2 combobox widget', ()->
  input = null
  httpBackendMock = () ->
    angular.module 'httpBackendMock', ['ngMockE2E', 'fmAppApp']
      .run ($httpBackend)->
        dummyCategories = [
          {id: 1, name: 'foo', icon: '', user_id: 5},
          {id: 2, name: 'bar', icon: '', user_id: 5},
          {id: 3, name: 'baz', icon: '', user_id: 5},
          {id: 4, name: 'quax', icon: '', user_id: 5}
        ]

        $httpBackend.whenGET '/api/categories'
          .respond ()->
            [200, dummyCategories]
        $httpBackend.whenGET /.*/
          .passThrough()
        $httpBackend.whenGET /^views\/.*/
          .passThrough()
        $httpBackend.whenGET /scripts\/.*/
          .passThrough()
        $httpBackend.whenGET /^\/scripts\//
          .passThrough()
        $httpBackend.whenGET /^\/bower_Components\//
          .passThrough()
        $httpBackend.whenGET(/\.html$/).passThrough()

  browser
    .addMockModule 'httpBackendMock', httpBackendMock

  beforeAll ()->
    browser.get 'http://localhost:9000/#/'
    element By.model 'email'
      .sendKeys 'dima@mail'
    element By.model 'password'
      .sendKeys '123456'
    element By.cssContainingText 'form[name=login] button', 'Войти'
      .click()

#  beforeEach ()->


  it 'should allow user to type in anything', ()->
    element By.model 'category.selected'
      .click()
    input = element By.css '.ui-select-search'
    input.sendKeys 'newtestcategory'
    expect input.getAttribute('value')
      .toBe 'newtestcategory'

  it 'should show dropdown with matched items when user starts to type', ()->


  it 'should filter items in dropdown by name', ()->


  it 'should select highlighted item when user presses Enter or Tab key', ()->


  it 'should add string " (будет создана)" to the dropdown item if there\'s no such category', ()->



