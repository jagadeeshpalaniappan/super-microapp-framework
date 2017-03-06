(function () {
  'use strict';

  angular
    .module('root.microapps')
    .controller('MicroAppsController', MicroAppsController);

  MicroAppsController.$inject = ['$scope', 'microAppResolve', 'Authentication'];

  function MicroAppsController($scope, article, Authentication) {
    var vm = this;

    vm.microApp = article;
    vm.authentication = Authentication;

  }
}());
