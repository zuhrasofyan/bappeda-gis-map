describe('EditUserService service', function () {
  beforeEach(module('app'));
  it('should', angular.mock.inject(function (EditUserService) {
    expect(EditUserService.getData()).toEqual(3);
  }));
});
