-- Row Level Security'ni yoqish va to'g'ri ruxsatlarni belgilash

-- CARS jadvali: hamma o'qiy oladi, faqat tizimga kirgan foydalanuvchi qo'sha oladi
alter table cars enable row level security;

drop policy if exists "Cars are viewable by everyone" on cars;
create policy "Cars are viewable by everyone"
  on cars for select
  using (true);

drop policy if exists "Authenticated users can insert cars" on cars;
create policy "Authenticated users can insert cars"
  on cars for insert
  to authenticated
  with check (true);

drop policy if exists "Users can update their own cars" on cars;
create policy "Users can update their own cars"
  on cars for update
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can delete their own cars" on cars;
create policy "Users can delete their own cars"
  on cars for delete
  to authenticated
  using (auth.uid() = user_id);

-- USERS jadvali: hamma o'qiy oladi, foydalanuvchi faqat o'zini yangilay oladi
alter table users enable row level security;

drop policy if exists "Users are viewable by everyone" on users;
create policy "Users are viewable by everyone"
  on users for select
  using (true);

drop policy if exists "Users can update their own profile" on users;
create policy "Users can update their own profile"
  on users for update
  to authenticated
  using (auth.uid() = id);
