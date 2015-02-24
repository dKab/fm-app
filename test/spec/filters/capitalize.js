'use strict';

describe('Filter: capitalize', function () {

  // load the filter's module
  beforeEach(module('fmAppApp'));

  // initialize a new instance of the filter before each test
  var capitalize;
  beforeEach(inject(function ($filter) {
    capitalize = $filter('capitalize');
  }));

  it('should capitalize first letter in the string', function () {
    var text = 'angularjs';
    expect(capitalize(text)).toBe('Angularjs');
  });

});
