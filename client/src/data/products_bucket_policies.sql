-- Enable public uploads and reads for the "products" bucket
create policy "Public Access to products bucket"
on storage.objects for select
using ( bucket_id = 'products' );

create policy "Allow uploads to products bucket"
on storage.objects for insert
with check ( bucket_id = 'products' );

create policy "Allow updates to products bucket"
on storage.objects for update
using ( bucket_id = 'products' );

create policy "Allow deletes from products bucket"
on storage.objects for delete
using ( bucket_id = 'products' );
