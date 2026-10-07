-- Fashion Aura Supabase Schema
create table if not exists products (
  id text primary key,
  sku text not null,
  name text not null,
  category text not null,
  sub_category text not null,
  tags text[] default '{}',
  moq integer default 50,
  lead_time text default '14 Business Days',
  fabric text not null,
  customization text,
  image text not null,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Row Level Security (Public Read, Admin Write)
alter table products enable row level security;

create policy "Allow public read access" on products
  for select using (true);

create policy "Allow authenticated write" on products
  for all using (auth.role() = 'authenticated');
