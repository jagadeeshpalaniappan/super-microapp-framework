'use strict';

module.exports = function (app) {
  // Root routing
  var core = require('../controllers/core.server.controller');

  // Define error pages
  app.route('/server-error').get(core.renderServerError);
  app.route('/auth').get(core.renderAuthApp);

  // Return a 404 for all undefined api, module or lib routes
  app.route('/:url(api|modules|lib)/*').get(core.renderNotFound);


  // ****** Micro App Config *******

  // Request Proxy : for handling HTML content
  app.route('/mapp/:mappId').get(core.renderMicroAppIndex);

  // Express Request Proxy : for handling all other request except getting html content
  // GET:
  app.route('/mapp/:mappId/*').get(core.proxyAllMicroAppRequest);

  // Handle (POST, PUT, DELETE) Proxy Request --before bodyParser initialization
  /*
  app.route('/mapp/:mappId/!*')
    .post(core.proxyAllMicroAppRequest)
    .put(core.proxyAllMicroAppRequest)
    .delete(core.proxyAllMicroAppRequest);
  */


  // Define application route
  app.route('/*').get(core.renderIndex);
};
