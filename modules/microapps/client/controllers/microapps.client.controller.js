(function () {
  'use strict';

  angular
    .module('root.articles')
    .controller('MicroAppsController', MicroAppsController);

  MicroAppsController.$inject = ['$scope', 'articleResolve', 'Authentication'];

  function MicroAppsController($scope, article, Authentication) {
    var vm = this;

    vm.microApp = article;
    vm.authentication = Authentication;

  }
}());
