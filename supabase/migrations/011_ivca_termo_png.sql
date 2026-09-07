-- Termos con fondo transparente (PNG) en el cotizador.

update public.products
set base_image_url = '/productos/termo-20oz.png'
where category = 'termo';

update public.product_variants
set image_url = '/productos/termo-12oz.png'
where variant_label = '12 onzas';

update public.product_variants
set image_url = '/productos/termo-20oz.png'
where variant_label = '20 onzas';

update public.product_variants
set image_url = '/productos/termo-30oz.png'
where variant_label = '30 onzas';
