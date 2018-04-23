describe('APIInterceptor service', function () {
  beforeEach(module('app'));
  it('should', angular.mock.inject(function (APIInterceptor) {
    expect(APIInterceptor.getData()).toEqual(3);
  }));
});
