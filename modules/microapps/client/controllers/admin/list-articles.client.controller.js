(function () {
  'use strict';

  angular
    .module('root.articles.admin')
    .controller('MicroAppsAdminListController', MicroAppsAdminListController);

  MicroAppsAdminListController.$inject = ['MicroAppsService'];

  function MicroAppsAdminListController(MicroAppsService) {
    var vm = this;

    vm.articles = MicroAppsService.query();
  }
}());
