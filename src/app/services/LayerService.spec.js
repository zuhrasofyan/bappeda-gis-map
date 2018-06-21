describe('LayerService service', function () {
  beforeEach(module('app'));
  it('should', angular.mock.inject(function (LayerService) {
    expect(LayerService.getData()).toEqual(3);
  }));
});
