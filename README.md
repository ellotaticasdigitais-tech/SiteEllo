# Site Ello Táticas Digitais

Site institucional e comercial da Ello Táticas Digitais (Louveira-SP).

- `src/routes` — páginas (Home, Serviços + LPs, Método ACELERA, Planos, Tecnologia, Cases, Sobre, Ello Lab, Blog, Contato, legais, sitemap.xml)
- `src/components` — layout, seções da home, formulários, animações, marca
- `src/data` — todo o conteúdo editável (serviços, planos, cases, FAQ, dados institucionais)
- `src/lib` — formulários (validação + envio seguro), WhatsApp, analytics, consentimento, SEO

Documentação:
- `docs/PENDENCIAS.md` — o que falta a Ello enviar/aprovar antes de publicar
- `docs/ANALYTICS.md` — eventos de mensuração e validação
- `docs/PRODUCAO.md` — como rodar, publicar, domínio, segurança e checklist

```bash
bun install && bun run dev
bunx vitest run
```
