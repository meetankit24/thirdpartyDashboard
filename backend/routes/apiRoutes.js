const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Route to get all SOAP API responses
router.get('/responses/soap', (req, res) => {
  const filePath = path.join(__dirname, '../public/responses/soapResponses.json');
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    res.json(data);
  } else {
    res.status(404).send('No SOAP API responses found.');
  }
});

// Route to get all REST API responses
router.get('/responses/rest', (req, res) => {
  const filePath = path.join(__dirname, '../public/responses/restResponses.json');
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    res.json(data);
  } else {
    res.status(404).send('No REST API responses found.');
  }
});

module.exports = router;
