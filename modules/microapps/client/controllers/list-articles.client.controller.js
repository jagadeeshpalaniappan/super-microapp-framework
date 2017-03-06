(function () {
  'use strict';

  angular
    .module('root.articles')
    .controller('ArticlesListController', ArticlesListController);

  ArticlesListController.$inject = ['MicroAppsService'];

  function ArticlesListController(MicroAppsService) {
    var vm = this;

    vm.articles = MicroAppsService.query();
  }
}());
