'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  MicroApp = mongoose.model('MicroApp'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

var appcache = require('../../../../config/lib/appcache');

/**
 * Create an article
 */
exports.create = function (req, res) {
  var article = new MicroApp(req.body);
  article.user = req.user;

  article.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(article);

      // Update Cache ::
      appcache.updateMicroAppsConfigCache();
    }
  });
};

/**
 * Show the current article
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var article = req.article ? req.article.toJSON() : {};

  // Add a custom field to the MicroApp, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the MicroApp model.
  article.isCurrentUserOwner = !!(req.user && article.user && article.user._id.toString() === req.user._id.toString());

  res.json(article);
};

/**
 * Update an article
 */
exports.update = function (req, res) {
  var article = req.article;

  article.title = req.body.title;
  article.content = req.body.content;

  article.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(article);

      // Update Cache ::
      appcache.updateMicroAppsConfigCache();
    }
  });
};

/**
 * Delete an article
 */
exports.delete = function (req, res) {
  var article = req.article;

  article.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(article);

      // Update Cache ::
      appcache.updateMicroAppsConfigCache();
    }
  });
};

/**
 * List of Articles
 */
exports.list = function (req, res) {
  MicroApp.find().sort('-created').populate('user', 'displayName').exec(function (err, microapps) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(microapps);
    }
  });
};

/**
 * MicroApp middleware
 */
exports.articleByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'MicroApp is invalid'
    });
  }

  MicroApp.findById(id).populate('user', 'displayName').exec(function (err, article) {
    if (err) {
      return next(err);
    } else if (!article) {
      return res.status(404).send({
        message: 'No article with that identifier has been found'
      });
    }
    req.article = article;
    next();
  });
};
