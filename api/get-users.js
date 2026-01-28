import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed"});
    }

    const supabase= createClient(
        "https://your-supabase-url.supabase.co",
        process.env.SUPERBASE_SERVICE_ROLE_KEY
    );

    try {
        const { data, error} = await supabase.auth.admin.listUsers();

        if (error) {
            return res.status(500).json({  error: "Database error"});
        }

        return res.status(200).json({ users: data.users });
    } catch (err) {
        return res.status(500).json({ error: "Server error" });
    }
}