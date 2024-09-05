const axios = require('axios');
const fs = require('fs');
const path = require('path');
const soap = require('soap');

// Function to save the last 3 responses in a single file
const saveResponsesToFile = (fileName, apiName, apiResponse) => {
  const filePath = path.join(__dirname, '../public/responses', fileName);
  let fileData = {};

  // Check if file already exists
  if (fs.existsSync(filePath)) {
    try {
      // Read and parse existing file
      fileData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    } catch (error) {
      // console.error(`Error reading or parsing ${fileName}:`, error.message);
      fileData = {}; // Reset to an empty object on error
    }
  }

  // If no previous data for this API, initialize it
  if (!fileData[apiName]) {
    fileData[apiName] = {
      request: apiResponse.request,
      response: []
    };
  }

  // Maintain only the last 3 responses
  if (fileData[apiName].response.length >= 3) {
    fileData[apiName].response.shift();
  }

  // Add the new response to the list
  fileData[apiName].response.push({
    timestamp: apiResponse.timestamp,
    response: apiResponse.response || 'No response data' // Handle empty or null responses
  });

  try {
    // Write updated data back to file
    fs.writeFileSync(filePath, JSON.stringify(fileData, null, 2));
    console.log(`Response saved for ${apiName}`);
  } catch (error) {
    console.error(`Error writing to ${fileName}:`, error.message);
  }
};

// Function to hit APIs and save responses
const hitRestAPIs = async (apiList, fileName) => {
  for (const api of apiList) {
    try {
      const response = await axios({
        method: api.method,
        url: api.url,
        headers: api.headers,
        data: api?.data || {}
      });

      const apiResponse = {
        timestamp: Date.now(),
        request: api,
        response: response.data
      };
      saveResponsesToFile(fileName, api.name, apiResponse);

    } catch (error) {
      console.error(`Error hitting ${api.name}:`, error.message);
    }
  }
};
const hitSoapAPIs = async (apiList, fileName) => {
  for (const api of apiList) {
    try {
      // Create SOAP client
      const client = await soap.createClientAsync(api.url);
      console.log(`SOAP Client created for ${api.url}`);

      // Call the SOAP method using named parameters
      const [result] = await client[api.method + 'Async'](api.data);
      console.log('SOAP created response for', result);

      const apiResponse = {
        timestamp: Date.now(),
        request: api,
        response: result // SOAP response
      };

      saveResponsesToFile(fileName, api.name, apiResponse);
    } catch (error) {
      console.error(`Error hitting ${api.name}:`, error.message);
    }
  }
};



module.exports = {
  hitRestAPIs,
  hitSoapAPIs
};
