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

      const scriptURL = 'https://script.google.com/macros/s/AKfycbzOq2cn7BsLhRhZfAtvIS7G7zoweRoHRPg5kXtZrQXr5zqWiraRAr2M-B3-Z_4_7qcm/exec';

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
