import bookingJson from "../data/databooking.json";
import customerJson from "../data/datacustomers.json";
import serviceJson from "../data/dataservices.json";
import membershipJson from "../data/datamembership.json";

// Helper to initialize and retrieve local storage data
const initLocalStorage = (key, defaultData) => {
  const stored = localStorage.getItem(key);
  if (!stored) {
    localStorage.setItem(key, JSON.stringify(defaultData));
    return defaultData;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    console.error(`Error parsing localStorage key ${key}`, e);
    return defaultData;
  }
};

// Initial static list of Barbers since there is no databarber.json
const initialBarbers = [
  { "id": 1, "name": "Andi", "status": "Standby", "rating": 4.9, "experience": "5 Years", "image": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80" },
  { "id": 2, "name": "Budi", "status": "Standby", "rating": 4.8, "experience": "3 Years", "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80" },
  { "id": 3, "name": "Candra", "status": "Off Duty", "rating": 4.7, "experience": "4 Years", "image": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80" },
  { "id": 4, "name": "Dedi", "status": "Standby", "rating": 4.6, "experience": "2 Years", "image": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=256&q=80" },
  { "id": 5, "name": "Eko", "status": "Standby", "rating": 4.9, "experience": "6 Years", "image": "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=256&q=80" }
];

// Initial static list of Feedbacks
const initialFeedbacks = [
  { "id": 1, "booking_id": 1, "customer_name": "Muhammad Aidil Al Bukhori", "barber_name": "Andi", "rating": 5, "review": "Sangat puas dengan potongan rambut taper fade-nya! Rapi banget dan pelayanannya premium.", "date": "2026-06-10" },
  { "id": 2, "booking_id": 4, "customer_name": "Ilham Maulana", "barber_name": "Dedi", "rating": 4, "review": "Potongan buzz cut rapi, pengerjaan cepat. Rekomendasi buat yang mau potong rambut cepat.", "date": "2026-06-10" },
  { "id": 3, "booking_id": 6, "customer_name": "Yoga Prasetyo", "barber_name": "Andi", "rating": 5, "review": "Andi luar biasa! Selalu paham gaya rambut yang saya mau. Tempatnya juga nyaman dan bersih.", "date": "2026-06-11" },
  { "id": 4, "booking_id": 10, "customer_name": "Ardiansyah", "barber_name": "Budi", "rating": 5, "review": "Layanan cepat dan ramah, top markotop!", "date": "2026-06-11" }
];

// Initial static list of Loyalty Rewards
const initialRewards = [
  { "id": 1, "name": "Free Pomade GroomGold", "points": 500, "description": "Pomade premium beraroma maskulin untuk ketahanan seharian." },
  { "id": 2, "name": "Free Hair Spa Treatment", "points": 800, "description": "Perawatan spa rambut lengkap dengan pijatan relaksasi." },
  { "id": 3, "name": "Discount Voucher 50K", "points": 300, "description": "Potongan langsung Rp 50.000 untuk layanan apa saja." },
  { "id": 4, "name": "Free Hairwash & Styling", "points": 200, "description": "Cuci rambut premium dengan pijatan hangat dan styling gratis." }
];

// Initial static list of Redeemed Rewards
const initialRedeemedRewards = [
  { "id": 1, "customer_name": "Muhammad Aidil Albukhori", "reward_name": "Free Pomade GroomGold", "points_spent": 500, "date": "2026-06-12", "status": "Ready to Claim" },
  { "id": 2, "customer_name": "Andi Saputra", "reward_name": "Discount Voucher 50K", "points_spent": 300, "date": "2026-06-14", "status": "Claimed" }
];

// Initial static list of Users for User Management
const initialUsers = [
  { "id": "admin-1", "name": "Super Admin", "email": "admin@groomgold.com", "role": "admin", "status": "Aktif", "created_at": "2026-01-01" },
  { "id": "owner-1", "name": "GroomGold Owner", "email": "owner@groomgold.com", "role": "owner", "status": "Aktif", "created_at": "2026-01-01" },
  { "id": "barber-1", "name": "Andi", "email": "andi@groomgold.com", "role": "barber", "status": "Aktif", "created_at": "2026-02-01" },
  { "id": "barber-2", "name": "Budi", "email": "budi@groomgold.com", "role": "barber", "status": "Aktif", "created_at": "2026-02-01" },
  { "id": "barber-3", "name": "Candra", "email": "candra@groomgold.com", "role": "barber", "status": "Aktif", "created_at": "2026-02-01" },
  { "id": "member-1", "name": "Muhammad Aidil Al Bukhori", "email": "aidil@gmail.com", "role": "member", "status": "Aktif", "created_at": "2026-03-01" }
];

// Initialize all data in localStorage
export const db = {
  getBookings() {
    return initLocalStorage("gg_bookings", bookingJson);
  },
  saveBookings(data) {
    localStorage.setItem("gg_bookings", JSON.stringify(data));
  },

  getCustomers() {
    return initLocalStorage("gg_customers", customerJson);
  },
  saveCustomers(data) {
    localStorage.setItem("gg_customers", JSON.stringify(data));
  },

  getServices() {
    return initLocalStorage("gg_services", serviceJson);
  },
  saveServices(data) {
    localStorage.setItem("gg_services", JSON.stringify(data));
  },

  getMemberships() {
    return initLocalStorage("gg_memberships", membershipJson);
  },
  saveMemberships(data) {
    localStorage.setItem("gg_memberships", JSON.stringify(data));
  },

  getBarbers() {
    return initLocalStorage("gg_barbers", initialBarbers);
  },
  saveBarbers(data) {
    localStorage.setItem("gg_barbers", JSON.stringify(data));
  },

  getFeedbacks() {
    return initLocalStorage("gg_feedbacks", initialFeedbacks);
  },
  saveFeedbacks(data) {
    localStorage.setItem("gg_feedbacks", JSON.stringify(data));
  },

  getRewards() {
    return initLocalStorage("gg_rewards", initialRewards);
  },
  saveRewards(data) {
    localStorage.setItem("gg_rewards", JSON.stringify(data));
  },

  getRedeemedRewards() {
    return initLocalStorage("gg_redeemed_rewards", initialRedeemedRewards);
  },
  saveRedeemedRewards(data) {
    localStorage.setItem("gg_redeemed_rewards", JSON.stringify(data));
  },

  getUsers() {
    return initLocalStorage("gg_users", initialUsers);
  },
  saveUsers(data) {
    localStorage.setItem("gg_users", JSON.stringify(data));
  }
};
