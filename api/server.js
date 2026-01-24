import dotenv from "dotenv";
dotenv.config();

console.log("THIS IS THE REAL SERVER.JS");
console.log("Loaded URL:", process.env.SUPABASE_URL);
console.log("Loaded KEY:", process.env.SUPABASE_KEY ? "YES" : "NO");

import express from "express";
import contactRouter from "./contact.js";

const app = express();

// Allow JSON (if you ever use JS frontend)
app.use(express.json());

// Allow HTML form submissions (NO frontend JS needed)
app.use(express.urlencoded({ extended: true }));

// Serve your frontend files
app.use(express.static("../"));

app.use("/api/contact", contactRouter);

app.listen(3000, () => console.log("Server running on port 3000"));