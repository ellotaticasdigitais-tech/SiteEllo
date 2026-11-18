# Produção, publicação e manutenção

## Stack
- TanStack Start (React 19, SSR) + Vite + Tailwind CSS v4 + TypeScript estrito.
- Formulários: React Hook Form + Zod (validação no navegador **e** no servidor).
- Backend: Lovable Cloud (banco de dados para os contatos recebidos).
- Hospedagem: publicação pelo Lovable (HTTPS automático, CDN). O código pode ser sincronizado com o GitHub pelo próprio Lovable.

> O briefing sugeria Next.js; o projeto usa TanStack Start, que cobre os mesmos requisitos (SSR, rotas, funções de servidor, SEO por página).

## Rodar localmente
```bash
bun install
bun run dev      # http://localhost:8080
bun run build
bunx vitest run  # testes de regras de negócio e rotas
```

## Variáveis de ambiente
Veja `.env.example`. Chaves do banco são gerenciadas automaticamente pelo Lovable Cloud.

## Onde ficam os contatos
Tabela de contatos no Lovable Cloud (menu Cloud → Database). Cada linha traz tipo de formulário, dados, origem, UTMs e data. Acesso apenas pelo servidor (sem leitura pública).

## Segurança aplicada
- Validação server-side, honeypot, tempo mínimo de preenchimento, limite de 5 envios por IP (hash) a cada 10 min.
- Nenhuma credencial no navegador; IP armazenado apenas como hash.
- Cabeçalhos: `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` (`src/start.ts`).
- CSP e `X-Frame-Options` não foram ativados para não quebrar o preview do editor, Google Fonts e GTM. Ativar no domínio final após listar as origens usadas.
- Consentimento LGPD: GTM/pixels só carregam após aceite.

## Domínio
Domínio de referência `ello.com.br` (a confirmar). Conectar em Settings → Domains do projeto Lovable; o HTTPS é emitido automaticamente. O `sitemap.xml` é gerado com o domínio da requisição.

## Checklist de produção
- [ ] Itens de `docs/PENDENCIAS.md` resolvidos
- [ ] Logo oficial e favicon
- [ ] `VITE_GTM_ID` configurado e eventos validados
- [ ] Formulários testados no domínio final
- [ ] Search Console + envio do sitemap
- [ ] Revisão jurídica dos textos legais
- [ ] Lighthouse mobile (meta: LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1)
