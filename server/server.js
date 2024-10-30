require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mediaRoutes = require("./routes");

const app = express();

// Allow multiple origins for CORS
const allowedOrigins = [
  process.env.CLIENT_URL,
  "https://lms-platform-client.vercel.app",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.error(`Blocked by CORS: Origin '${origin}' is not allowed.`);
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,  // Add this if client uses credentials
  })
);

app.use(express.json());

// Routes configuration
app.use("/media", mediaRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong",
  });
});

// Export the app as a module for Vercel
module.exports = app;
