// api/submit.js
export default async function handler(req, res) {
  // Always set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*'); // allow all origins
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      const payload = req.body;

      // Forward data to Google Apps Script Web App
      const scriptURL = 'https://script.google.com/macros/s/AKfycbya36o0hx6K6DRXPYYlTsuUPb-rTQisHpCpN0z3zkW3visrV2YrN25FuLBYs-VyO77B/exec';

      const response = await fetch(scriptURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const text = await response.text();

      return res.status(200).json({ success: true, message: text });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: err.message });
    }
  } else {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
