(function () {
  'use strict';

  angular
    .module('root.articles.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('microapps', {
        abstract: true,
        url: '/microapps',
        template: '<ui-view/>'
      })
      .state('microapps.list', {
        url: '',
        templateUrl: '/modules/microapps/client/views/list-articles.client.view.html',
        controller: 'ArticlesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Micro Apps List'
        }
      })
      .state('microapps.view', {
        url: '/:articleId',
        templateUrl: '/modules/microapps/client/views/view-article.client.view.html',
        controller: 'ArticlesController',
        controllerAs: 'vm',
        resolve: {
          articleResolve: getArticle
        },
        data: {
          pageTitle: 'Article {{ articleResolve.title }}'
        }
      });
  }

  getArticle.$inject = ['$stateParams', 'ArticlesService'];

  function getArticle($stateParams, ArticlesService) {
    return ArticlesService.get({
      articleId: $stateParams.articleId
    }).$promise;
  }
}());
