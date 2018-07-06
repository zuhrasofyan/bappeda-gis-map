describe('adminDashboard component', function () {
  beforeEach(module('app', function ($provide) {
    $provide.factory('adminDashboard', function () {
      return {
        templateUrl: 'app/adminDashboard.html'
      };
    });
  }));

  it('should...', angular.mock.inject(function ($rootScope, $compile) {
    var element = $compile('<adminDashboard></adminDashboard>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
