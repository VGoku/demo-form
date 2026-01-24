import dotenv from "dotenv";
dotenv.config();

console.log("TEST URL:", process.env.SUPABASE_URL);
console.log("TEST KEY:", process.env.SUPABASE_KEY ? "YES" : "NO");