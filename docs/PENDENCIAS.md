# Pendências antes da publicação — Site Ello

Itens que dependem de material ou aprovação da Ello. Nada abaixo foi inventado no site; onde faltou informação, o site mostra um estado honesto ("em preparação") ou o item fica oculto.

## Marca
- [ ] **Logotipo oficial (roxo + amarelo em degradê) em SVG** — o site usa um logo provisório desenhado a partir do "arco" do wireframe (`src/components/brand/Logo.tsx`). Substituir pelo arquivo oficial em `public/brand`.
- [ ] **Manual de identidade (PDF)** — não veio nos anexos. Cores foram extraídas do wireframe (#2A0C53, #561384, #5F29BF, #FDC501, #F8A502, #F2E8D6). Fontes provisórias: Bricolage Grotesque (títulos) + DM Sans (texto).
- [ ] Favicon oficial.
- [ ] Imagem `5.jpg` (balão de fala) tem marca d'água do Freepik — **não utilizada**. Enviar versão licenciada se quiserem usá-la.

## Conteúdo a validar
- [ ] Indicadores: "4 anos", "+13 anos combinados", "+R$500 mil geridos" (`src/data/site.ts`).
- [ ] Parceiros/ferramentas: RD Station Partner, mLabs, Google Ads, Meta Business Partner.
- [ ] Autorização de uso das marcas Blueberry Alimentos, Ecopietra e Aghuia (faixa de logos e cases) + arquivos de logo.
- [ ] Cases: contexto, desafio, estratégia, serviços, resultados com fonte e período, peças reais e depoimento. Hoje os 3 cases estão como rascunho (noindex). Para publicar, preencher em `src/data/cases.ts` e mudar `status` para `"published"`.
- [ ] Clientes aguardando autorização: BM Estrutural, EXON, Mercadão Central, Rede Alvorada, ERA.
- [ ] Depoimentos reais autorizados (Google, WhatsApp, vídeo) — `src/data/content.ts`.
- [ ] Vídeo humanizado do hero (Melina/Lucas) + poster — `src/components/home/Hero.tsx` (`heroVideo`).
- [ ] Fotos reais dos fundadores e da equipe (seção Quem somos e bloco "especialistas").
- [ ] Missão, visão e valores oficiais (a página Sobre usa os princípios do comparativo do wireframe).
- [ ] **Faixas de faturamento do Ello Lab** — o material não definiu; foram usadas faixas provisórias em `src/data/content.ts`.
- [ ] Prints reais da Ello IA e do Ello CRM (hoje há ilustrações marcadas como tal).
- [ ] Decisão: exibir faixa de investimento nos planos? Hoje: "Consultar investimento".
- [ ] Composição do plano Ello Conexão em relação aos itens do Performance/Expansão (marcados como "Sob consulta").
- [ ] 9ª landing page de serviço: o wireframe fala em 9 LPs mas lista 8 serviços. Foi criada a LP da **Ello IA** (`/servicos/ello-ia`), já que o template diz "vale para os 9 serviços + Ello IA". Confirmar se existe um 9º serviço.

## Divergências entre arquivos
- Título do hero: wireframe usa "Tática que conecta ideias a resultado."; o briefing pede "Táticas que geram RESULTADOS." com roleta. Adotado o briefing no H1; a frase do wireframe aparece na seção Posicionamento.
- Plano 3: PDF diz "Ello Consolidação", HTML diz "Ello Conexão". Adotado **Ello Conexão** (HTML e briefing).
- Timeline: HTML "Dias 3–5 / 5–8 / 8–12"; PDF "Dia 3-4 / 5-6 / 7-10". Adotado o HTML (mais completo).

## Institucional / legal
- [ ] CNPJ (`site.cnpj` em `src/data/site.ts`) — rodapé e políticas exibem automaticamente quando preenchido.
- [ ] Redes sociais oficiais (`site.social`).
- [ ] Revisão jurídica das Políticas de Privacidade, Cookies e Termos de Uso.
- [ ] "Trabalhe conosco": não criado — falta processo de recebimento definido.
- [ ] Blog: nenhum artigo publicado (página fica noindex até o primeiro artigo).

## Integrações
- [ ] `VITE_GTM_ID` (Google Tag Manager) — só carrega após consentimento.
- [ ] `LEADS_WEBHOOK_URL` (opcional) para encaminhar contatos ao CRM/automação.
- [ ] Meta Pixel / Google Ads — configurar dentro do GTM, na categoria "Marketing".
- [ ] Google Search Console após a publicação no domínio definitivo.
