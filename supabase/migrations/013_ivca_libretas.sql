-- ============================================================
-- 013 · IVCA Crafts — categoría Libretas
-- ------------------------------------------------------------
-- Agrega producto libreta, amplía checks de quote_items y
-- añade design_notes para la descripción libre del diseño.
-- ============================================================

-- products.category → incluir libreta
alter table public.products drop constraint if exists products_category_check;
alter table public.products
  add constraint products_category_check
  check (category in ('termo', 'funda', 'llavero', 'libreta'));

comment on table public.products is
  'Categorías de producto IVCA Crafts (termo, funda, llavero, libreta).';

-- Seed libreta (sin variantes: diseño y hojas se eligen en el cotizador)
insert into public.products (id, name, category, base_image_url, active)
values (
  'a1000000-0000-4000-8000-000000000004',
  'Libreta artesanal',
  'libreta',
  '/productos/libreta.png',
  true
)
on conflict (id) do update
set
  name = excluded.name,
  category = excluded.category,
  base_image_url = excluded.base_image_url,
  active = excluded.active;

-- quote_items.design_type → diseños de libreta
alter table public.quote_items drop constraint if exists quote_items_design_type_check;
alter table public.quote_items
  add constraint quote_items_design_type_check
  check (design_type in (
    'tinta_alcohol',
    'glitter',
    'fondo',
    'personaje_tematica',
    'imagen_tematica'
  ));

-- quote_items.color_option → tipo de hojas de libreta
alter table public.quote_items drop constraint if exists quote_items_color_option_check;
alter table public.quote_items
  add constraint quote_items_color_option_check
  check (color_option in (
    'color_tinta',
    '2_colores_glitter',
    'glitter_geoda1',
    'glitter_geoda2',
    'hojas_blancas',
    'hojas_colores'
  ));

-- quote_items.personalization_type → llavero + libreta (+ inicial suelta)
alter table public.quote_items drop constraint if exists quote_items_personalization_type_check;
alter table public.quote_items
  add constraint quote_items_personalization_type_check
  check (personalization_type in (
    'nombre',
    'inicial',
    'inicial_nombre',
    'sin_personalizar',
    'nombre_corto',
    'nombre_portada',
    'sin_nombre_portada'
  ));

-- Descripción libre del diseño (libretas; opcional en otros)
alter table public.quote_items
  add column if not exists design_notes text;

comment on column public.quote_items.design_notes is
  'Descripción libre del diseño (principalmente libretas).';
