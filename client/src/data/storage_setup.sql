-- 1. Create storage bucket named "product-images"
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do update set public = true;

-- 2. Allow public to view images
create policy "Public Access to product-images"
on storage.objects for select
using ( bucket_id = 'product-images' );

-- 3. Allow uploads into product-images
create policy "Allow uploads to product-images"
on storage.objects for insert
with check ( bucket_id = 'product-images' );

-- 4. Allow updates & deletes in product-images
create policy "Allow updates in product-images"
on storage.objects for update
using ( bucket_id = 'product-images' );

create policy "Allow deletes in product-images"
on storage.objects for delete
using ( bucket_id = 'product-images' );
