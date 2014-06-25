'use strict';

angular.module('projectmgrApp')
  .service('Headersauthinterceptor', ['$location', '$rootScope', '$q', '$window',
  function ($location, $rootScope, $q, $window) {
    return {
      request: function (config) {
        config.headers = config.headers || {}
        if ($window.sessionStorage.token) {
          config.headers.authenticity_token = $window.sessionStorage.token;
          // config.headers.AuthorizationUser = $window.sessionStorage.user;
        }
        return config;
      }
    };
  }]);
