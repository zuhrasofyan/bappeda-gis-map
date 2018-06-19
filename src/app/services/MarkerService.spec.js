describe('MarkerService service', function () {
  beforeEach(module('app'));
  it('should', angular.mock.inject(function (MarkerService) {
    expect(MarkerService.getData()).toEqual(3);
  }));
});
