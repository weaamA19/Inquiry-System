// api/submit.js
export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const payload = req.body; // This is the form data from frontend

      // Forward data to your Google Apps Script Web App
      const scriptURL = 'https://script.google.com/macros/s/AKfycbwWj9xOFoek9gQs_x2k3BDT7PWdg7Gtv-Dw3MvobBOJ8IMs6ju_5tK6kcIuDCeruDGG/exec'; 

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
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
