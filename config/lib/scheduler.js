'use strict';

/**
 * Module dependencies.
 */
var config = require('../config'),
  chalk = require('chalk');

var cron = require('node-cron');
var mongoose = require('mongoose');
var appcache = require('./appcache');


var _setupMicroAppsCache = function (){

  console.log(' ::: Setting Up MicroApps Cache :::');
  appcache.updateMicroAppsConfigCache();

  cron.schedule('* * * * *', function(){
    console.log(' ::: Setting Up MicroApps Cache -- every minute :::');
    appcache.updateMicroAppsConfigCache();
  });

};


// schedule All DBJobs
module.exports.scheduleAllDBJobs = function () {

  _setupMicroAppsCache();

};
