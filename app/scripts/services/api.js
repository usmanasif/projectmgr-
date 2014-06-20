'use strict';

angular.module('projectmgrApp')
  .service('Api', ['$http', '$q', function ($http, $q, endpoint, params){
    this.get = function(endpoint, params) {
      var deferred = $q.defer();
      $http({
        url: endpoint,
        method: "GET",
        headers: {
          'content-type':'application/json'
        },
        params: params
      }).
      success(function(data, status, headers, config) {
        console.log('success');
        //console.log(data);
        deferred.resolve({'status': status, 'data' : data});
      }).
      error(function(data, status, headers, config) {
        console.log('failed');
        deferred.resolve(data);
      });
      return deferred.promise;
    };
    this.post = function(endpoint, params) {
      var deferred = $q.defer();
      console.log(params)
      $http({
        url: endpoint,
        method: "POST",
        headers: {
          'content-type':'application/json'
        },
        data: {'data': params}
      }).
      success(function(data, status, headers, config) {
        console.log('success');
        console.log(data)
        deferred.resolve({'status': status, 'data' : data});
      }).
      error(function(data, status, headers, config) {
        console.log('failed');
        deferred.resolve(data);
      });
      return deferred.promise;
    };
    this.put = function(endpoint, params) {
      var deferred = $q.defer();
      $http({
        url: endpoint,
        method: "PUT",
        headers: {
          'content-type':'application/json'
        },
        data: {'data': params}
        }).
        success(function(data, status, headers, config) {
          console.log('success');
          //console.log(data);
        deferred.resolve({'status': status, 'data' : data});
        }).
        error(function(data, status, headers, config) {
          console.log('failed');
          deferred.resolve(data);
        });
        return deferred.promise;
    };
    this.patch = function(endpoint, params) {
      var deferred = $q.defer();
      $http({
        url: endpoint,
        method: "PATCH",
        headers: {
          'content-type':'application/json'
        },
        data: {'data': params}
        }).
        success(function(data, status, headers, config) {
          console.log('success');
          //console.log(data);
        deferred.resolve({'status': status, 'data' : data});
        }).
        error(function(data, status, headers, config) {
          console.log('failed');
          deferred.resolve(data);
        });
        return deferred.promise;
    };
    this.del = function(endpoint, params) {
      var deferred = $q.defer();
      $http({
        url: endpoint,
        method: "DELETE",
        headers: {
          'content-type':'application/json'
        },
        data: {'data': params}
        }).
        success(function(data, status, headers, config) {
          console.log('success');
          //console.log(data['data']);
          deferred.resolve({'status': status, 'data' : data});
        }).
        error(function(data, status, headers, config) {
          console.log('failed');
          //console.log(data);
          deferred.resolve(data);
        });
        return deferred.promise;
    };
  }]);

  