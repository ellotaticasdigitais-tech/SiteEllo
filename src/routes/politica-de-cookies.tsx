import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/layout/LegalPage";
import { Button } from "@/components/ui/button";
import { openCookiePreferences } from "@/lib/consent";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/politica-de-cookies")({
  head: () =>
    pageHead({
      title: "Política de Cookies | Ello Táticas Digitais",
      description: "Quais cookies e tecnologias semelhantes o site da Ello utiliza e como gerenciar suas preferências.",
      path: "/politica-de-cookies",
    }),
  component: CookiesPage,
});

function CookiesPage() {
  return (
    <LegalPage title="Política de Cookies" crumb="Política de cookies" updated="outubro de 2026">
      <section className="space-y-3">
        <h2>O que são cookies</h2>
        <p>Cookies e tecnologias semelhantes (como armazenamento local do navegador) guardam pequenas informações no seu dispositivo para que o site funcione e para entendermos como ele é usado.</p>
      </section>
      <section className="space-y-3">
        <h2>Categorias utilizadas</h2>
        <ul>
          <li><strong>Essenciais:</strong> lembram sua escolha de cookies e a origem da visita durante a sessão. Sempre ativos.</li>
          <li><strong>Medição:</strong> Google Analytics e Google Tag Manager, carregados somente após o seu consentimento.</li>
          <li><strong>Marketing:</strong> pixels de anúncios (como Meta e Google Ads), ativados somente com o seu consentimento e quando aprovados pela Ello.</li>
        </ul>
      </section>
      <section className="space-y-3">
        <h2>Como gerenciar</h2>
        <p>Você pode alterar suas preferências a qualquer momento, também pelo link “Preferências de cookies” no rodapé.</p>
        <Button variant="ink" onClick={openCookiePreferences}>
          Abrir preferências de cookies
        </Button>
      </section>
    </LegalPage>
  );
}
