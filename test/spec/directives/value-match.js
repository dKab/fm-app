'use strict';

describe('Directive: valueMatch', function () {

  beforeEach(module('fmAppApp'));

  var element,
    scope,  form;

  it('should change validity state of element depending on value of another element',
    inject(function ($compile, $rootScope) {
      scope = $rootScope.$new();
      element = "<form name='form'>"+
      "<input ng-model='orig' name='origin'>"+
      "<input value-match='orig' name='verify' ng-model='repeat'>";
      $compile(element)(scope);
      form = scope.form;
      scope.$digest();
      expect(form.verify.$error.valueMatch).not.toBeDefined();
      form.origin.$setViewValue('a');
      scope.$digest();
      expect(form.verify.$error.valueMatch).toBe(true);
      form.verify.$setViewValue('a');
      scope.$digest();
      expect(form.verify.$error.valueMatch).not.toBeDefined();
      form.verify.$setViewValue('1324125');
      scope.$digest();
      expect(form.verify.$error.valueMatch).toBe(true);
      form.origin.$setViewValue('1324125');
      expect(form.verify.$error.valueMatch).not.toBeDefined();
      form.origin.$setViewValue('fdsg');
      expect(form.verify.$error.valueMatch).toBe(true);
  }));
});
