const express = require("express");
const app = express();
app.use(express.json());

const licenses = {
  "ABC-123-XYZ": { valid: true, owner: "Janek", expires: "2025-12-30" },
  "VIP-999-555": { valid: true, owner: "Kuba", expires: "2026-01-01" }
};

app.post("/api/license/verify", (req, res) => {
  const { license, botId } = req.body;

  if (!license || !licenses[license]) {
    return res.json({ valid: false, reason: "Brak licencji" });
  }

  const data = licenses[license];

  if (!data.valid) {
    return res.json({ valid: false, reason: "Licencja wyłączona" });
  }

  const now = Date.now();
  const exp = new Date(data.expires).getTime();

  if (exp < now) {
    return res.json({ valid: false, reason: "Licencja wygasła" });
  }

  return res.json({ valid: true });
});

app.listen(3000, () => console.log("🚀 Serwer licencji działa na porcie 3000"));
