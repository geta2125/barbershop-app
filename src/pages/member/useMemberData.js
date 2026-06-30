import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

export function useMemberData(phone) {
  const [loading, setLoading] = useState(true);
  const [member, setMember] = useState(null);
  const [myHistory, setMyHistory] = useState([]);

  useEffect(() => {
    if (!phone) {
      setLoading(false);
      return;
    }

    const fetchMemberData = async () => {
      try {
        setLoading(true);

        // 1. Ambil Profil Member & Poin
        const { data: memberData, error: memberError } = await supabase
          .from("members")
          .select("*")
          .eq("phone", phone)
          .single();

        if (memberError) throw memberError;

        if (memberData) {
          setMember(memberData);

          // 2. Ambil Riwayat Booking Member Ini
          const { data: bookings, error: bookingsError } = await supabase
            .from("bookings")
            .select("*, service:services(*), barber:barbers(*)")
            .eq("customer_id", memberData.id)
            .order("created_at", { ascending: false });

          if (bookingsError) throw bookingsError;
          setMyHistory(bookings || []);
        }
      } catch (error) {
        console.error("Error fetching member data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMemberData();
  }, [phone]);

  return { loading, member, myHistory };
}