import { useEffect, useState } from "react";
import { useAuth } from "../contexts/auth-context";
import { db } from "../services/localDB";
import { mapBooking } from "../services/bookingService";

export function useMemberData() {
  const { profile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [member, setMember] = useState(null);
  const [myHistory, setMyHistory] = useState([]);

  useEffect(() => {
    const fetchMemberData = () => {
      if (!profile) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const email = profile.email || "";
        const phone = profile.phone || "";
        const name = profile.full_name || profile.name || "";

        // Get membership from local storage
        const memberships = db.getMemberships();
        let m = memberships.find(x => x.Email === email || x.No_HP === phone);
        
        if (!m) {
          m = {
            Level_Membership: "Bronze",
            Total_Poin: 150
          };
        }

        setMember({
          id: profile.id,
          name: name,
          phone: phone,
          tier: m.Level_Membership || "Bronze",
          points: m.Total_Poin || 0
        });

        // Get bookings from local storage
        const bookings = db.getBookings().map(mapBooking);
        const filtered = bookings.filter(b => 
          b.email === email || 
          b.no_hp === phone ||
          b.nama_customer.toLowerCase() === name.toLowerCase()
        );

        setMyHistory(filtered);
      } catch (error) {
        console.error("Error fetching local member data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMemberData();
  }, [profile]);

  return { loading, member, myHistory };
}
