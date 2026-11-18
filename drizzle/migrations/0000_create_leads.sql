CREATE TABLE public.leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  form_type text NOT NULL,
  name text NOT NULL,
  company text,
  email text,
  whatsapp text,
  objective text,
  revenue_range text,
  service_interest text,
  message text,
  source_page text,
  conversion_origin text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,
  referrer text,
  consent_privacy boolean NOT NULL DEFAULT false,
  ip_hash text,
  user_agent text,
  status text NOT NULL DEFAULT 'novo',
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT ALL ON public.leads TO service_role;

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE INDEX leads_created_at_idx ON public.leads (created_at DESC);
CREATE INDEX leads_ip_hash_created_idx ON public.leads (ip_hash, created_at DESC);

COMMENT ON TABLE public.leads IS 'Form submissions (diagnóstico, Ello Lab, contato, CRM interest). Written only by server functions with service role; no client access.';