ALTER TABLE public.rentals
  ADD COLUMN IF NOT EXISTS featured boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS availability text NOT NULL DEFAULT 'available';