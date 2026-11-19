/**
 * Captações e edições feitas pela Ello (vídeos verticais, em public/videos/captacoes).
 * `caseSlug` liga o vídeo ao case do cliente, quando existe.
 */
export type Captacao = {
  id: string;
  title: string;
  client: string;
  caseSlug?: string;
  duration: string;
};

export const captacoes: Captacao[] = [
  { id: "ello-rebranding", title: "Rebranding da Ello", client: "Ello Táticas Digitais", caseSlug: "ello-taticas-digitais", duration: "1:18" },
  { id: "mercadao-todo-pai-faz", title: "Todo pai faz", client: "Mercadão Central", caseSlug: "mercadao-central", duration: "0:59" },
  { id: "exon-voltar-no-tempo", title: "Voltar no tempo", client: "Exon", duration: "1:00" },
  { id: "delante-fruitz", title: "Fruitz", client: "Delanté", duration: "0:53" },
  { id: "top-5-carnes", title: "Top 5 carnes", client: "Varejo alimentício", duration: "0:53" },
  { id: "burch-roteiro", title: "Roteiro 3", client: "Burch", duration: "0:17" },
  { id: "ello-podcast", title: "Podcast Ello", client: "Ello Táticas Digitais", caseSlug: "ello-taticas-digitais", duration: "2:03" },
];

export const videoSrc = (id: string) => `/videos/captacoes/${id}.mp4`;
export const videoPoster = (id: string) => `/videos/captacoes/${id}.jpg`;
