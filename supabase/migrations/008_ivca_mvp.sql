-- ============================================================
-- 008 · IVCA Crafts MVP
-- ------------------------------------------------------------
-- Catálogo (products + variants), galería NOSOTROS, cotizaciones
-- públicas (quotes + quote_items) y dashboard del dueño.
-- ============================================================

-- ------------------------------------------------------------
-- products
-- ------------------------------------------------------------
create table if not exists public.products (
  id              uuid primary key default gen_random_uuid(),
  name            text not null,
  category        text not null check (category in ('termo', 'funda', 'llavero')),
  base_image_url  text,
  active          boolean not null default true,
  created_at      timestamptz not null default now()
);

comment on table public.products is 'Categorías de producto IVCA Crafts (termo, funda, llavero).';

-- ------------------------------------------------------------
-- product_variants (opciones de submenú)
-- ------------------------------------------------------------
create table if not exists public.product_variants (
  id              uuid primary key default gen_random_uuid(),
  product_id      uuid not null references public.products (id) on delete cascade,
  variant_type    text not null,
  variant_label   text not null,
  image_url       text,
  active          boolean not null default true,
  sort_order      int not null default 0,
  created_at      timestamptz not null default now()
);

comment on table public.product_variants is 'Variantes de catálogo: tallas, modelos, diseños de submenú.';

create index if not exists product_variants_product_id_idx
  on public.product_variants (product_id, sort_order);

-- ------------------------------------------------------------
-- gallery_images (carrusel NOSOTROS)
-- ------------------------------------------------------------
create table if not exists public.gallery_images (
  id          uuid primary key default gen_random_uuid(),
  image_url   text not null,
  caption     text,
  sort_order  int not null default 0,
  active      boolean not null default true,
  created_at  timestamptz not null default now()
);

comment on table public.gallery_images is 'Fotos del carrusel de la sección Nosotros.';

-- ------------------------------------------------------------
-- quotes
-- ------------------------------------------------------------
create table if not exists public.quotes (
  id            uuid primary key default gen_random_uuid(),
  client_name   text not null,
  client_phone  text not null,
  status        text not null default 'enviada'
                  check (status in ('borrador', 'enviada', 'autorizada', 'en_proceso', 'terminada')),
  created_at    timestamptz not null default now(),
  authorized_at timestamptz
);

comment on table public.quotes is 'Cotizaciones de clientes IVCA Crafts.';

create index if not exists quotes_status_created_idx
  on public.quotes (status, created_at desc);

-- ------------------------------------------------------------
-- quote_items
-- ------------------------------------------------------------
create table if not exists public.quote_items (
  id                    uuid primary key default gen_random_uuid(),
  quote_id              uuid not null references public.quotes (id) on delete cascade,
  product_id            uuid not null references public.products (id),
  variant_id            uuid references public.product_variants (id) on delete set null,
  design_type           text not null check (design_type in ('tinta_alcohol', 'glitter')),
  color_option          text not null
                          check (color_option in (
                            'color_tinta',
                            '2_colores_glitter',
                            'glitter_geoda1',
                            'glitter_geoda2'
                          )),
  color_detail          text,
  personalization_type  text not null
                          check (personalization_type in (
                            'nombre',
                            'inicial_nombre',
                            'sin_personalizar'
                          )),
  personalization_text  text,
  quantity              int not null check (quantity > 0),
  created_at            timestamptz not null default now()
);

comment on table public.quote_items is 'Líneas de cada cotización.';

create index if not exists quote_items_quote_id_idx
  on public.quote_items (quote_id);

-- ------------------------------------------------------------
-- RLS · catálogo y galería (lectura pública)
-- ------------------------------------------------------------
alter table public.products enable row level security;
alter table public.product_variants enable row level security;
alter table public.gallery_images enable row level security;

drop policy if exists "products_select_active" on public.products;
create policy "products_select_active"
  on public.products for select
  using (active = true);

drop policy if exists "product_variants_select_active" on public.product_variants;
create policy "product_variants_select_active"
  on public.product_variants for select
  using (active = true);

drop policy if exists "gallery_images_select_active" on public.gallery_images;
create policy "gallery_images_select_active"
  on public.gallery_images for select
  using (active = true);

-- ------------------------------------------------------------
-- RLS · cotizaciones (insert público, gestión dueño)
-- ------------------------------------------------------------
alter table public.quotes enable row level security;
alter table public.quote_items enable row level security;

drop policy if exists "quotes_insert_public" on public.quotes;
create policy "quotes_insert_public"
  on public.quotes for insert
  to anon, authenticated
  with check (true);

