import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Pastikan VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY ada di file .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const jsonPath = path.join(__dirname, "src", "data", "datacustomers.json");

async function runImport() {
  try {
    console.log("Membaca file JSON...");
    const rawData = fs.readFileSync(jsonPath, "utf8");
    const customers = JSON.parse(rawData);
    
    console.log(`Ditemukan ${customers.length} data customer. Memulai import ke Supabase...`);

    const batchSize = 100;
    for (let i = 0; i < customers.length; i += batchSize) {
      const batch = customers.slice(i, i + batchSize);
      
      // MAPPING DATA: menyesuaikan JSON dengan kolom tabel customers yang sudah ada
      const mappedBatch = batch.map(c => ({
        // id: Kita biarkan kosong agar Supabase yang generate UUID otomatis
        name: c.Nama_Lengkap,
        email: c.Email,
        "Jenis_Kelamin": c.Jenis_Kelamin,
        "Tanggal_Lahir": c.Tanggal_Lahir,
        "No_HP": c.No_HP,
        "Kota": c.Kota,
        "Tanggal_Daftar": c.Tanggal_Daftar,
        "Status_Member": c.Status_Member,
        "Level_Membership": c.Level_Membership,
        "Total_Transaksi": c.Total_Transaksi,
        "Total_Pengeluaran": c.Total_Pengeluaran,
        "Service_Favorit": c.Service_Favorit,
        "Transaksi_Terakhir": c.Transaksi_Terakhir,
        "Metode_Pembayaran": c.Metode_Pembayaran,
        "Sumber_User": c.Sumber_User,
        "Subscription": c.Subscription,
        "Rating": c.Rating,
        "Jumlah_Komplain": c.Jumlah_Komplain,
        "Status_Aktif": c.Status_Aktif
      }));
      
      const { data, error } = await supabase
        .from("customers") 
        .insert(mappedBatch);

      if (error) {
        console.error(`❌ Gagal pada batch ke-${i / batchSize + 1}:`, error.message);
      } else {
        console.log(`✅ Berhasil import data ke-${i + 1} sampai ${i + batch.length}`);
      }
    }

    console.log("🎉 Import selesai!");
  } catch (err) {
    console.error("Terjadi kesalahan:", err);
  }
}

runImport();
