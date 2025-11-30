require("dotenv").config();
const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;

// Prosta baza licencji w pamięci (możesz przerzucić do bazy)
const licenses = {};

app.post("/generate", (req, res) => {
  const { key } = req.body;
  if (key !== API_KEY) return res.status(403).json({ error: "Invalid API key" });

  const newLicense = uuidv4();
  licenses[newLicense] = { used: false };
  return res.json({ license: newLicense });
});

app.post("/verify", (req, res) => {
  const { license } = req.body;
  if (!licenses[license]) return res.json({ valid: false, reason: "Nieznana licencja" });
  if (licenses[license].used) return res.json({ valid: false, reason: "Licencja już użyta" });

  licenses[license].used = true;
  return res.json({ valid: true });
});

app.listen(PORT, () => console.log(`✅ API licencji działa na porcie ${PORT}`));

