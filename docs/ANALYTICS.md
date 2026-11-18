# Eventos de mensuração

Todos os eventos são enviados para `window.dataLayer` (Google Tag Manager) **somente depois** que o visitante aceita cookies de medição. Código: `src/lib/analytics.ts`.

| Evento | Quando dispara | Parâmetros |
| --- | --- | --- |
| `whatsapp_click` | Clique em qualquer botão de WhatsApp | `location`, `topic`, `service`, `case` |
| `cta_click` | Clique em CTAs principais | `cta`, `service` |
| `form_start` | Primeiro foco em um formulário | `form`, `origin` |
| `form_submit_success` | Envio **confirmado** pelo servidor (gravado no banco) | `form`, `origin` |
| `form_submit_error` | Validação no servidor, spam, limite ou falha | `form`, `origin`, `reason` |
| `service_click` | Clique em card de serviço | `service` |
| `plan_click` | Clique em "Quero este plano" | `plan` |
| `case_view` | Abertura de página de case | `case` |
| `ello_lab_signup` | Cadastro Ello Lab confirmado | `origin` |
| `commercial_conversion` | Qualquer outro formulário comercial confirmado | `form`, `origin` |

Todos incluem `page_path`.

## Origem da conversão
Cada envio grava no banco: `form_type`, `conversion_origin` (ex.: `home_diagnostico`, `lp_trafego-pago`, `contato_plano_expansao`), `source_page`, UTMs (`utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`) capturadas na primeira página da sessão e `referrer`.

## UTMs padronizadas (sugestão)
- `utm_source`: google, meta, linkedin, tiktok, instagram, email, whatsapp
- `utm_medium`: cpc, paid_social, organic_social, email, referral
- `utm_campaign`: `<servico>-<objetivo>-<aaaamm>` (ex.: `trafego-leads-202611`)

## Como validar
1. Configure `VITE_GTM_ID` e publique.
2. Abra o site com o modo Preview do GTM, aceite os cookies de medição.
3. Clique em um WhatsApp e envie um formulário: confira `whatsapp_click`, `form_start` e `form_submit_success` no painel do GTM.
4. Recuse os cookies em outra janela anônima: nenhum evento deve aparecer.
