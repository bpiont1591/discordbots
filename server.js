// server.js
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

// 🌟 Przykładowa baza kluczy licencyjnych w pamięci
// Każdy klucz można użyć tylko raz
const licenses = {
  "KLUCZ_TESTOWY_1": { used: false },
  "KLUCZ_TESTOWY_2": { used: false },
};

app.post("/verify", (req, res) => {
  const { key } = req.body;

  if (!key) return res.json({ valid: false, reason: "Brak klucza" });

  const license = licenses[key];

  if (!license) return res.json({ valid: false, reason: "Niepoprawny klucz" });
  if (license.used) return res.json({ valid: false, reason: "Klucz już użyty" });

  // Oznacz klucz jako użyty
  license.used = true;

  res.json({ valid: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Licencje API działa na porcie ${PORT}`));
