'use strict';

var validator = require('validator'),
  path = require('path'),
  config = require(path.resolve('./config/config'));

var _ = require('lodash');
var parseUrl = require('url').parse;
var formatUrl = require('url').format;
var rp = require('request-promise');
var requestProxy = require('express-request-proxy');
var cache = require('memory-cache');


var _redirectFormattedUrl = function(req, res) {

  // append '/' --if not
  if (!req.path.endsWith('/')) {
    var url = parseUrl(req.url);
    url.pathname = url.pathname + '/';
    var newUrl = formatUrl(url);

    return res.redirect(301, newUrl);
  }

};

var _getSafeUserObject = function (req, res) {

  var safeUserObject = null;
  if (req.user) {
    safeUserObject = {
      displayName: validator.escape(req.user.displayName),
      provider: validator.escape(req.user.provider),
      username: validator.escape(req.user.username),
      created: req.user.created.toString(),
      roles: req.user.roles,
      profileImageURL: req.user.profileImageURL,
      email: validator.escape(req.user.email),
      lastName: validator.escape(req.user.lastName),
      firstName: validator.escape(req.user.firstName),
      additionalProvidersData: req.user.additionalProvidersData
    };
  }

  return safeUserObject;
};

/**
 * Render the main application page
 */
exports.renderIndex = function (req, res) {

  _redirectFormattedUrl(req, res);

  var safeUserObject = _getSafeUserObject(req, res);

  res.render('modules/core/server/views/index', {
    user: JSON.stringify(safeUserObject),
    sharedConfig: JSON.stringify(config.shared),
    isRootApp: true
  });
};


/**
 * Render the main application page
 */
exports.renderMicroAppIndex = function (req, res) {

  var microAppId = req.params.mappId;

  console.log('-------------------renderMicroAppIndex [' + microAppId + ']---------------------');

  _redirectFormattedUrl(req, res);

  // Common:
  var safeUserObject = _getSafeUserObject(req, res);

  // Micro Apps Configuration::
  // var mappsConfigured = [
  // {id:'mapp1', name:'Micro App1', uri: 'http://localhost:4000'},
  // {id:'mapp2', name:'Micro App2', uri: 'http://localhost:4000'}];

  var allMicroAppsConfig = cache.get('allMicroAppsConfig');

  // console.log('### allMicroAppsConfig');
  // console.log(allMicroAppsConfig);

  var requestedMicroAppConfig = _.find(allMicroAppsConfig, { 'title': microAppId });

  if (requestedMicroAppConfig) {

    // Requested Micro App (Found)

    var microAppHostUrl = 'http://localhost:4000';

    // Request Micro App --html
    var options = {
      method: 'GET',
      uri: microAppHostUrl,
      resolveWithFullResponse: true
    };

    rp(options)
      .then(function (response) {
        console.log('succeeded with status %d', response.statusCode);

        var microAppBody = response.body;

        res.render('modules/core/server/views/index', {
          user: safeUserObject ? JSON.stringify(safeUserObject) : null,
          sharedConfig: JSON.stringify(config.shared),
          microAppBody: microAppBody
        });


      })
      .catch(function (err) {
        // Request failed...

        var microAppBody = '<br><br><h1> Micro App Found, But its not responding :( </h1>';

        res.render('modules/core/server/views/index', {
          user: safeUserObject ? JSON.stringify(safeUserObject) : null,
          sharedConfig: JSON.stringify(config.shared),
          microAppBody: microAppBody
        });

      });

  } else {

    var microAppBody = '<br><br><h1> Micro App Not Found :( </h1>';

    res.render('modules/core/server/views/index', {
      user: safeUserObject ? JSON.stringify(safeUserObject) : null,
      sharedConfig: JSON.stringify(config.shared),
      microAppBody: microAppBody
    });

  }

};


exports.proxyAllMicroAppRequest = function (req, res, next) {

  console.log('-------------------proxyAllMicroAppRequest---------------------');

  var customHeader = {};

  var microAppHostUrl = 'http://localhost:4000';

  var options = {
    url: microAppHostUrl + '/*',
    timeout: 10000,
    headers: customHeader,
    originalQuery: req.originalUrl.indexOf('?') >= 0
  };

  requestProxy(options)(req, res, next);

};


/**
 * Render the server error page
 */
exports.renderServerError = function (req, res) {
  res.status(500).render('modules/core/server/views/500', {
    error: 'Oops! Something went wrong...'
  });
};

/**
 * Render the server not found responses
 * Performs content-negotiation on the Accept HTTP header
 */
exports.renderNotFound = function (req, res) {

  res.status(404).format({
    'text/html': function () {
      res.render('modules/core/server/views/404', {
        url: req.originalUrl
      });
    },
    'application/json': function () {
      res.json({
        error: 'Path not found'
      });
    },
    'default': function () {
      res.send('Path not found');
    }
  });
};
