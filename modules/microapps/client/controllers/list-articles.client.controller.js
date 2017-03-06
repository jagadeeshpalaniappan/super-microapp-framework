(function () {
  'use strict';

  angular
    .module('root.articles')
    .controller('MicroAppsListController', MicroAppsListController);

  MicroAppsListController.$inject = ['MicroAppsService'];

  function MicroAppsListController(MicroAppsService) {
    var vm = this;

    vm.articles = MicroAppsService.query();
  }
}());
