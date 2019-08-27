describe('adminViewUserDashboard component', function () {
  beforeEach(module('app', function ($provide) {
    $provide.factory('adminViewUserDashboard', function () {
      return {
        templateUrl: 'app/adminViewUserDashboard.html'
      };
    });
  }));

  it('should...', angular.mock.inject(function ($rootScope, $compile) {
    var element = $compile('<adminViewUserDashboard></adminViewUserDashboard>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
