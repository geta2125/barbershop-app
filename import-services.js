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

const initialServices = [
  { "nama_service": "Haircut Classic", "kategori": "Haircut", "durasi": 30, "harga": 50000, "status": "Aktif", "gambar": "haircut-classic.jpg" },
  { "nama_service": "Fade Cut", "kategori": "Haircut", "durasi": 45, "harga": 70000, "status": "Aktif", "gambar": "fade-cut.jpg" },
  { "nama_service": "Undercut Style", "kategori": "Haircut", "durasi": 40, "harga": 65000, "status": "Aktif", "gambar": "undercut.jpg" },
  { "nama_service": "Buzz Cut", "kategori": "Haircut", "durasi": 20, "harga": 40000, "status": "Aktif", "gambar": "buzz-cut.jpg" },
  { "nama_service": "Pompadour Styling", "kategori": "Haircut", "durasi": 50, "harga": 80000, "status": "Aktif", "gambar": "pompadour.jpg" },
  { "nama_service": "Crew Cut", "kategori": "Haircut", "durasi": 30, "harga": 55000, "status": "Aktif", "gambar": "crew-cut.jpg" },
  { "nama_service": "Kids Haircut", "kategori": "Haircut", "durasi": 25, "harga": 35000, "status": "Aktif", "gambar": "kids.jpg" },
  { "nama_service": "Senior Haircut", "kategori": "Haircut", "durasi": 30, "harga": 40000, "status": "Aktif", "gambar": "senior.jpg" },
  { "nama_service": "Beard Trim", "kategori": "Grooming", "durasi": 20, "harga": 30000, "status": "Aktif", "gambar": "beard-trim.jpg" },
  { "nama_service": "Beard Styling", "kategori": "Grooming", "durasi": 30, "harga": 45000, "status": "Aktif", "gambar": "beard-style.jpg" },
  { "nama_service": "Shaving Clean", "kategori": "Grooming", "durasi": 25, "harga": 35000, "status": "Aktif", "gambar": "shaving.jpg" },
  { "nama_service": "Facial Treatment", "kategori": "Grooming", "durasi": 45, "harga": 90000, "status": "Aktif", "gambar": "facial.jpg" },
  { "nama_service": "Premium Grooming Package", "kategori": "Grooming", "durasi": 90, "harga": 180000, "status": "Aktif", "gambar": "premium.jpg" },
  { "nama_service": "Hair Coloring", "kategori": "Treatment", "durasi": 90, "harga": 150000, "status": "Aktif", "gambar": "hair-coloring.jpg" },
  { "nama_service": "Hair Spa", "kategori": "Treatment", "durasi": 60, "harga": 120000, "status": "Aktif", "gambar": "hair-spa.jpg" },
  { "nama_service": "Keratin Treatment", "kategori": "Treatment", "durasi": 120, "harga": 250000, "status": "Nonaktif", "gambar": "keratin.jpg" },
  { "nama_service": "Hair Mask Treatment", "kategori": "Treatment", "durasi": 60, "harga": 110000, "status": "Aktif", "gambar": "hair-mask.jpg" },
  { "nama_service": "Scalp Detox", "kategori": "Treatment", "durasi": 50, "harga": 100000, "status": "Aktif", "gambar": "scalp.jpg" },
  { "nama_service": "Anti Dandruff Treatment", "kategori": "Treatment", "durasi": 70, "harga": 130000, "status": "Aktif", "gambar": "dandruff.jpg" },
  { "nama_service": "Hair Rebonding", "kategori": "Treatment", "durasi": 120, "harga": 300000, "status": "Nonaktif", "gambar": "rebonding.jpg" }
];

async function runImport() {
  try {
    console.log("Memulai import data services ke Supabase...");
    
    // Mapping agar mengisi kolom "name" yang wajib ada di tabel lama
    const mappedServices = initialServices.map(s => ({
      ...s,
      name: s.nama_service // Mengisi kolom "name" yang required
    }));
    
    const { data, error } = await supabase
      .from("services")
      .insert(mappedServices);

    if (error) {
      console.error("❌ Gagal insert services:", error.message);
    } else {
      console.log("✅ Berhasil memasukkan 20 layanan ke Supabase!");
    }
  } catch (err) {
    console.error("Terjadi kesalahan:", err);
  }
}

runImport();
