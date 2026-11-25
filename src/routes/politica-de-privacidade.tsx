import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/layout/LegalPage";
import { fullAddress, site } from "@/data/site";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/politica-de-privacidade")({
  head: () =>
    pageHead({
      title: "Política de Privacidade | Ello Táticas Digitais",
      description: "Como a Ello Táticas Digitais coleta, usa, armazena e protege dados pessoais, em conformidade com a LGPD.",
      path: "/politica-de-privacidade",
    }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <LegalPage title="Política de Privacidade" crumb="Política de privacidade" updated="outubro de 2026">
      <section className="space-y-3">
        <h2>1. Quem somos</h2>
        <p>
          Esta política descreve como a <strong>{site.name}</strong>
          {site.cnpj ? `, inscrita no CNPJ ${site.cnpj},` : ""} com endereço em {fullAddress}, trata dados pessoais coletados neste site, nos
          termos da Lei nº 13.709/2018 (Lei Geral de Proteção de Dados, LGPD).
        </p>
      </section>
      <section className="space-y-3">
        <h2>2. Dados que coletamos</h2>
        <ul>
          <li><strong>Formulários:</strong> nome, empresa, e-mail, WhatsApp, objetivo, faixa de faturamento, serviço de interesse e mensagem, conforme cada formulário.</li>
          <li><strong>Origem da conversão:</strong> página de envio, parâmetros de campanha (UTM) e site de origem.</li>
          <li><strong>Dados técnicos:</strong> identificador do navegador e um código irreversível derivado do endereço IP, usados apenas para segurança e prevenção de spam.</li>
          <li><strong>Cookies:</strong> conforme a <a href="/politica-de-cookies" className="font-semibold text-plum underline">Política de Cookies</a> e suas preferências.</li>
        </ul>
      </section>
      <section className="space-y-3">
        <h2>3. Para que usamos os dados</h2>
        <ul>
          <li>Responder solicitações de contato, diagnóstico e orçamento.</li>
          <li>Enviar informações sobre o Ello Lab e sobre o lançamento do Ello CRM, quando solicitado.</li>
          <li>Medir a origem dos contatos e melhorar nossas campanhas, mediante consentimento para cookies de medição e marketing.</li>
          <li>Garantir a segurança do site e prevenir envios abusivos.</li>
        </ul>
      </section>
      <section className="space-y-3">
        <h2>4. Bases legais</h2>
        <p>Tratamos dados com base no consentimento do titular, na execução de procedimentos preliminares a contrato solicitados por você e no legítimo interesse da Ello para segurança e prevenção de fraudes.</p>
      </section>
      <section className="space-y-3">
        <h2>5. Compartilhamento</h2>
        <p>Os dados podem ser processados por fornecedores que nos ajudam a operar o site, armazenar informações e gerenciar o relacionamento comercial (hospedagem, banco de dados, CRM e ferramentas de medição), sempre limitados às finalidades desta política. Não vendemos dados pessoais.</p>
      </section>
      <section className="space-y-3">
        <h2>6. Armazenamento e segurança</h2>
        <p>Os dados são armazenados em ambiente protegido, com acesso restrito à equipe responsável, e mantidos pelo tempo necessário às finalidades informadas ou ao cumprimento de obrigações legais.</p>
      </section>
      <section className="space-y-3">
        <h2>7. Seus direitos</h2>
        <p>Você pode solicitar confirmação de tratamento, acesso, correção, anonimização, portabilidade, eliminação dos dados tratados com base no consentimento, informações sobre compartilhamento e revogação do consentimento, conforme o art. 18 da LGPD.</p>
        <p>
          Para exercer seus direitos, escreva para <a href={`mailto:${site.email}`} className="font-semibold text-plum underline">{site.email}</a>.
        </p>
      </section>
      <section className="space-y-3">
        <h2>8. Alterações</h2>
        <p>Esta política pode ser atualizada. A data da última atualização fica sempre indicada no topo desta página.</p>
      </section>
    </LegalPage>
  );
}
