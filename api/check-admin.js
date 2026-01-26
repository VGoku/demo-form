// api/check-admin.js

import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { access_token } = req.body;

  if (!access_token) {
    return res.status(400).json({ error: "Missing access token" });
  }

  // Create Supabase client with SERVICE ROLE KEY
  // IMPORTANT: This key must be stored in Vercel environment variables
  const supabase = createClient(
    "https://cgyfugkijgjjuxhjckro.supabase.co",
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  try {
    // 1. Get the user from the token
    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser(access_token);

    if (userError || !user) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    const email = user.email;

    // 2. Check if this email exists in the admins table
    const { data: adminRecord, error: adminError } = await supabase
      .from("admins")
      .select("*")
      .eq("email", email)
      .maybeSingle();

    if (adminError) {
      return res.status(500).json({ error: "Database error" });
    }

    // 3. Return admin status
    const isAdmin = !!adminRecord;

    return res.status(200).json({ isAdmin });
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
}