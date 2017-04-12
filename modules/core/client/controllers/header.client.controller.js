(function () {
  'use strict';

  angular
    .module('root.core')
    .controller('RootHeaderController', RootHeaderController);

  RootHeaderController.$inject = ['$scope', '$state', 'Authentication', 'menuService', 'MicroAppsService'];

  function RootHeaderController($scope, $state, Authentication, menuService, MicroAppsService) {

    $scope.$state = $state;

    var vm = this;

    vm.microapps = MicroAppsService.query();

    vm.accountMenu = menuService.getMenu('account').items[0];
    vm.authentication = Authentication;
    vm.isCollapsed = false;
    vm.menu = menuService.getMenu('topbar');

    $scope.$on('$stateChangeSuccess', stateChangeSuccess);

    function stateChangeSuccess() {
      // Collapsing the menu after navigation
      vm.isCollapsed = false;
    }





    vm.getRootAppUrl = function (state, params) {
      params = params || {};
      return '/'+$state.href(state, params, {absolute: false});
    };

    vm.isMenuActive = function (microapp) {

      var active = false;

      if (microAppConfig && microAppConfig.title === microapp.title) {
        active = true;
      }

      return active;
    };



    vm.isSideMenuClosed = false;

    vm.toggleSideMenu =function () {
      vm.isSideMenuClosed = !vm.isSideMenuClosed;

      var wrapper = angular.element(document.querySelector(".wrapper"));
      wrapper.toggleClass("active");
      console.log(wrapper);

    };


  }
}());