drop policy if exists "quote_items_insert_public" on public.quote_items;
create policy "quote_items_insert_public"
  on public.quote_items for insert
  to anon, authenticated
  with check (true);

drop policy if exists "quotes_owner_select" on public.quotes;
create policy "quotes_owner_select"
  on public.quotes for select
  to authenticated
  using ((auth.jwt() ->> 'email') = 'cilc6415@gmail.com');

drop policy if exists "quotes_owner_update" on public.quotes;
create policy "quotes_owner_update"
  on public.quotes for update
  to authenticated
  using ((auth.jwt() ->> 'email') = 'cilc6415@gmail.com')
  with check ((auth.jwt() ->> 'email') = 'cilc6415@gmail.com');

drop policy if exists "quote_items_owner_select" on public.quote_items;
create policy "quote_items_owner_select"
  on public.quote_items for select
  to authenticated
  using (
    exists (
      select 1 from public.quotes q
      where q.id = quote_id
        and (auth.jwt() ->> 'email') = 'cilc6415@gmail.com'
    )
  );

drop policy if exists "quote_items_owner_update" on public.quote_items;
create policy "quote_items_owner_update"
  on public.quote_items for update
  to authenticated
  using (
    exists (
      select 1 from public.quotes q
      where q.id = quote_id
        and (auth.jwt() ->> 'email') = 'cilc6415@gmail.com'
    )
  )
  with check (
    exists (
      select 1 from public.quotes q
      where q.id = quote_id
        and (auth.jwt() ->> 'email') = 'cilc6415@gmail.com'
    )
  );

-- ------------------------------------------------------------
-- Seed · productos y variantes (placeholders de imagen)
-- ------------------------------------------------------------
insert into public.products (id, name, category, base_image_url, active)
values
  ('a1000000-0000-4000-8000-000000000001', 'Termo', 'termo', '/placeholders/termo.svg', true),
  ('a1000000-0000-4000-8000-000000000002', 'Funda para celular', 'funda', '/placeholders/funda.svg', true),
  ('a1000000-0000-4000-8000-000000000003', 'Llavero de resina', 'llavero', '/placeholders/llavero.svg', true)
on conflict (id) do nothing;

insert into public.product_variants (id, product_id, variant_type, variant_label, image_url, sort_order, active)
values
  ('b1000000-0000-4000-8000-000000000001', 'a1000000-0000-4000-8000-000000000001', 'size', '12 onzas', '/placeholders/termo-12.svg', 1, true),
  ('b1000000-0000-4000-8000-000000000002', 'a1000000-0000-4000-8000-000000000001', 'size', '20 onzas', '/placeholders/termo-20.svg', 2, true),
  ('b1000000-0000-4000-8000-000000000003', 'a1000000-0000-4000-8000-000000000001', 'size', '30 onzas', '/placeholders/termo-30.svg', 3, true),
  ('b1000000-0000-4000-8000-000000000004', 'a1000000-0000-4000-8000-000000000002', 'model', 'iPhone', '/placeholders/funda-iphone.svg', 1, true),
  ('b1000000-0000-4000-8000-000000000005', 'a1000000-0000-4000-8000-000000000002', 'model', 'Samsung', '/placeholders/funda-samsung.svg', 2, true),
  ('b1000000-0000-4000-8000-000000000006', 'a1000000-0000-4000-8000-000000000002', 'model', 'Motorola', '/placeholders/funda-motorola.svg', 3, true),
  ('b1000000-0000-4000-8000-000000000007', 'a1000000-0000-4000-8000-000000000002', 'model', 'Xiaomi', '/placeholders/funda-xiaomi.svg', 4, true),
  ('b1000000-0000-4000-8000-000000000008', 'a1000000-0000-4000-8000-000000000003', 'design', 'Tinta al alcohol', '/placeholders/llavero-tinta.svg', 1, true),
  ('b1000000-0000-4000-8000-000000000009', 'a1000000-0000-4000-8000-000000000003', 'design', 'Glitter', '/placeholders/llavero-glitter.svg', 2, true)
on conflict (id) do nothing;

insert into public.gallery_images (image_url, caption, sort_order, active)
values
  ('/placeholders/gallery-1.svg', 'Trabajo realizado — placeholder', 1, true),
  ('/placeholders/gallery-2.svg', 'Trabajo realizado — placeholder', 2, true),
  ('/placeholders/gallery-3.svg', 'Trabajo realizado — placeholder', 3, true)
on conflict do nothing;
