/**
 * Created by dmitriy on 2/21/15.
 */
describe('ValueMatch directive', function() {

  var hasClass = function (element, cls) {
    return element.getAttribute('class').then(function (classes) {
      return classes.split(' ').indexOf(cls) !== -1;
    });
  };

  it('should add class ng-invalid to element if its value doesn\'t match specified elements value', function() {

    browser.get('http://localhost:9000/#/signup');

    var orig = element(by.model('password')),
        tween = element(by.model('verify'));

    expect(hasClass(tween, 'ng-invalid-value-match')).toBe(false);
    orig.sendKeys(123);
    expect(hasClass(tween, 'ng-invalid-value-match')).toBe(true);
    tween.sendKeys(123);
    expect(hasClass(tween, 'ng-invalid-value-match')).toBe(false);
    tween.clear();
    expect(hasClass(tween, 'ng-invalid-value-match')).toBe(true);
    orig.clear();
    expect(hasClass(tween, 'ng-invalid-value-match')).toBe(false);
    orig.sendKeys('adgsgfs');
    expect(hasClass(tween, 'ng-invalid-value-match')).toBe(true);
    tween.sendKeys('fdgsdhdf');
    expect(hasClass(tween, 'ng-invalid-value-match')).toBe(true);
  });
});
