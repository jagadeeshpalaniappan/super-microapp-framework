(function (app) {
  'use strict';

  app.registerModule('root.microapps', ['root.core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('root.microapps.admin', ['root.core.admin']);
  app.registerModule('root.microapps.admin.routes', ['root.core.admin.routes']);
  app.registerModule('root.microapps.services');
  app.registerModule('root.microapps.routes', ['ui.router', 'root.core.routes', 'root.microapps.services']);
}(RootApplicationConfiguration));
