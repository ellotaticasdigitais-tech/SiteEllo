import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/layout/LegalPage";
import { site } from "@/data/site";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/termos-de-uso")({
  head: () =>
    pageHead({
      title: "Termos de Uso | Ello Táticas Digitais",
      description: "Condições de uso do site da Ello Táticas Digitais, conteúdos, propriedade intelectual e responsabilidades.",
      path: "/termos-de-uso",
    }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <LegalPage title="Termos de Uso" crumb="Termos de uso" updated="outubro de 2026">
      <section className="space-y-3">
        <h2>1. Aceitação</h2>
        <p>Ao acessar este site, você concorda com estes Termos de Uso. Caso não concorde, recomendamos não utilizar o site.</p>
      </section>
      <section className="space-y-3">
        <h2>2. Conteúdo</h2>
        <p>As informações deste site têm caráter informativo e institucional. Condições comerciais, escopos e investimentos são apresentados apenas em proposta formal, após diagnóstico.</p>
      </section>
      <section className="space-y-3">
        <h2>3. Propriedade intelectual</h2>
        <p>Marcas, logotipos, textos, imagens e demais materiais pertencem à {site.name} ou a seus clientes e parceiros, e não podem ser reproduzidos sem autorização.</p>
      </section>
      <section className="space-y-3">
        <h2>4. Uso adequado</h2>
        <p>É proibido utilizar o site para enviar conteúdo ilícito, automatizar envios de formulários ou tentar comprometer sua segurança.</p>
      </section>
      <section className="space-y-3">
        <h2>5. Links externos</h2>
        <p>O site pode conter links para serviços de terceiros, como WhatsApp e Google Maps, que possuem políticas próprias.</p>
      </section>
      <section className="space-y-3">
        <h2>6. Contato</h2>
        <p>
          Dúvidas sobre estes termos: <a href={`mailto:${site.email}`} className="font-semibold text-plum underline">{site.email}</a>.
        </p>
      </section>
    </LegalPage>
  );
}
