/**
 * Portfólio de cases da Ello.
 * Números só entram em `results` quando têm fonte e período confirmados.
 * Peças (criativos) ficam em public/cases/<cliente>/.
 */
export type CaseResult = { value: string; metric: string; source: "OFICIAL" | "ESTUDO" | "CLIENTE"; period: string };

export type NicheId = "varejo-alimenticio" | "alimenticio" | "industria" | "construcao" | "marketing";

export const niches: { id: NicheId; label: string }[] = [
  { id: "marketing", label: "Marketing e comunicação" },
  { id: "varejo-alimenticio", label: "Varejo e alimentício" },
  { id: "alimenticio", label: "Alimentício" },
  { id: "industria", label: "Indústria" },
  { id: "construcao", label: "Construção civil" },
];

/** `fit: "contain"` para imagens recortadas (ex.: a Luma), que aparecem inteiras sobre um fundo. */
export type Creative = { src: string; alt: string; fit?: "contain" };

export type SuccessCase = {
  slug: string;
  client: string;
  niche: NicheId;
  segment: string;
  status: "published" | "draft";
  /** Case em destaque no topo da página de cases. */
  featured?: boolean;
  logo?: string;
  /** Cor de fundo do cartão da logo (quando a logo tem fundo próprio). */
  logoBg?: string;
  /** Cor de destaque do case. */
  accent: string;
  headline: string;
  summary: string;
  delivered: string[];
  services?: string[];
  creatives: Creative[];
  instagram?: string;
  results?: CaseResult[];
  testimonial?: { text: string; author: string; role: string; city: string };
};

const c = (folder: string, file: string, alt: string): Creative => ({ src: `/cases/${folder}/${file}.webp`, alt });

