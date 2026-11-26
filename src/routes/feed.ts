import { createFileRoute } from "@tanstack/react-router";

import { legacyTarget, permanentRedirect } from "@/lib/redirects";

/** Endereço antigo do WordPress: redireciona (301) para a página nova. */
export const Route = createFileRoute("/feed")({
  server: {
    handlers: {
      GET: () => permanentRedirect(legacyTarget("feed")),
    },
  },
});
