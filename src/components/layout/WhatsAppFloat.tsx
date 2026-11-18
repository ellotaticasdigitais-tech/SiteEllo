import { useRouterState } from "@tanstack/react-router";
import { track } from "@/lib/analytics";
import { topicForPath, whatsappLink } from "@/lib/whatsapp";

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.04 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.43 9.43 0 1 1 7.99 4.42m8.02-17.45A11.27 11.27 0 0 0 12.04.75C5.8.75.72 5.83.72 12.07c0 2 .52 3.94 1.51 5.65L.62 23.6l6.02-1.58a11.3 11.3 0 0 0 5.4 1.38h.01c6.24 0 11.32-5.08 11.32-11.32 0-3.03-1.18-5.87-3.31-8.01" />
    </svg>
  );
}

/** Discreet floating WhatsApp button with a message matched to the current page. */
export function WhatsAppFloat() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const topic = topicForPath(pathname);
  return (
    <a
      href={whatsappLink(topic)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar com a Ello no WhatsApp"
      onClick={() => track("whatsapp_click", { location: "float", topic })}
      className="group fixed bottom-4 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-lift transition-transform duration-300 hover:-translate-y-1 hover:scale-105 sm:bottom-6 sm:right-6"
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-whatsapp opacity-25 motion-reduce:hidden" />
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
