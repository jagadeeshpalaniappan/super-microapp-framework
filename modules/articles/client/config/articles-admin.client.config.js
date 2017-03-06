(function () {
  'use strict';

  // Configuring the Articles Admin module
  angular
    .module('root.articles.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Micro Apps',
      state: 'admin.articles.list'
    });
  }
}());
