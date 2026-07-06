import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Pastikan VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY ada di file .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const initialBarbers = [
  { "name": "Andi", "status": true, "rating": 4.9, "experience": "5 Years", "image": "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=256&q=80" },
  { "name": "Budi", "status": true, "rating": 4.8, "experience": "3 Years", "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80" },
  { "name": "Candra", "status": false, "rating": 4.7, "experience": "4 Years", "image": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80" },
  { "name": "Dedi", "status": true, "rating": 4.6, "experience": "2 Years", "image": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=256&q=80" },
  { "name": "Eko", "status": true, "rating": 4.9, "experience": "6 Years", "image": "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=256&q=80" }
];

async function runImport() {
  try {
    console.log("Memulai import data barber ke Supabase...");
    
    // Matikan RLS sementara untuk import jika diperlukan
    // (Kamu bisa mematikannya manual di SQL Editor jika ini gagal karena RLS)
    
    const { data, error } = await supabase
      .from("barbers")
      .insert(initialBarbers);

    if (error) {
      console.error("❌ Gagal insert barber:", error.message);
      console.log("Tip: Pastikan tabel 'barbers' punya kolom: name, status, rating, experience, image");
      console.log("     Atau matikan RLS tabel 'barbers' sementara di SQL Editor.");
    } else {
      console.log("✅ Berhasil memasukkan 5 barber ke Supabase!");
    }
  } catch (err) {
    console.error("Terjadi kesalahan:", err);
  }
}

runImport();
