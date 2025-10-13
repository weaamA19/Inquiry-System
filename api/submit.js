export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Handle POST request
  if (req.method === 'POST') {
    try {
      const payload = req.body;

      const scriptURL = 'https://script.google.com/macros/s/AKfycbw5E2FCIA7BxYXTF0iiD_jxPPx0lCxy7GjGpU8KGjWSldzYcPna7xk0ptJU8P3E6P9I/exec';

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

  // Handle unsupported methods
  return res.status(405).json({
    success: false,
    message: 'Method Not Allowed',
  });
}
