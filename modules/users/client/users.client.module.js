(function (app) {
  'use strict';

  app.registerModule('root.users');
  app.registerModule('root.users.admin');
  app.registerModule('root.users.admin.routes', ['ui.router', 'root.core.routes', 'root.users.admin.services']);
  app.registerModule('root.users.admin.services');
  app.registerModule('root.users.routes', ['ui.router', 'root.core.routes']);
  app.registerModule('root.users.services');
}(RootApplicationConfiguration));
