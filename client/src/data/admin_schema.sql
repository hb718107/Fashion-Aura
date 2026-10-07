create table if not exists public.admin_users (
  id uuid default gen_random_uuid() primary key,
  username text unique not null,
  password_hash text not null,
  role text default 'admin',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.admin_users disable row level security;

insert into public.admin_users (username, password_hash)
values ('admin', 'aura2024')
on conflict (username) do nothing;
