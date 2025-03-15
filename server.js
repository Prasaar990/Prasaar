const express = require("express");
const path = require("path");

const app = express();

// Serve static files from "dist" (Vite's build output folder)
app.use(express.static(path.join(__dirname, "dist")));

// Catch-all route to serve React's index.html for any frontend route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
