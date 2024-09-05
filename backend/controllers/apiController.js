const cron = require('node-cron');
const {hitSoapAPIs, hitRestAPIs } = require('../services/apiService');
const apisConfig = require('../config/apiConfig');

const scheduleAPIs = () => {
  cron.schedule('* * * * *', () => {
    console.log('Running API tasks...');
    hitSoapAPIs(apisConfig.soapApis, 'soapResponses.json');
    hitRestAPIs(apisConfig.restApis, 'restResponses.json');
  });
};

module.exports = {
  scheduleAPIs
};
