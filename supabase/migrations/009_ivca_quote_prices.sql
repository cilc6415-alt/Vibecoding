-- ============================================================
-- 009 · IVCA Crafts — modelo de teléfono y precio en cotizaciones
-- ============================================================

alter table public.quote_items
  add column if not exists phone_model text,
  add column if not exists unit_price numeric(10, 2);

comment on column public.quote_items.phone_model is 'Modelo del celular cuando el producto es funda.';
comment on column public.quote_items.unit_price is 'Precio unitario en MXN al momento de cotizar.';
