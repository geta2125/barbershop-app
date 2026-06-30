create extension if not exists "pgcrypto";

-- =====================================================
-- GROOM GOLD SCHEMA
-- Run this on a fresh/reset Supabase database.
-- =====================================================

create table if not exists public.users (
    id uuid primary key references auth.users(id) on delete cascade,
    name varchar(150) not null,
    full_name varchar(150),
    email varchar(150) unique not null,
    phone varchar(30),
    phone_number varchar(30),
    role varchar(20) not null default 'member'
        check (role in ('admin', 'owner', 'barber', 'member')),
    avatar_url text,
    status varchar(20) not null default 'Aktif'
        check (status in ('Aktif', 'Nonaktif')),
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create table if not exists public.customers (
    id uuid primary key default gen_random_uuid(),
    user_id uuid unique references public.users(id) on delete cascade,
    name varchar(150) not null,
    email varchar(150),
    phone varchar(30),
    address text,
    membership_level varchar(20) not null default 'Bronze'
        check (membership_level in ('Bronze', 'Silver', 'Gold', 'Platinum')),
    total_spending numeric(15,2) not null default 0,
    total_transactions integer not null default 0,
    status varchar(20) not null default 'Aktif'
        check (status in ('Aktif', 'Nonaktif')),
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create table if not exists public.memberships (
    id uuid primary key default gen_random_uuid(),
    customer_id uuid unique not null references public.customers(id) on delete cascade,
    tier varchar(20) not null default 'Bronze'
        check (tier in ('Bronze', 'Silver', 'Gold', 'Platinum')),
    discount integer not null default 5,
    points integer not null default 0,
    total_redeem integer not null default 0,
    total_transaction numeric(15,2) not null default 0,
    status varchar(20) not null default 'Aktif'
        check (status in ('Aktif', 'Nonaktif')),
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create table if not exists public.barbers (
    id uuid primary key default gen_random_uuid(),
    user_id uuid unique references public.users(id) on delete set null,
    name varchar(150) not null,
    barber_name varchar(150),
    specialty varchar(100),
    specialization varchar(100),
    experience_year integer not null default 0,
    phone varchar(30),
    phone_number varchar(30),
    rating numeric(3,2) not null default 0 check (rating between 0 and 5),
    photo_url text,
    status boolean not null default true,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create table if not exists public.services (
    id uuid primary key default gen_random_uuid(),
    name varchar(150) not null,
    category varchar(100) not null,
    duration integer not null default 30,
    price numeric(12,2) not null default 0,
    image_url text,
    description text,
    status varchar(20) not null default 'Aktif'
        check (status in ('Aktif', 'Nonaktif')),
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create table if not exists public.bookings (
    id uuid primary key default gen_random_uuid(),
    booking_code varchar(30) unique,
    customer_id uuid references public.customers(id) on delete set null,
    service_id uuid references public.services(id) on delete set null,
    barber_id uuid references public.barbers(id) on delete set null,
    booking_date date not null,
    booking_time time not null,
    payment_method varchar(50) not null default 'Cash',
    status varchar(30) not null default 'Pending'
        check (status in ('Pending', 'Confirmed', 'Completed', 'Cancelled')),
    guest_name varchar(150),
    guest_email varchar(150),
    guest_phone varchar(30),
    notes text,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    constraint booking_has_customer_or_guest
        check (customer_id is not null or (guest_name is not null and guest_phone is not null))
);

create table if not exists public.transactions (
    id uuid primary key default gen_random_uuid(),
    booking_id uuid unique not null references public.bookings(id) on delete cascade,
    subtotal numeric(12,2) not null default 0,
    discount_amount numeric(12,2) not null default 0,
    final_amount numeric(12,2) not null default 0,
    payment_method varchar(50) not null default 'Cash',
    payment_status varchar(30) not null default 'Pending'
        check (payment_status in ('Pending', 'Paid', 'Failed')),
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create table if not exists public.feedbacks (
    id uuid primary key default gen_random_uuid(),
    booking_id uuid not null references public.bookings(id) on delete cascade,
    customer_id uuid references public.customers(id) on delete cascade,
    rating integer not null check (rating between 1 and 5),
    review text,
    created_at timestamptz not null default now()
);

create table if not exists public.point_histories (
    id uuid primary key default gen_random_uuid(),
    customer_id uuid not null references public.customers(id) on delete cascade,
    membership_id uuid references public.memberships(id) on delete set null,
    transaction_id uuid unique references public.transactions(id) on delete cascade,
    points integer not null,
    type varchar(20) not null default 'Earn'
        check (type in ('Earn', 'Redeem', 'Adjust')),
    description text,
    created_at timestamptz not null default now()
);

-- =====================================================
-- HELPERS
-- =====================================================

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
    new.updated_at = now();
    return new;
end;
$$;

create or replace function public.current_user_role()
returns text
language sql
stable
security definer
set search_path = public
as $$
    select role from public.users where id = auth.uid()
$$;

create or replace function public.current_customer_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
    select id from public.customers where user_id = auth.uid()
$$;

create or replace function public.membership_tier_for_points(total_points integer)
returns text
language sql
immutable
as $$
    select case
        when coalesce(total_points, 0) >= 5000 then 'Platinum'
        when coalesce(total_points, 0) >= 2500 then 'Gold'
        when coalesce(total_points, 0) >= 1000 then 'Silver'
        else 'Bronze'
    end
$$;

create or replace function public.membership_discount_for_tier(tier_name text)
returns integer
language sql
immutable
as $$
    select case tier_name
        when 'Platinum' then 20
        when 'Gold' then 15
        when 'Silver' then 10
        else 5
    end
$$;

create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
    profile_role text := lower(coalesce(new.raw_user_meta_data->>'role', 'member'));
    profile_name text := coalesce(new.raw_user_meta_data->>'name', new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1));
    profile_phone text := coalesce(new.raw_user_meta_data->>'phone', new.raw_user_meta_data->>'phone_number');
    new_customer_id uuid;
begin
    if profile_role not in ('admin', 'owner', 'barber', 'member') then
        profile_role := 'member';
    end if;

    insert into public.users (id, name, full_name, email, phone, phone_number, role)
    values (new.id, profile_name, profile_name, new.email, profile_phone, profile_phone, profile_role)
    on conflict (id) do update set
        name = excluded.name,
        full_name = excluded.full_name,
        email = excluded.email,
        phone = excluded.phone,
        phone_number = excluded.phone_number,
        role = excluded.role,
        updated_at = now();

    if profile_role = 'member' then
        insert into public.customers (user_id, name, email, phone)
        values (new.id, profile_name, new.email, profile_phone)
        on conflict (user_id) do update set
            name = excluded.name,
            email = excluded.email,
            phone = excluded.phone,
            updated_at = now()
        returning id into new_customer_id;

        insert into public.memberships (customer_id, tier, discount)
        values (new_customer_id, 'Bronze', 5)
        on conflict (customer_id) do nothing;
    end if;

    return new;
end;
$$;

create or replace function public.set_booking_code()
returns trigger
language plpgsql
as $$
begin
    if new.booking_code is null then
        new.booking_code := 'GG-' || to_char(now(), 'YYYYMMDD') || '-' || upper(substr(new.id::text, 1, 6));
    end if;
    return new;
end;
$$;

create or replace function public.apply_transaction_points()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
    booking_row public.bookings%rowtype;
    membership_row public.memberships%rowtype;
    earned_points integer;
    new_points integer;
    new_tier text;
begin
    if new.payment_status <> 'Paid' then
        return new;
    end if;

    select * into booking_row from public.bookings where id = new.booking_id;
    if booking_row.id is null or booking_row.status <> 'Completed' or booking_row.customer_id is null then
        return new;
    end if;

    if exists (select 1 from public.point_histories where transaction_id = new.id) then
        return new;
    end if;

    earned_points := floor(coalesce(new.final_amount, 0) / 10000);
    if earned_points <= 0 then
        return new;
    end if;

    insert into public.memberships (customer_id, tier, discount, points, total_transaction)
    values (booking_row.customer_id, 'Bronze', 5, 0, 0)
    on conflict (customer_id) do nothing;

    select * into membership_row
    from public.memberships
    where customer_id = booking_row.customer_id
    for update;

    new_points := membership_row.points + earned_points;
    new_tier := public.membership_tier_for_points(new_points);

    update public.memberships
    set points = new_points,
        tier = new_tier,
        discount = public.membership_discount_for_tier(new_tier),
        total_transaction = total_transaction + coalesce(new.final_amount, 0),
        updated_at = now()
    where id = membership_row.id;

    update public.customers
    set membership_level = new_tier,
        total_spending = total_spending + coalesce(new.final_amount, 0),
        total_transactions = total_transactions + 1,
        updated_at = now()
    where id = booking_row.customer_id;

    insert into public.point_histories (customer_id, membership_id, transaction_id, points, type, description)
    values (booking_row.customer_id, membership_row.id, new.id, earned_points, 'Earn', 'Poin dari transaksi selesai');

    return new;
end;
$$;

-- =====================================================
-- TRIGGERS
-- =====================================================

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_auth_user();

drop trigger if exists set_users_updated_at on public.users;
create trigger set_users_updated_at before update on public.users
for each row execute function public.set_updated_at();

drop trigger if exists set_customers_updated_at on public.customers;
create trigger set_customers_updated_at before update on public.customers
for each row execute function public.set_updated_at();

drop trigger if exists set_memberships_updated_at on public.memberships;
create trigger set_memberships_updated_at before update on public.memberships
for each row execute function public.set_updated_at();

drop trigger if exists set_barbers_updated_at on public.barbers;
create trigger set_barbers_updated_at before update on public.barbers
for each row execute function public.set_updated_at();

drop trigger if exists set_services_updated_at on public.services;
create trigger set_services_updated_at before update on public.services
for each row execute function public.set_updated_at();

drop trigger if exists set_bookings_updated_at on public.bookings;
create trigger set_bookings_updated_at before update on public.bookings
for each row execute function public.set_updated_at();

drop trigger if exists set_transactions_updated_at on public.transactions;
create trigger set_transactions_updated_at before update on public.transactions
for each row execute function public.set_updated_at();

drop trigger if exists set_bookings_code on public.bookings;
create trigger set_bookings_code before insert on public.bookings
for each row execute function public.set_booking_code();

drop trigger if exists apply_transaction_points_after_write on public.transactions;
create trigger apply_transaction_points_after_write
after insert or update of payment_status, final_amount on public.transactions
for each row execute function public.apply_transaction_points();

-- =====================================================
-- INDEXES
-- =====================================================

create index if not exists idx_users_role on public.users(role);
create index if not exists idx_users_email on public.users(email);
create index if not exists idx_customers_user on public.customers(user_id);
create index if not exists idx_customers_status on public.customers(status);
create index if not exists idx_memberships_customer on public.memberships(customer_id);
create index if not exists idx_memberships_tier on public.memberships(tier);
create index if not exists idx_barbers_user on public.barbers(user_id);
create index if not exists idx_barbers_status on public.barbers(status);
create index if not exists idx_services_status on public.services(status);
create index if not exists idx_bookings_customer on public.bookings(customer_id);
create index if not exists idx_bookings_barber on public.bookings(barber_id);
create index if not exists idx_bookings_service on public.bookings(service_id);
create index if not exists idx_bookings_date on public.bookings(booking_date);
create index if not exists idx_bookings_status on public.bookings(status);
create index if not exists idx_transactions_booking on public.transactions(booking_id);
create index if not exists idx_feedbacks_booking on public.feedbacks(booking_id);
create index if not exists idx_feedbacks_customer on public.feedbacks(customer_id);
create index if not exists idx_point_histories_customer on public.point_histories(customer_id);

-- =====================================================
-- ROW LEVEL SECURITY
-- =====================================================

alter table public.users enable row level security;
alter table public.customers enable row level security;
alter table public.memberships enable row level security;
alter table public.barbers enable row level security;
alter table public.services enable row level security;
alter table public.bookings enable row level security;
alter table public.transactions enable row level security;
alter table public.feedbacks enable row level security;
alter table public.point_histories enable row level security;

-- USERS
create policy "users admin full access" on public.users
for all using (public.current_user_role() = 'admin')
with check (public.current_user_role() = 'admin');

create policy "users read own profile" on public.users
for select using (id = auth.uid() or public.current_user_role() in ('admin', 'owner'));

create policy "users update own non role fields" on public.users
for update using (id = auth.uid())
with check (id = auth.uid() and role = public.current_user_role());

-- CUSTOMERS
create policy "customers admin owner full access" on public.customers
for all using (public.current_user_role() in ('admin', 'owner'))
with check (public.current_user_role() in ('admin', 'owner'));

create policy "customers member own read update" on public.customers
for select using (user_id = auth.uid());

create policy "customers member own update" on public.customers
for update using (user_id = auth.uid())
with check (user_id = auth.uid());

-- MEMBERSHIPS
create policy "memberships admin full access" on public.memberships
for all using (public.current_user_role() = 'admin')
with check (public.current_user_role() = 'admin');

create policy "memberships owner read" on public.memberships
for select using (public.current_user_role() = 'owner');

create policy "memberships member own read" on public.memberships
for select using (customer_id = public.current_customer_id());

-- BARBERS
create policy "barbers public read active" on public.barbers
for select using (status = true);

create policy "barbers admin owner full access" on public.barbers
for all using (public.current_user_role() in ('admin', 'owner'))
with check (public.current_user_role() in ('admin', 'owner'));

create policy "barbers barber own read" on public.barbers
for select using (user_id = auth.uid());

-- SERVICES
create policy "services public read active" on public.services
for select using (status = 'Aktif');

create policy "services admin owner full access" on public.services
for all using (public.current_user_role() in ('admin', 'owner'))
with check (public.current_user_role() in ('admin', 'owner'));

-- BOOKINGS
create policy "bookings guest create" on public.bookings
for insert with check (auth.uid() is null and customer_id is null and guest_name is not null and guest_phone is not null);

create policy "bookings admin owner read all" on public.bookings
for select using (public.current_user_role() in ('admin', 'owner'));

create policy "bookings admin full access" on public.bookings
for all using (public.current_user_role() = 'admin')
with check (public.current_user_role() = 'admin');

create policy "bookings owner write" on public.bookings
for insert with check (public.current_user_role() = 'owner');

create policy "bookings owner update delete" on public.bookings
for update using (public.current_user_role() = 'owner')
with check (public.current_user_role() = 'owner');

create policy "bookings barber own read" on public.bookings
for select using (
    exists (
        select 1 from public.barbers b
        where b.id = bookings.barber_id and b.user_id = auth.uid()
    )
);

create policy "bookings barber own status update" on public.bookings
for update using (
    exists (
        select 1 from public.barbers b
        where b.id = bookings.barber_id and b.user_id = auth.uid()
    )
) with check (
    exists (
        select 1 from public.barbers b
        where b.id = bookings.barber_id and b.user_id = auth.uid()
    )
);

create policy "bookings member own read" on public.bookings
for select using (customer_id = public.current_customer_id());

create policy "bookings member create" on public.bookings
for insert with check (customer_id = public.current_customer_id());

-- TRANSACTIONS
create policy "transactions admin full access" on public.transactions
for all using (public.current_user_role() = 'admin')
with check (public.current_user_role() = 'admin');

create policy "transactions owner read write" on public.transactions
for all using (public.current_user_role() = 'owner')
with check (public.current_user_role() = 'owner');

create policy "transactions member own read" on public.transactions
for select using (
    exists (
        select 1 from public.bookings b
        where b.id = transactions.booking_id
        and b.customer_id = public.current_customer_id()
    )
);

-- FEEDBACKS
create policy "feedbacks admin owner read all" on public.feedbacks
for select using (public.current_user_role() in ('admin', 'owner'));

create policy "feedbacks admin full access" on public.feedbacks
for all using (public.current_user_role() = 'admin')
with check (public.current_user_role() = 'admin');

create policy "feedbacks member own read" on public.feedbacks
for select using (customer_id = public.current_customer_id());

create policy "feedbacks member create for own completed booking" on public.feedbacks
for insert with check (
    customer_id = public.current_customer_id()
    and exists (
        select 1 from public.bookings b
        where b.id = feedbacks.booking_id
        and b.customer_id = public.current_customer_id()
        and b.status = 'Completed'
    )
);

create policy "feedbacks barber assigned read" on public.feedbacks
for select using (
    exists (
        select 1
        from public.bookings b
        join public.barbers br on br.id = b.barber_id
        where b.id = feedbacks.booking_id
        and br.user_id = auth.uid()
    )
);

-- POINT HISTORIES
create policy "point histories admin full access" on public.point_histories
for all using (public.current_user_role() = 'admin')
with check (public.current_user_role() = 'admin');

create policy "point histories owner read" on public.point_histories
for select using (public.current_user_role() = 'owner');

create policy "point histories member own read" on public.point_histories
for select using (customer_id = public.current_customer_id());
