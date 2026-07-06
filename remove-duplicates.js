import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
// Note: We need service_role key to bypass RLS for deletes without user context,
// but let's try with anon key assuming RLS is disabled as per previous steps.
const supabase = createClient(supabaseUrl, supabaseKey);

async function removeDuplicates() {
  console.log("Memulai penghapusan data duplikat...");

  try {
    // 1. Bersihkan Services
    const { data: services } = await supabase.from("services").select("*");
    if (services) {
      const seen = new Set();
      const toDelete = [];
      for (const s of services) {
        if (seen.has(s.name)) {
          toDelete.push(s.id);
        } else {
          seen.add(s.name);
        }
      }
      if (toDelete.length > 0) {
        await supabase.from("services").delete().in("id", toDelete);
        console.log(`✅ Menghapus ${toDelete.length} service duplikat.`);
      } else {
        console.log(`✅ Tidak ada service duplikat.`);
      }
    }

    // 2. Bersihkan Barbers
    const { data: barbers } = await supabase.from("barbers").select("*");
    if (barbers) {
      const seen = new Set();
      const toDelete = [];
      for (const b of barbers) {
        if (seen.has(b.name)) {
          toDelete.push(b.id);
        } else {
          seen.add(b.name);
        }
      }
      if (toDelete.length > 0) {
        await supabase.from("barbers").delete().in("id", toDelete);
        console.log(`✅ Menghapus ${toDelete.length} barber duplikat.`);
      } else {
        console.log(`✅ Tidak ada barber duplikat.`);
      }
    }

    // 3. Bersihkan Customers
    const { data: customers } = await supabase.from("customers").select("id, Email");
    if (customers) {
      const seen = new Set();
      const toDelete = [];
      for (const c of customers) {
        // Abaikan data yang Email-nya null atau kosong
        if (!c.Email) continue; 
        
        if (seen.has(c.Email)) {
          toDelete.push(c.id);
        } else {
          seen.add(c.Email);
        }
      }
      if (toDelete.length > 0) {
        // Kita gunakan batch karena data mungkin banyak
        for (let i = 0; i < toDelete.length; i += 100) {
          const batch = toDelete.slice(i, i + 100);
          await supabase.from("customers").delete().in("id", batch);
        }
        console.log(`✅ Menghapus ${toDelete.length} customer duplikat (berdasarkan Email).`);
      } else {
        console.log(`✅ Tidak ada customer duplikat.`);
      }
    }

    console.log("🎉 Pembersihan selesai!");
  } catch (err) {
    console.error("Terjadi kesalahan:", err);
  }
}

removeDuplicates();
