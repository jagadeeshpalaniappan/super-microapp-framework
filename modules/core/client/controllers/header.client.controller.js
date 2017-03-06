(function () {
  'use strict';

  angular
    .module('root.core')
    .controller('RootHeaderController', RootHeaderController);

  RootHeaderController.$inject = ['$scope', '$state', 'Authentication', 'menuService', 'MicroAppsService'];

  function RootHeaderController($scope, $state, Authentication, menuService, MicroAppsService) {
    var vm = this;

    vm.articles = MicroAppsService.query();

    vm.accountMenu = menuService.getMenu('account').items[0];
    vm.authentication = Authentication;
    vm.isCollapsed = false;
    vm.menu = menuService.getMenu('topbar');

    $scope.$on('$stateChangeSuccess', stateChangeSuccess);

    function stateChangeSuccess() {
      // Collapsing the menu after navigation
      vm.isCollapsed = false;
    }
  }
}());
