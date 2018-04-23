describe('dashboard component', function () {
  beforeEach(module('app', function ($provide) {
    $provide.factory('dashboard', function () {
      return {
        templateUrl: 'app/dashboard.html'
      };
    });
  }));

  it('should...', angular.mock.inject(function ($rootScope, $compile) {
    var element = $compile('<dashboard></dashboard>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
