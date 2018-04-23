describe('UserService service', function () {
  beforeEach(module('app'));
  it('should', angular.mock.inject(function (UserService) {
    expect(UserService.getData()).toEqual(3);
  }));
});
