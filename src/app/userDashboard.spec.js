describe('userDashboard component', function () {
  beforeEach(module('app', function ($provide) {
    $provide.factory('userDashboard', function () {
      return {
        templateUrl: 'app/userDashboard.html'
      };
    });
  }));

  it('should...', angular.mock.inject(function ($rootScope, $compile) {
    var element = $compile('<userDashboard></userDashboard>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
