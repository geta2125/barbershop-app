create extension if not exists "pgcrypto";

create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  full_name text,
  email text unique not null,
  phone text,
  role text not null default 'member' check (role in ('admin', 'owner', 'barber', 'member')),
  avatar_url text,
  status text not null default 'Aktif' check (status in ('Aktif', 'Nonaktif')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.membership_levels (
  id uuid primary key default gen_random_uuid(),
  name text unique not null check (name in ('Bronze', 'Silver', 'Gold', 'Platinum')),
  min_points integer not null default 0,
  discount_percent integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique references public.users(id) on delete cascade,
  name text not null,
  email text,
  phone text,
  address text,
  membership_level_id uuid references public.membership_levels(id),
  total_spending numeric(14,2) not null default 0,
  total_transactions integer not null default 0,
  status text not null default 'Aktif' check (status in ('Aktif', 'Nonaktif')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.barbers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique references public.users(id) on delete set null,
  name text not null,
  specialty text,
  experience_year integer not null default 0,
  phone text,
  rating numeric(3,2) not null default 0 check (rating between 0 and 5),
  photo_url text,
  status boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null default 'Haircut',
  duration integer not null default 30,
  price numeric(14,2) not null default 0,
  image_url text,
  description text,
  status text not null default 'Aktif' check (status in ('Aktif', 'Nonaktif')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  booking_code text unique,
  customer_id uuid references public.customers(id) on delete set null,
  barber_id uuid references public.barbers(id) on delete set null,
  booking_date date not null,
  booking_time time not null,
  status text not null default 'Pending' check (status in ('Pending', 'Confirmed', 'Completed', 'Canceled', 'Cancelled')),
  payment_method text not null default 'Cash',
  guest_name text,
  guest_email text,
  guest_phone text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint bookings_customer_or_guest check (customer_id is not null or (guest_name is not null and guest_phone is not null))
);

create table if not exists public.booking_details (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings(id) on delete cascade,
  service_id uuid not null references public.services(id) on delete restrict,
  price numeric(14,2) not null default 0,
  quantity integer not null default 1,
  subtotal numeric(14,2) generated always as (price * quantity) stored,
  created_at timestamptz not null default now()
);

create table if not exists public.transactions (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid unique not null references public.bookings(id) on delete cascade,
  subtotal numeric(14,2) not null default 0,
  discount_amount numeric(14,2) not null default 0,
  final_amount numeric(14,2) not null default 0,
  payment_method text not null default 'Cash',
  payment_status text not null default 'Pending' check (payment_status in ('Pending', 'Paid', 'Failed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.membership (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid unique not null references public.customers(id) on delete cascade,
  level_id uuid references public.membership_levels(id),
  points integer not null default 0,
  total_redeem integer not null default 0,
  status text not null default 'Aktif' check (status in ('Aktif', 'Nonaktif')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.points_history (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.customers(id) on delete cascade,
  membership_id uuid references public.membership(id) on delete set null,
  transaction_id uuid references public.transactions(id) on delete cascade,
  points integer not null,
  type text not null check (type in ('Earn', 'Redeem', 'Adjust')),
  description text,
  created_at timestamptz not null default now()
);

create table if not exists public.rewards (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  points_required integer not null default 0,
  stock integer not null default 0,
  status text not null default 'Aktif' check (status in ('Aktif', 'Nonaktif')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.feedback (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings(id) on delete cascade,
  customer_id uuid references public.customers(id) on delete cascade,
  rating integer not null check (rating between 1 and 5),
  review text,
  created_at timestamptz not null default now()
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  title text not null,
  message text not null,
  type text not null default 'info',
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.settings (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  value jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.current_user_role()
returns text language sql stable security definer set search_path = public as $$
  select role from public.users where id = auth.uid()
$$;

create or replace function public.current_customer_id()
returns uuid language sql stable security definer set search_path = public as $$
  select id from public.customers where user_id = auth.uid()
$$;

create or replace function public.level_for_points(total_points integer)
returns uuid language sql stable security definer set search_path = public as $$
  select id from public.membership_levels
  where min_points <= coalesce(total_points, 0)
  order by min_points desc
  limit 1
$$;

create or replace function public.handle_new_auth_user()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  profile_name text := coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1));
  profile_phone text := coalesce(new.raw_user_meta_data->>'phone', new.raw_user_meta_data->>'phone_number');
  bronze_id uuid;
  new_customer_id uuid;
begin
  select id into bronze_id from public.membership_levels where name = 'Bronze';

  insert into public.users (id, name, full_name, email, phone, role)
  values (new.id, profile_name, profile_name, new.email, profile_phone, 'member')
  on conflict (id) do update set
    name = excluded.name,
    full_name = excluded.full_name,
    email = excluded.email,
    phone = excluded.phone,
    updated_at = now();

  insert into public.customers (user_id, name, email, phone, membership_level_id)
  values (new.id, profile_name, new.email, profile_phone, bronze_id)
  on conflict (user_id) do update set
    name = excluded.name,
    email = excluded.email,
    phone = excluded.phone,
    membership_level_id = coalesce(public.customers.membership_level_id, bronze_id),
    updated_at = now()
  returning id into new_customer_id;

  insert into public.membership (customer_id, level_id, points)
  values (new_customer_id, bronze_id, 0)
  on conflict (customer_id) do nothing;

  return new;
end;
$$;

create or replace function public.set_booking_code()
returns trigger language plpgsql as $$
begin
  if new.booking_code is null then
    new.booking_code := 'GG-' || to_char(now(), 'YYYYMMDD') || '-' || upper(substr(new.id::text, 1, 6));
  end if;
  return new;
end;
$$;

create or replace function public.notify_booking_created()
returns trigger language plpgsql security definer set search_path = public as $$
declare target_user uuid;
begin
  select user_id into target_user from public.customers where id = new.customer_id;
  if target_user is not null then
    insert into public.notifications (user_id, title, message, type)
    values (target_user, 'Booking dibuat', 'Booking Anda berhasil dibuat.', 'booking');
  end if;
  return new;
end;
$$;

create or replace function public.apply_transaction_points()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  booking_row public.bookings%rowtype;
  member_row public.membership%rowtype;
  earned integer;
  total_points integer;
  next_level uuid;
begin
  if new.payment_status <> 'Paid' then return new; end if;
  select * into booking_row from public.bookings where id = new.booking_id;
  if booking_row.customer_id is null or booking_row.status not in ('Completed') then return new; end if;
  if exists (select 1 from public.points_history where transaction_id = new.id and type = 'Earn') then return new; end if;

  earned := floor(coalesce(new.final_amount, 0) / 10000);
  if earned <= 0 then return new; end if;

  insert into public.membership (customer_id, level_id, points)
  values (booking_row.customer_id, public.level_for_points(0), 0)
  on conflict (customer_id) do nothing;

  select * into member_row from public.membership where customer_id = booking_row.customer_id for update;
  total_points := member_row.points + earned;
  next_level := public.level_for_points(total_points);

  update public.membership
  set points = total_points, level_id = next_level, updated_at = now()
  where id = member_row.id;

  update public.customers
  set membership_level_id = next_level,
      total_spending = total_spending + coalesce(new.final_amount, 0),
      total_transactions = total_transactions + 1,
      updated_at = now()
  where id = booking_row.customer_id;

  insert into public.points_history (customer_id, membership_id, transaction_id, points, type, description)
  values (booking_row.customer_id, member_row.id, new.id, earned, 'Earn', 'Poin dari transaksi selesai');
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
for each row execute function public.handle_new_auth_user();

do $$
declare t text;
begin
  foreach t in array array['users','customers','barbers','services','bookings','transactions','membership','rewards','settings'] loop
    execute format('drop trigger if exists set_%s_updated_at on public.%I', t, t);
    execute format('create trigger set_%s_updated_at before update on public.%I for each row execute function public.set_updated_at()', t, t);
  end loop;
end $$;

drop trigger if exists set_bookings_code on public.bookings;
create trigger set_bookings_code before insert on public.bookings
for each row execute function public.set_booking_code();

drop trigger if exists notify_booking_created_after_insert on public.bookings;
create trigger notify_booking_created_after_insert after insert on public.bookings
for each row execute function public.notify_booking_created();

drop trigger if exists apply_transaction_points_after_write on public.transactions;
create trigger apply_transaction_points_after_write
after insert or update of payment_status, final_amount on public.transactions
for each row execute function public.apply_transaction_points();

create index if not exists idx_users_role on public.users(role);
create index if not exists idx_customers_user_id on public.customers(user_id);
create index if not exists idx_customers_level on public.customers(membership_level_id);
create index if not exists idx_barbers_user_id on public.barbers(user_id);
create index if not exists idx_services_status on public.services(status);
create index if not exists idx_bookings_customer_id on public.bookings(customer_id);
create index if not exists idx_bookings_barber_id on public.bookings(barber_id);
create index if not exists idx_bookings_date on public.bookings(booking_date);
create index if not exists idx_booking_details_booking_id on public.booking_details(booking_id);
create index if not exists idx_transactions_booking_id on public.transactions(booking_id);
create index if not exists idx_membership_customer_id on public.membership(customer_id);
create index if not exists idx_points_history_customer_id on public.points_history(customer_id);
create index if not exists idx_feedback_customer_id on public.feedback(customer_id);
create index if not exists idx_notifications_user_id on public.notifications(user_id);

insert into public.membership_levels (name, min_points, discount_percent) values
  ('Bronze', 0, 5),
  ('Silver', 1000, 10),
  ('Gold', 2500, 15),
  ('Platinum', 5000, 20)
on conflict (name) do update set
  min_points = excluded.min_points,
  discount_percent = excluded.discount_percent;

insert into public.services (name, category, duration, price, image_url, description, status) values
  ('Classic Haircut', 'Haircut', 30, 50000, 'haircut-classic.jpg', 'Potongan klasik premium Groom Gold.', 'Aktif'),
  ('Fade Cut', 'Haircut', 45, 75000, 'fade-cut.jpg', 'Fade modern dengan finishing detail.', 'Aktif'),
  ('Beard Trim', 'Shaving', 25, 40000, 'beard-trim.jpg', 'Rapikan jenggot dan kumis.', 'Aktif')
on conflict do nothing;

insert into public.rewards (name, description, points_required, stock, status) values
  ('Free Hair Tonic', 'Tukar poin dengan hair tonic.', 50, 25, 'Aktif'),
  ('Discount 20%', 'Diskon layanan berikutnya.', 100, 100, 'Aktif')
on conflict do nothing;

insert into storage.buckets (id, name, public) values
  ('avatars', 'avatars', true),
  ('customers', 'customers', true),
  ('barbers', 'barbers', true),
  ('services', 'services', true),
  ('gallery', 'gallery', true)
on conflict (id) do update set public = excluded.public;

alter table public.users enable row level security;
alter table public.customers enable row level security;
alter table public.barbers enable row level security;
alter table public.services enable row level security;
alter table public.bookings enable row level security;
alter table public.booking_details enable row level security;
alter table public.transactions enable row level security;
alter table public.membership enable row level security;
alter table public.membership_levels enable row level security;
alter table public.points_history enable row level security;
alter table public.rewards enable row level security;
alter table public.feedback enable row level security;
alter table public.notifications enable row level security;
alter table public.settings enable row level security;

create policy "membership levels public read" on public.membership_levels for select using (true);
create policy "services public active read" on public.services for select using (status = 'Aktif' or public.current_user_role() in ('admin','owner'));
create policy "barbers public active read" on public.barbers for select using (status = true or public.current_user_role() in ('admin','owner'));

create policy "users admin full" on public.users for all using (public.current_user_role() = 'admin') with check (public.current_user_role() = 'admin');
create policy "users owner read" on public.users for select using (public.current_user_role() = 'owner');
create policy "users own read" on public.users for select using (id = auth.uid());
create policy "users own update" on public.users for update using (id = auth.uid()) with check (id = auth.uid());

create policy "customers admin full" on public.customers for all using (public.current_user_role() = 'admin') with check (public.current_user_role() = 'admin');
create policy "customers owner read" on public.customers for select using (public.current_user_role() = 'owner');
create policy "customers member own" on public.customers for select using (user_id = auth.uid());
create policy "customers member own update" on public.customers for update using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "business admin full barbers" on public.barbers for all using (public.current_user_role() = 'admin') with check (public.current_user_role() = 'admin');
create policy "business owner write barbers" on public.barbers for all using (public.current_user_role() = 'owner') with check (public.current_user_role() = 'owner');
create policy "barbers own read" on public.barbers for select using (user_id = auth.uid());

create policy "business admin full services" on public.services for all using (public.current_user_role() = 'admin') with check (public.current_user_role() = 'admin');
create policy "business owner write services" on public.services for all using (public.current_user_role() = 'owner') with check (public.current_user_role() = 'owner');

create policy "bookings admin full" on public.bookings for all using (public.current_user_role() = 'admin') with check (public.current_user_role() = 'admin');
create policy "bookings owner read" on public.bookings for select using (public.current_user_role() = 'owner');
create policy "bookings owner write" on public.bookings for insert with check (public.current_user_role() = 'owner');
create policy "bookings owner update" on public.bookings for update using (public.current_user_role() = 'owner') with check (public.current_user_role() = 'owner');
create policy "bookings barber own read" on public.bookings for select using (exists (select 1 from public.barbers b where b.id = bookings.barber_id and b.user_id = auth.uid()));
create policy "bookings barber own update" on public.bookings for update using (exists (select 1 from public.barbers b where b.id = bookings.barber_id and b.user_id = auth.uid())) with check (exists (select 1 from public.barbers b where b.id = bookings.barber_id and b.user_id = auth.uid()));
create policy "bookings member own read" on public.bookings for select using (customer_id = public.current_customer_id());
create policy "bookings member own insert" on public.bookings for insert with check (customer_id = public.current_customer_id());
create policy "bookings guest insert" on public.bookings for insert with check (auth.uid() is null and customer_id is null and guest_name is not null and guest_phone is not null);

create policy "booking details role read" on public.booking_details for select using (
  public.current_user_role() in ('admin','owner') or exists (
    select 1 from public.bookings b left join public.barbers br on br.id = b.barber_id
    where b.id = booking_details.booking_id and (b.customer_id = public.current_customer_id() or br.user_id = auth.uid())
  )
);
create policy "booking details admin owner write" on public.booking_details for all using (public.current_user_role() in ('admin','owner')) with check (public.current_user_role() in ('admin','owner'));
create policy "booking details member insert" on public.booking_details for insert with check (exists (select 1 from public.bookings b where b.id = booking_details.booking_id and b.customer_id = public.current_customer_id()));

create policy "transactions admin full" on public.transactions for all using (public.current_user_role() = 'admin') with check (public.current_user_role() = 'admin');
create policy "transactions owner read" on public.transactions for select using (public.current_user_role() = 'owner');
create policy "transactions member own read" on public.transactions for select using (exists (select 1 from public.bookings b where b.id = transactions.booking_id and b.customer_id = public.current_customer_id()));

create policy "membership admin full" on public.membership for all using (public.current_user_role() = 'admin') with check (public.current_user_role() = 'admin');
create policy "membership owner read" on public.membership for select using (public.current_user_role() = 'owner');
create policy "membership member own read" on public.membership for select using (customer_id = public.current_customer_id());

create policy "points admin full" on public.points_history for all using (public.current_user_role() = 'admin') with check (public.current_user_role() = 'admin');
create policy "points owner read" on public.points_history for select using (public.current_user_role() = 'owner');
create policy "points member own read" on public.points_history for select using (customer_id = public.current_customer_id());

create policy "rewards admin full" on public.rewards for all using (public.current_user_role() = 'admin') with check (public.current_user_role() = 'admin');
create policy "rewards read active" on public.rewards for select using (status = 'Aktif' or public.current_user_role() in ('admin','owner'));

create policy "feedback admin full" on public.feedback for all using (public.current_user_role() = 'admin') with check (public.current_user_role() = 'admin');
create policy "feedback owner read" on public.feedback for select using (public.current_user_role() = 'owner');
create policy "feedback member own" on public.feedback for select using (customer_id = public.current_customer_id());
create policy "feedback member insert" on public.feedback for insert with check (customer_id = public.current_customer_id());

create policy "notifications own read" on public.notifications for select using (user_id = auth.uid());
create policy "notifications own update" on public.notifications for update using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "notifications admin full" on public.notifications for all using (public.current_user_role() = 'admin') with check (public.current_user_role() = 'admin');

create policy "settings admin full" on public.settings for all using (public.current_user_role() = 'admin') with check (public.current_user_role() = 'admin');
create policy "settings owner read" on public.settings for select using (public.current_user_role() = 'owner');

create policy "storage public read groom assets" on storage.objects for select using (bucket_id in ('avatars','customers','barbers','services','gallery'));
create policy "storage authenticated upload groom assets" on storage.objects for insert with check (auth.role() = 'authenticated' and bucket_id in ('avatars','customers','barbers','services','gallery'));
create policy "storage owners update groom assets" on storage.objects for update using (public.current_user_role() in ('admin','owner')) with check (public.current_user_role() in ('admin','owner'));
create policy "storage owners delete groom assets" on storage.objects for delete using (public.current_user_role() in ('admin','owner'));
