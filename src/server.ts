import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture"; // must be imported before any other modules that may throw, so the first line of this file
import { renderErrorPage } from "./lib/error-page";// must be imported before any other modules that may throw, so the first line of this file
type ServerEntry = { 
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response; // may be a Response or a Promise<Response>
};

let serverEntryPromise: Promise<ServerEntry> | undefined; // lazy-load the server entry to avoid module load errors from breaking the entire worker

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) { // lazy-load the server entry to avoid module load errors from breaking the entire worker
    serverEntryPromise = import("@tanstack/react-start/server-entry").then( // may be a Response or a Promise<Response>
      (m) => (m.default ?? m) as ServerEntry,// may be a Response or a Promise<Response>
    );
  }
  return serverEntryPromise; // may be a Response or a Promise<Response>
}


// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response; // not a catastrophic SSR error, so return the original response
  const contentType = response.headers.get("content-type") ?? ""; // not a catastrophic SSR error, so return the original response
  if (!contentType.includes("application/json")) return response; 

  const body = await response.clone().text(); // read the body text so we can check if it's the h3-swallowed error JSON; clone() so we don't consume the original response's body
  if (!isH3SwallowedErrorBody(body)) return response;// not the h3 error body, so return the original response

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), { // still 500, but now with a proper error page instead of the JSON body
    status: 500, // still 500, but now with a proper error page instead of the JSON body
    headers: { "content-type": "text/html; charset=utf-8" },
  }); // still 500, but now with a proper error page instead of the JSON body
}

function isH3SwallowedErrorBody(body: string): boolean {// check if the body is the h3-swallowed error JSON
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false; // not JSON, so not the h3 error body
  }
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try { // this try/catch is for catastrophic errors that happen before the handler is even called, e.g. a module load error
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx); // may be a Response or a Promise<Response>
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) { // this try/catch is for catastrophic errors that happen before the handler is even called, e.g. a module load error
      console.error(error);
      return new Response(renderErrorPage(), {// still 500, but now with a proper error page instead of the JSON body
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