export const cases: SuccessCase[] = [
  {
    slug: "ello-taticas-digitais",
    client: "Ello Táticas Digitais",
    niche: "marketing",
    segment: "Marketing e comunicação",
    status: "published",
    featured: true,
    logo: "/brand/ello-logo.webp",
    accent: "#5F29BF",
    headline: "A Ello aplicou o próprio método nela mesma",
    summary:
      "Antes de prometer para o cliente, testamos em casa: rebranding completo, criação da Luma, site novo com vídeo de boas-vindas e uma linha editorial que troca post solto por prova.",
    delivered: [
      "Rebranding completo: nova logo, símbolo e paleta",
      "Criação da Luma, personagem 3D da marca, com poses e vídeo animado",
      "Site novo, com planos e valores abertos e vídeo de entrada",
      "Linha editorial “menos post, mais prova” para o Instagram",
      "Fotos e vídeos reais do escritório e dos bastidores",
    ],
    services: ["dna-da-marca", "identidade-visual-e-branding", "sites-e-landing-pages", "gestao-de-redes-sociais"],
    creatives: [
      c("ello", "nova-identidade", "Post: a Ello mudou e a nossa identidade também"),
      { src: "/luma/luma-acenando.webp", alt: "Luma, personagem 3D da Ello, acenando", fit: "contain" },
      c("ello", "conteudo-2027", "Post: o conteúdo de 2027 vai ser menos post e mais prova"),
      { src: "/luma/luma-apresentando.webp", alt: "Luma apresentando", fit: "contain" },
      c("ello", "pivot", "Post: Pivot! Ajustar rota é tático"),
      { src: "/espaco/escritorio-equipe.webp", alt: "Equipe da Ello no escritório" },
    ],
    instagram: "ellotaticasdigitais",
  },
  {
    slug: "mercadao-central",
    client: "Rede Mercadão Central",
    niche: "varejo-alimenticio",
    segment: "Varejo e alimentício",
    status: "published",
    logo: "/clientes/mercadao-central.webp",
    logoBg: "#008345",
    accent: "#008345",
    headline: "Uma rede de supermercados presente o mês inteiro",
    summary:
      "Planejamento mensal de conteúdo, calendário promocional, stories e campanhas sazonais — além de mascote 3D e do programa interno de cultura Somos Central.",
    delivered: [
      "Planejamento e calendário mensal de conteúdo",
      "Stories e direcionamento diário de ofertas",
      "Campanhas sazonais e com fornecedores",
      "Mascote 3D e identidade de campanhas",
      "Programa Somos Central: treinamento de cultura",
    ],
    services: ["gestao-de-redes-sociais", "captacao-e-edicao-de-video"],
    creatives: [],
  },
  {
    slug: "alvorada-supermercados",
    client: "Rede Alvorada Supermercados",
    niche: "varejo-alimenticio",
    segment: "Varejo e alimentício",
    status: "published",
    logo: "/clientes/alvorada.webp",
    logoBg: "#7A1512",
    accent: "#C8102E",
    headline: "Ofertas que chamam o cliente para a loja",
    summary: "Campanhas de ofertas, datas comemorativas e conteúdo de relacionamento para uma rede de supermercados regional.",
    delivered: ["Campanhas de ofertas (Dia Super A)", "Posts de datas comemorativas", "Gestão de redes sociais", "Materiais para o app da rede"],
    services: ["gestao-de-redes-sociais"],
    creatives: [
      c("alvorada", "dia-super-a", "Campanha Dia Super A: ofertas arrasadoras"),
      c("alvorada", "dia-do-cafe", "Post do Dia Internacional do Café com oferta"),
    ],
  },
  {
    slug: "blueberry-alimentos",
    client: "Blueberry Alimentos",
    niche: "alimenticio",
    segment: "Alimentício",
    status: "published",
    logo: "/clientes/blueberry.webp",
    accent: "#4B2BA3",
    headline: "Frutas congeladas com posicionamento premium no B2B",
    summary:
      "Conteúdo para quem compra ingrediente: cada fruta ganhou uma narrativa de valor, e o perfil passou a falar de planejamento, logística e abastecimento para a indústria.",
    delivered: [
      "Linha editorial B2B para a indústria de alimentos",
      "Campanhas por fruta: mirtilo, acerola, amora, framboesa e abacaxi",
      "Conteúdo educativo sobre frutas IQF e sazonalidade",
      "Posts de prova: estados atendidos, logística e depoimentos",
    ],
    services: ["gestao-de-redes-sociais", "dna-da-marca"],
    creatives: [
      c("blueberry", "valor", "Mirtilo: pequeno no tamanho, gigante em valor"),
      c("blueberry", "acerola", "Acerola: pequena no tamanho, gigante em funcionalidade"),
      c("blueberry", "14-estados", "Mais de 14 estados atendidos"),
      c("blueberry", "framboesa", "Framboesa: pequenos detalhes criam grandes percepções"),
      c("blueberry", "amora", "Amora: cor intensa, sabor marcante"),
      c("blueberry", "entrega", "Como funciona nossa entrega"),
      c("blueberry", "frutas-iqf", "Frutas IQF na produção de alimentos"),
      c("blueberry", "abacaxi", "Abacaxi: equilíbrio entre doçura, acidez e versatilidade"),
      c("blueberry", "melhor-ingrediente", "O melhor ingrediente é estar presente"),
      c("blueberry", "frutas-caras", "Por que algumas frutas ficam mais caras"),
      c("blueberry", "mercado-muda", "O mercado muda, a demanda oscila"),
      c("blueberry", "qual-fruta", "Qual fruta não pode faltar na sua linha"),
    ],
  },
  {
    slug: "kie-maquinas",
    client: "KIE Máquinas",
    niche: "industria",
    segment: "Indústria",
    status: "published",
    logo: "/clientes/kie.webp",
    accent: "#169B45",
    headline: "Equipamentos de reciclagem explicados para quem decide a compra",
    summary:
      "Conteúdo técnico e comercial para uma fabricante de equipamentos de reciclagem: linhas de produto, comparativos e chamadas para decisão — além de fotos editadas e apoio ao site.",
    delivered: ["Posts técnicos de produto e comparativos", "Campanhas comerciais mensais", "Edição de fotos dos equipamentos", "Apoio ao conteúdo do site e blog"],
    services: ["gestao-de-redes-sociais", "sites-e-landing-pages"],
    creatives: [
      c("kie", "esteiras", "Esteiras EAK e ESK: antes de escolher, confira este detalhe"),
      c("kie", "novembro", "Outubro passou rápido. Novembro pede decisão."),
    ],
  },
  {
    slug: "empo-blocos",
    client: "EMPO Blocos Cerâmicos",
    niche: "construcao",
    segment: "Construção civil",
    status: "published",
    logo: "/clientes/empo.webp",
    accent: "#F07D1A",
    headline: "Blocos cerâmicos com presença digital de quem entende de obra",
    summary: "Gestão de conteúdo e produção de fotos para uma fabricante de blocos cerâmicos, mostrando produto, obra e aplicação.",
    delivered: ["Gestão de redes sociais", "Produção e edição de fotos", "Stories e conteúdo de obra"],
    services: ["gestao-de-redes-sociais", "captacao-e-edicao-de-video"],
    creatives: [],
  },
  {
    slug: "mf-furos",
    client: "MF Cortes e Furos em Concreto",
    niche: "construcao",
    segment: "Construção civil",
    status: "published",
    logo: "/clientes/mf-furos.webp",
    logoBg: "#141313",
    accent: "#E8601C",
    headline: "Serviço técnico com comunicação clara",
    summary: "Comunicação digital para uma empresa especializada em cortes e furos em concreto.",
    delivered: ["Gestão de redes sociais", "Criativos para divulgação dos serviços"],
    services: ["gestao-de-redes-sociais"],
    creatives: [],
  },
];

export function getCase(slug: string) {
  return cases.find((x) => x.slug === slug);
}

export const featuredCase = cases.find((x) => x.featured)!;
