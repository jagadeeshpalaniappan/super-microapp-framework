(function () {
  'use strict';

  angular
    .module('root.articles.admin')
    .controller('ArticlesAdminListController', ArticlesAdminListController);

  ArticlesAdminListController.$inject = ['MicroAppsService'];

  function ArticlesAdminListController(MicroAppsService) {
    var vm = this;

    vm.articles = MicroAppsService.query();
  }
}());
