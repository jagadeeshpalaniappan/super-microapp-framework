(function () {
  'use strict';

  angular
    .module('root.articles.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.microapps', {
        abstract: true,
        url: '/microapps',
        template: '<ui-view/>'
      })
      .state('admin.microapps.list', {
        url: '',
        templateUrl: '/modules/microapps/client/views/admin/list-articles.client.view.html',
        controller: 'MicroAppsAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.microapps.create', {
        url: '/create',
        templateUrl: '/modules/microapps/client/views/admin/form-article.client.view.html',
        controller: 'MicroAppsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          articleResolve: newArticle
        }
      })
      .state('admin.microapps.edit', {
        url: '/:articleId/edit',
        templateUrl: '/modules/microapps/client/views/admin/form-article.client.view.html',
        controller: 'MicroAppsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          articleResolve: getArticle
        }
      });
  }

  getArticle.$inject = ['$stateParams', 'MicroAppsService'];

  function getArticle($stateParams, MicroAppsService) {
    return MicroAppsService.get({
      articleId: $stateParams.articleId
    }).$promise;
  }

  newArticle.$inject = ['MicroAppsService'];

  function newArticle(MicroAppsService) {
    return new MicroAppsService();
  }
}());
