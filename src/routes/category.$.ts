import { createFileRoute } from "@tanstack/react-router";

import { legacyTarget, permanentRedirect } from "@/lib/redirects";

/** Endereço antigo do WordPress: redireciona (301) para a página nova. */
export const Route = createFileRoute("/category/$")({
  server: {
    handlers: {
      GET: ({ params }) => permanentRedirect(legacyTarget("category", params._splat)),
    },
  },
});
