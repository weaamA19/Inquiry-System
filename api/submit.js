export default async function handler(req, res) {
  // CORS setup
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      const payload = req.body;

      const scriptURL =
        'https://script.google.com/macros/s/AKfycbzp-nvOwAH2B5PVCkryE58m-r7e7lU1jVw5iGC7NRevgevnCc-8lhIc3hs5IdpF7u0a/exec';

      const response = await fetch(scriptURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      // Try to parse JSON if available
      let resultText = await response.text();
      let resultJson;
      try {
        resultJson = JSON.parse(resultText);
      } catch {
        resultJson = null;
      }

      // Checking if Google Script returned success
      if (response.ok && (resultJson?.success || /success/i.test(resultText))) {
        return res.status(200).json({
          success: true,
          message: resultJson?.message || resultText,
        });
      } else {
        return res.status(500).json({
          success: false,
          message: resultJson?.message || resultText || 'Google Script error',
        });
      }
    } catch (err) {
      console.error('Error forwarding request:', err);
      return res.status(500).json({
        success: false,
        message: 'Server Error: ' + err.message,
      });
    }
  }
  return res.status(405).json({
    success: false,
    message: 'Method Not Allowed',
  });
}
