describe('angular-legacy-url', function () {
  var $window;
  beforeEach(module('angular-legacy-url'));
  beforeEach(module(function ($provide) {
    $window = { location: { search: '', pathname: '' }};
    $provide.value('$window', $window);
  }));

  describe('constructor', function () {
    describe('queries', function () {
      it('extracts initial values', inject(function (AngularLegacyUrl) {
        $window.location.search = '?key=value&bob=dylan';
        var angularLegacyUrl = new AngularLegacyUrl();
        expect(angularLegacyUrl.queries).toEqual({ key: 'value', bob: 'dylan' });
      }));

      it('extracts initial values from empty search string', inject(function (AngularLegacyUrl) {
        $window.location.search = '';
        var angularLegacyUrl = new AngularLegacyUrl();
        expect(angularLegacyUrl.queries).toEqual({});
      }));
    });

    describe('actions', function () {
      it('extracts initial values', inject(function (AngularLegacyUrl) {
        $window.location.pathname = '/warren/zevon/';
        var angularLegacyUrl = new AngularLegacyUrl();
        expect(angularLegacyUrl.actions).toEqual(['warren', 'zevon']);
      }));

      it('extracts initial values from empty pathname string', inject(function (AngularLegacyUrl) {
        $window.location.pathname = '/';
        var angularLegacyUrl = new AngularLegacyUrl();
        expect(angularLegacyUrl.actions).toEqual([]);
      }));
    });
  });
});
