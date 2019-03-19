describe('register component', function () {
  beforeEach(module('app', function ($provide) {
    $provide.factory('register', function () {
      return {
        templateUrl: 'app/register.html'
      };
    });
  }));

  it('should...', angular.mock.inject(function ($rootScope, $compile) {
    var element = $compile('<register></register>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
