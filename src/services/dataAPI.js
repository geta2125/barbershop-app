import { barberService, mapBarber } from "./barberService";
import { bookingService, mapBooking } from "./bookingService";
import { customerService, mapCustomer } from "./customerService";
import { feedbackService } from "./feedbackService";
import { membershipService, mapMembership } from "./membershipService";
import { serviceService, mapService } from "./serviceService";
import { transactionService } from "./transactionService";

function unwrap(response) {
  if (response?.error) throw response.error;
  return response?.data ?? response ?? [];
}

export const toIdr = (value = 0) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

export const dataAPI = {
  async fetchCustomers() {
    return unwrap(await customerService.getAll()).map(mapCustomer);
  },

  async fetchCustomerById(id) {
    const row = unwrap(await customerService.getById(id));
    return row ? mapCustomer(row) : null;
  },

  async saveCustomer(form, id = null) {
    const row = unwrap(id ? await customerService.update(id, form) : await customerService.create(form));
    return mapCustomer(row);
  },

  async deleteCustomer(id) {
    return unwrap(await customerService.delete(id));
  },

  async fetchServices(includeInactive = false) {
    return unwrap(await serviceService.getAll(includeInactive)).map(mapService);
  },

  async fetchServiceById(id) {
    const row = unwrap(await serviceService.getById(id));
    return row ? mapService(row) : null;
  },

  async saveService(form, id = null) {
    const row = unwrap(id ? await serviceService.update(id, form) : await serviceService.create(form));
    return mapService(row);
  },

  async deleteService(id) {
    return unwrap(await serviceService.delete(id));
  },

  async fetchBarbers() {
    return unwrap(await barberService.getAll()).map(mapBarber);
  },

  async fetchBarberById(id) {
    const row = unwrap(await barberService.getById(id));
    return row ? mapBarber(row) : null;
  },

  async saveBarber(form, id = null) {
    const row = unwrap(id ? await barberService.update(id, form) : await barberService.create(form));
    return mapBarber(row);
  },

  async deleteBarber(id) {
    return unwrap(await barberService.delete(id));
  },

  async fetchBookings() {
    return unwrap(await bookingService.getAll()).map(mapBooking);
  },

  async fetchBookingById(id) {
    const row = unwrap(await bookingService.getById(id));
    return row ? mapBooking(row) : null;
  },

  async saveBooking(form, id = null) {
    const row = unwrap(id ? await bookingService.update(id, form) : await bookingService.create(form));
    return mapBooking(row);
  },

  async deleteBooking(id) {
    return unwrap(await bookingService.delete(id));
  },

  async fetchMemberships() {
    return unwrap(await membershipService.getAll()).map(mapMembership);
  },

  async fetchMembershipById(id) {
    const row = unwrap(await membershipService.getById(id));
    return row ? mapMembership(row) : null;
  },

  async fetchFeedbacks() {
    return unwrap(await feedbackService.getAll()).map((row) => ({
      ...row,
      id: row.id,
      customer_name: row.customer?.name || "-",
      rating: row.rating || 0,
      review: row.review || "",
      date: row.created_at ? new Date(row.created_at).toLocaleDateString("id-ID") : "",
      status: row.booking?.status || "-",
    }));
  },

  async deleteFeedback(id) {
    return unwrap(await feedbackService.delete(id));
  },

  async fetchHistory() {
    return unwrap(await transactionService.getAll()).map((row) => ({
      ...row,
      id: row.id,
      tanggal: row.created_at ? new Date(row.created_at).toLocaleDateString("id-ID") : "",
      total: Number(row.final_amount || row.subtotal || 0),
      metode: row.payment_method || "Cash",
      status: row.payment_status || "Pending",
      booking_code: row.booking?.booking_code || "-",
    }));
  },
};
