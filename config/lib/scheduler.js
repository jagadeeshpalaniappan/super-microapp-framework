'use strict';

/**
 * Module dependencies.
 */
var config = require('../config'),
  chalk = require('chalk');

var cron = require('node-cron');
var cache = require('memory-cache');

cron.schedule('* * * * *', function(){
  console.log('running a task every minute');
});

var _getConfiguredMicroAppsFromDb = function (){

  var allMicroApps = [
    {
      "_id": "58a0243a327f030994df4776",
      "user": {
        "_id": "58a00cf0444b7b12786d5168",
        "displayName": "Admin User"
      },
      "__v": 0,
      "content": "http://localhost:4000",
      "title": "mapp1",
      "created": "2017-02-12T09:00:42.369Z"
    }
  ];



  return allMicroApps;


};


var _setupMicroAppsCache = function () {

  var allMicroAppsConfig = _getConfiguredMicroAppsFromDb();
  cache.put('allMicroAppsConfig', allMicroAppsConfig);

};

var _microAppJob = function (){

  console.log(' ::: Setting Up MicroApps Cache :::');
  _setupMicroAppsCache();

  cron.schedule('* * * * *', function(){
    console.log(' ::: Setting Up MicroApps Cache -- every minute :::');
    _setupMicroAppsCache();
  });

};


// schedule All DBJobs
module.exports.scheduleAllDBJobs = function () {

  _microAppJob();

};
