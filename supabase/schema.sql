create table if not exists waitlist (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null unique,
  whatsapp    text,
  user_type   text check (user_type in ('diner','corper','new','owner','other')) default 'diner',
  hardest_dish text,
  joined_at   timestamptz default now()
);

alter table waitlist enable row level security;

create policy "Anyone can join waitlist"
  on waitlist for insert
  with check (true);

create policy "Authenticated users can read waitlist"
  on waitlist for select
  using (auth.role() = 'authenticated');
