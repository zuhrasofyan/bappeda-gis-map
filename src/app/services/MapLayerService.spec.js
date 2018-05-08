describe('MapLayerService service', function () {
  beforeEach(module('app'));
  it('should', angular.mock.inject(function (MapLayerService) {
    expect(MapLayerService.getData()).toEqual(3);
  }));
});
