(function (app) {
  'use strict';

  app.registerModule('root.core');
  app.registerModule('root.core.routes', ['ui.router']);
  app.registerModule('root.core.admin', ['root.core']);
  app.registerModule('root.core.admin.routes', ['ui.router']);
}(RootApplicationConfiguration));
