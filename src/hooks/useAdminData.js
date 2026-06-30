import { useCallback, useEffect, useState } from "react";
import { db } from "../services/localDB";
import { mapBooking } from "../services/bookingService";
import { mapBarber } from "../services/barberService";

export function useAdminData() {
  const [loading, setLoading] = useState(true);
  const [todaysBookings, setTodaysBookings] = useState([]);
  const [barbers, setBarbers] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const todayString = new Date().toISOString().split("T")[0];

      // Get bookings from localStorage
      const bookingsData = db.getBookings().map(mapBooking);
      
      // Filter bookings for today
      // Note: in databooking.json, schedules are formatted like "2026-06-10 10:00"
      const todays = bookingsData.filter(b => b.jadwal && b.jadwal.includes(todayString));
      
      // Get barbers from localStorage
      const barbersData = db.getBarbers().map(mapBarber);

      // If no bookings today, show all bookings as demonstration or fallback
      setTodaysBookings(todays.length > 0 ? todays : bookingsData.slice(0, 8));
      setBarbers(barbersData);
      setLowStockProducts([
        { id: 1, name: "GroomGold Pomade Strong Hold", stock: 3, unit: "pcs" },
        { id: 2, name: "Premium Hair Tonic Ginseng", stock: 2, unit: "bottle" }
      ]);
    } catch (error) {
      console.error("Gagal sinkronisasi data lokal:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { loading, todaysBookings, barbers, lowStockProducts, refetch: fetchData };
}
