describe('AuthService service', function () {
  beforeEach(module('app'));
  it('should', angular.mock.inject(function (AuthService) {
    expect(AuthService.getData()).toEqual(3);
  }));
});
