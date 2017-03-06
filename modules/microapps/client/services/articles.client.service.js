(function () {
  'use strict';

  angular
    .module('root.articles.services')
    .factory('MicroAppsService', MicroAppsService);

  MicroAppsService.$inject = ['$resource', '$log'];

  function MicroAppsService($resource, $log) {
    var MicroApp = $resource('/api/articles/:microAppId', {
      microAppId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(MicroApp.prototype, {
      createOrUpdate: function () {
        var article = this;
        return createOrUpdate(article);
      }
    });

    return MicroApp;

    function createOrUpdate(article) {
      if (article._id) {
        return article.$update(onSuccess, onError);
      } else {
        return article.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(article) {
        // Any required internal processing from inside the service, goes here.
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }

    function handleError(error) {
      // Log error
      $log.error(error);
    }
  }
}());
