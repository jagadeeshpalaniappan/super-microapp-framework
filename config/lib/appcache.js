'use strict';

/**
 * Module dependencies.
 */
var config = require('../config'),
  chalk = require('chalk');

var cache = require('memory-cache');
var mongoose = require('mongoose');
var MicroApp = {};


var _updateMicroAppsConfigCache = function () {

  var MicroApp = mongoose.model('MicroApp');

  MicroApp.find().sort('-created').populate('user', 'displayName').exec(function (err, allMicroAppsConfig) {
    if (err) {
      // err getting micro apps config --from db
    } else {
      // got the latest micro app configuration --from db
      // Cache them
      cache.put('allMicroAppsConfig', allMicroAppsConfig);
    }
  });

};

// schedule All DBJobs
module.exports.updateMicroAppsConfigCache = _updateMicroAppsConfigCache;
