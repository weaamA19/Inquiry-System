// api/submit.js
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if(req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'POST') {
    try {
      const payload = req.body;

      const scriptURL = 'https://script.google.com/macros/s/AKfycbwvQL5Lyv-g_tNOStR9IwsKJjbeH71O2TIyroheO0AAwTDvvc-aDL-lGoPLIehWJaKp/exec';

      const response = await fetch(scriptURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const text = await response.text();

      return res.status(200).json({ success: true, message: text });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: 'Server Error' });
    }
  } else {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
