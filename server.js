const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/track', async (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  let location = 'Unknown';

  try {
    const response = await axios.get(`https://ipinfo.io/${ip}?token=f4cb787524f38d`);
    location = response.data.city + ', ' + response.data.country;
  } catch (e) {
    console.error('Geo lookup failed:', e.message);
  }

  const log = {
    ip: ip,
    location: location,
    time: new Date().toISOString(),
    target: req.query.target || 'https://example.com'
  };

  console.log(log);
  res.redirect(log.target);
});

app.listen(PORT, () => {
  console.log(`Tracking server running at http://localhost:${PORT}`);
});