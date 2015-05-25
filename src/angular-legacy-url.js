angular
  .module('angular-legacy-url', [])
  .factory('AngularLegacyUrl', ['$window', function AngularLegacyUrlFactory($window) {
    var getQueries = function (search) {
      return search
        .replace(/(^\?)/, '')
        .split('&')
        .reduce(function (sum, item) {
                  if ( item === '' ) {
                    return sum;
                  }
                  else {
                    item = item.split('=');
                    sum[item[0]] = item[1];
                    return sum;
                  }
                }, {});
    };

    var getActions = function (pathname) {
      return pathname
        .replace(/^\//, '')
        .replace(/\/$/, '')
        .split('/')
        .filter(function (action) {
                  return ( action !== '' );
                });
    };

    return function AngularLegacyUrl() {
      this.actions = getActions($window.location.pathname);
      this.queries = getQueries($window.location.search);

      this.toString = function () {
        var pathname = '/';
        if ( this.actions.length > 0 ) {
          pathname += this.actions.join('/') + '/'
        }

        var search = '';
        if ( Object.keys(this.queries).length > 0 ) {
          var queries = this.queries;
          search += '?' + Object.keys(queries).map(function (key) {
              return key + '=' + encodeURIComponent(queries[key]);
            }).join('&');
        }

        return pathname + search;
      };
    };
  }]);
