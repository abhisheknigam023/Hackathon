
'use strict';

const CronJob = require('cron').CronJob;
const notificationWorker = require('./notificationWorker');
const moment = require('moment');


const schedulerFactory = function() {
    return {
      start: function() {
        new CronJob('0 * * * * *', function() {
            //      *           *          *            *               *           *
            //	'second',   'minute',   'hour',    'dayOfMonth',   'month',    'dayOfWeek'

          console.log('Running Send Notifications Worker for ' + moment().format());
        //   notificationWorker.run();
          notificationWorker.execute();
          // const notificationWorker = require('./notificationWorker');
        }, null, true, '');
      },
    };
  };
  
  module.exports = schedulerFactory();
