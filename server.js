import express from "express";
import fs from "fs";

const app = express();
app.use(express.json());

// Licencje w JSON – możesz też trzymać w bazie danych.
const licenses = JSON.parse(fs.readFileSync("licenses.json"));

app.post("/verify", (req, res) => {
  const { license_key, guild_id, ip } = req.body;

  const lic = licenses.find(l => l.key === license_key);
  if (!lic) return res.json({ valid: false, reason: "Invalid license" });

  if (lic.guild_id !== guild_id)
    return res.json({ valid: false, reason: "Unauthorized guild" });

  if (lic.blocked)
    return res.json({ valid: false, reason: "License revoked" });

  return res.json({ valid: true });
});

app.listen(3000, () => console.log("License server running on port 3000"));
