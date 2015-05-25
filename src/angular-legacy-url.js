angular
  .module('angular-legacy-url', [])
  .value('unko', 'hoge')
  .factory('AngularLegacyUrl', ['$window', function AngularLegacyUrlFactory($window) {
    var getQueries = function (search) {
      return search
        .replace(/(^\?)/,'')
        .split('&')
        .reduce(function(sum, item){
                  if ( item === '' ) {
                    return sum;
                  }
                  else {
                    item         = item.split('=');
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

    var toQuery = function (params) {
      var str = '?';
      Object.keys(params).forEach(function (key) {
        str += key + '=' + encodeURIComponent(params[key]) + '&';
      });
      return str.slice(0, -1);
    };

    return function () {
      this.actions = getActions($window.location.pathname);
      this.queries = getQueries($window.location.search);
    };
  }]);
