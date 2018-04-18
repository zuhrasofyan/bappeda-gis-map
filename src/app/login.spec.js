describe('login component', function () {
  beforeEach(module('app', function ($provide) {
    $provide.factory('login', function () {
      return {
        templateUrl: 'app/login.html'
      };
    });
  }));

  it('should...', angular.mock.inject(function ($rootScope, $compile) {
    var element = $compile('<login></login>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
