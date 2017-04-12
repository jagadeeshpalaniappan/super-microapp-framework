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

    var wrapper = angular.element(document.querySelector(".wrapper"));

    vm.toggleSideMenu =function () {
      vm.isSideMenuClosed = !vm.isSideMenuClosed;
      wrapper.toggleClass("active");
    };

    vm.openSideMenu =function () {
      vm.isSideMenuClosed = false;
      wrapper.removeClass("active");
    };


    vm.toggleDropDown =function (item) {
      item.isCollapsed = !item.isCollapsed;
      vm.openSideMenu();
    };


    vm.isDropDownCollapsed = function (item) {

      if($state.includes(item.state)) {
        return false;
      }

      return item.isCollapsed;
    }

  }
}());
