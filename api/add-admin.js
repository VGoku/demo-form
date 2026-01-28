import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({  error: "Method not allowed"});
    }

    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: "Missing email"});
    }

    const supabase = createClient(
        "https://your-supabase-url.supabase.co",
        process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    try {
        const { error} = await supabase
        .from("admins")
        .insert([{ email }]);

        if (error ) {
            return res.status(500).json({ error: "Database error"});
        }

        return res.status(200).json({ error: "Admin added successfully"});
    } catch (err) {
        return res.status(500).json({ error: "Server error" });
    }
}