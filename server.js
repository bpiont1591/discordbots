const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// przykładowa baza kluczy w pamięci
const licenses = { "ABC123": true, "DEF456": true };

app.get("/verify", (req, res) => {
  const key = req.query.key;
  if (!key) return res.json({ valid: false });
  res.json({ valid: licenses[key] || false });
});

app.listen(PORT, () => console.log(`✅ Serwer licencji działa na porcie ${PORT}`));

