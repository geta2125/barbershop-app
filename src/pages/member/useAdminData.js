import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabaseClient";

export function useAdminData() {
  const [loading, setLoading] = useState(true);
  const [todaysBookings, setTodaysBookings] = useState([]);
  const [barbers, setBarbers] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const todayString = new Date().toISOString().split("T")[0];

      // 1. Get Bookings Hari Ini
      const { data: bookingsData } = await supabase
        .from("bookings")
        .select("*, customer:customers(name), service:services(name), barber:barbers(name)")
        .gte("created_at", `${todayString}T00:00:00`)
        .order("booking_time", { ascending: true });

      // 2. Get Status Barber
      const { data: barbersData } = await supabase.from("barbers").select("*");

      // 3. Get Low Stock Products (< 5)
      const { data: productsData } = await supabase.from("products").select("*").lt("stock", 5);

      if (bookingsData) setTodaysBookings(bookingsData);
      if (barbersData) setBarbers(barbersData);
      if (productsData) setLowStockProducts(productsData);
    } catch (error) {
      console.error("Gagal sinkronisasi data Supabase:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchData();

    // Dengar perubahan booking secara Real-Time
    const bookingSubscription = supabase
      .channel("live-bookings")
      .on("postgres_changes", { event: "*", schema: "public", table: "bookings" }, fetchData)
      .subscribe();

    return () => {
      supabase.removeChannel(bookingSubscription);
    };
  }, [fetchData]);

  return { loading, todaysBookings, barbers, lowStockProducts, refetch: fetchData };
}