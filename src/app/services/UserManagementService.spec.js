describe('UserManagementService service', function () {
  beforeEach(module('app'));
  it('should', angular.mock.inject(function (UserManagementService) {
    expect(UserManagementService.getData()).toEqual(3);
  }));
});
