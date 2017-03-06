(function (app) {
  'use strict';

  app.registerModule('root.chat', ['root.core']);
  app.registerModule('root.chat.routes', ['ui.router', 'root.core.routes']);
}(RootApplicationConfiguration));
