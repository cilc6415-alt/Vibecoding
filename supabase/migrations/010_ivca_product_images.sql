-- ============================================================
-- 010 · IVCA Crafts — fotos reales de productos en cotizador
-- ============================================================

update public.products
set base_image_url = '/productos/termo-20oz.jpg'
where category = 'termo';

update public.products
set base_image_url = '/productos/funda.jpg'
where category = 'funda';

update public.product_variants
set image_url = '/productos/termo-12oz.jpg'
where variant_label = '12 onzas';

update public.product_variants
set image_url = '/productos/termo-20oz.jpg'
where variant_label = '20 onzas';

update public.product_variants
set image_url = '/productos/termo-30oz.jpg'
where variant_label = '30 onzas';

update public.product_variants
set image_url = '/productos/funda.jpg'
where variant_label in ('iPhone', 'Samsung', 'Motorola', 'Xiaomi');
