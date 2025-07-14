const express = require("express");
const app = express();

// Route gốc
app.get("/", (req, res) => {
  res.send("✅ Tracking server is running. Use /track?ref=abc&url=https://example.com");
});

// Route tracking
app.get("/track", (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const ua = req.headers["user-agent"];
  const ref = req.query.ref || "no-ref";
  const redirectUrl = req.query.url || "https://google.com";

  console.log("== NEW CLICK ==");
  console.log(`IP: ${ip}`);
  console.log(`User-Agent: ${ua}`);
  console.log(`Ref: ${ref}`);
  console.log(`Redirect to: ${redirectUrl}`);
  console.log("====================");

  res.redirect(redirectUrl);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
