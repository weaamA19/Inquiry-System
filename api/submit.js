export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      const payload = req.body;
      const scriptURL = 'https://script.google.com/macros/s/AKfycbz-5psIRr0zj2YT6VWHnpvJCxRLq9256GvgEsNOQw4rWOdSQ2CBk8WoS-SXuQhodGin/exec';

      const response = await fetch(scriptURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const text = await response.text();

      return res.status(200).json({
        success: true,
        message: text,
      });
    } catch (err) {
      console.error('Error forwarding request:', err);
      return res.status(500).json({
        success: false,
        message: 'Server Error',
      });
    }
  }
  return res.status(405).json({
    success: false,
    message: 'Method Not Allowed',
  });
}
