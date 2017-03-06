(function () {
  'use strict';

  angular
    .module('root.articles')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Articles',
      state: 'microapps',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'microapps', {
      title: 'List Articles',
      state: 'microapps.list',
      roles: ['*']
    });
  }
}());
