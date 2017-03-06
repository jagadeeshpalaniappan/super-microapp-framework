(function (app) {
  'use strict';

  app.registerModule('root.articles', ['root.core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('root.articles.admin', ['root.core.admin']);
  app.registerModule('root.articles.admin.routes', ['root.core.admin.routes']);
  app.registerModule('root.articles.services');
  app.registerModule('root.articles.routes', ['ui.router', 'root.core.routes', 'root.articles.services']);
}(RootApplicationConfiguration));
