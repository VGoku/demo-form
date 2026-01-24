import express from "express";
import { createClient } from "@supabase/supabase-js";

console.log("Contact.js loaded");

const router = express.Router();

router.post("/", async (req, res) => {
  console.log("Route env URL:", process.env.SUPABASE_URL);
  console.log("Route env KEY:", process.env.SUPABASE_KEY ? "YES" : "NO");

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
  );

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields required." });
  }

  const { error } = await supabase
    .from("messages")
    .insert([{ name, email, message }]);

  if (error) {
    console.error("Supabase error:", error);
    return res.status(500).json({ message: "Database error" });
  }

  // Redirect to thank-you page
  res.redirect("/thankyou.html");
});

export default router;