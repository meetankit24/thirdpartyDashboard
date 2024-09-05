const express = require('express');
const { scheduleAPIs } = require('./controllers/apiController');
const apiRoutes = require('./routes/apiRoutes');
const cors = require("cors")
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors())

app.use(express.static('public'));
app.use('/api', apiRoutes);

// Start the cron job
scheduleAPIs();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
