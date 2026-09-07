-- Funda y llavero con fotos reales (PNG transparente).

update public.products
set base_image_url = '/productos/funda.png'
where category = 'funda';

update public.products
set base_image_url = '/productos/llavero.png'
where category = 'llavero';

update public.product_variants
set image_url = '/productos/funda.png'
where variant_type = 'model'
  and variant_label in ('iPhone', 'Samsung', 'Motorola', 'Xiaomi');
