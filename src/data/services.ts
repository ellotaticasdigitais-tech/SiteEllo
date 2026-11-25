import type { WhatsAppTopic } from "@/lib/whatsapp";

export type Service = {
  slug: string;
  name: string;
  short: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  whatsappTopic: WhatsAppTopic;
  /** Credibility row for the hero. Only values present in the wireframe. */
  highlights?: { value: string; label: string }[];
  includes: { title: string; text: string }[];
  problem: { title: string; text: string };
  differentials: { title: string; text: string }[];
  steps: { title: string; text: string }[];
  faqs: { q: string; a: string }[];
  ctaTitle: string;
  seoTitle: string;
  seoDescription: string;
  relatedCases?: string[];
  isTech?: boolean;
};

const defaultSteps = [
  { title: "1. Diagnóstico", text: "Uma conversa objetiva para entender seu momento, seu objetivo e o que já existe." },
  { title: "2. Planejamento", text: "Proposta com escopo, prioridades e prazos alinhados ao seu objetivo de negócio." },
  { title: "3. Execução e acompanhamento", text: "Entregas com rotina de acompanhamento e leitura estratégica dos resultados." },
];

export const services: Service[] = [
  {
    slug: "dna-da-marca",
    name: "DNA da Marca",
    short: "Propósito, personalidade, tom de voz e diferenciais.",
    eyebrow: "DNA da Marca · Posicionamento",
    title: "Uma marca que sabe quem é vende com mais clareza.",
    subtitle:
      "Definimos propósito, personalidade, tom de voz e diferenciais da sua empresa para que toda a comunicação fale a mesma língua, do Instagram à proposta comercial.",
    whatsappTopic: "branding",
    includes: [
      { title: "Propósito e posicionamento", text: "O porquê da sua empresa e o lugar que ela quer ocupar na mente do cliente." },
      { title: "Personalidade de marca", text: "Atributos que orientam decisões visuais e de comunicação." },
      { title: "Tom de voz", text: "Como sua marca fala, escreve e responde em cada canal." },
      { title: "Diferenciais", text: "Argumentos claros do que torna sua empresa a melhor escolha." },
    ],
    problem: {
      title: "Sem DNA definido, cada peça conta uma história diferente",
      text: "Quando a marca não tem posicionamento claro, conteúdo, anúncios e atendimento passam mensagens desencontradas, e o cliente não entende por que escolher você.",
    },
    differentials: [
      { title: "Estratégia antes da estética", text: "O visual nasce do posicionamento, não o contrário." },
      { title: "Aplicável no dia a dia", text: "Um material prático para orientar equipe, fornecedores e conteúdo." },
      { title: "Conectado ao Método ACELERA", text: "A base do pilar Presença Digital Estruturada." },
    ],
    steps: defaultSteps,
    faqs: [
      {
        q: "O que é o DNA da Marca?",
        a: "É o conjunto de definições estratégicas da sua empresa: propósito, personalidade, tom de voz e diferenciais. Ele orienta identidade visual, conteúdo, anúncios e atendimento para que tudo comunique a mesma proposta de valor.",
      },
      {
        q: "Preciso do DNA da Marca antes da identidade visual?",
        a: "É o caminho recomendado. Com o DNA definido, as escolhas de logotipo, cores e tipografia passam a ter critério, e a identidade visual expressa o que a marca realmente é.",
      },
    ],
    ctaTitle: "Quer uma marca que comunica com clareza?",
    seoTitle: "DNA da Marca e posicionamento | Ello Táticas Digitais",
    seoDescription:
      "Defina propósito, personalidade, tom de voz e diferenciais da sua empresa com a Ello, agência de crescimento digital em Louveira-SP.",
  },
  {
    slug: "identidade-visual-e-branding",
    name: "Identidade Visual & Branding",
    short: "Logotipo, paleta, tipografia e brandbook.",
    eyebrow: "Identidade Visual · Branding",
    title: "Identidade visual que transmite confiança à primeira vista.",
    subtitle:
      "Logotipo, paleta de cores, tipografia e brandbook pensados a partir do posicionamento da sua empresa, para uma presença profissional e consistente em todos os pontos de contato.",
    whatsappTopic: "branding",
    includes: [
      { title: "Logotipo", text: "Marca principal e versões para diferentes aplicações." },
      { title: "Paleta e tipografia", text: "Sistema de cores e fontes com regras de uso." },
      { title: "Elementos gráficos", text: "Padrões, ícones e recursos que tornam a marca reconhecível." },
      { title: "Brandbook", text: "Manual com as regras de aplicação da identidade." },
    ],
    problem: {
      title: "Uma marca amadora custa vendas que você nem vê",
      text: "O cliente decide em segundos se confia na sua empresa. Identidade inconsistente ou improvisada reduz a percepção de valor antes mesmo da primeira conversa.",
    },
    differentials: [
      { title: "Nasce do DNA da Marca", text: "Cada escolha visual tem um porquê estratégico." },
      { title: "Pronta para o digital", text: "Pensada para redes sociais, site, anúncios e materiais." },
      { title: "Regras claras", text: "Brandbook para manter a consistência ao longo do tempo." },
    ],
    steps: defaultSteps,
    faqs: [
      {
        q: "O que está incluso em um projeto de identidade visual?",
        a: "Logotipo e suas variações, paleta de cores, tipografia, elementos gráficos de apoio e um brandbook com as regras de aplicação. O escopo final é definido no diagnóstico, de acordo com a necessidade da sua empresa.",
      },
      {
        q: "A Ello faz rebranding de marcas existentes?",
        a: "Sim. Avaliamos o que já funciona na marca atual, o que precisa evoluir e conduzimos a transição para a nova identidade com critério.",
      },
    ],
    ctaTitle: "Pronto para uma identidade à altura do seu negócio?",
    seoTitle: "Identidade visual e branding | Ello Táticas Digitais",
    seoDescription:
      "Criação de logotipo, paleta, tipografia e brandbook com estratégia. Agência de branding em Louveira-SP que atende todo o Brasil.",
  },
  {
    slug: "sites-e-landing-pages",
    name: "Sites e Landing Pages",
    short: "Sites institucionais modernos e LPs de alta conversão.",
    eyebrow: "Sites · Landing Pages",
    title: "Sites e landing pages feitos para transformar visita em contato.",
    subtitle:
      "Desenvolvemos sites institucionais e landing pages com foco em clareza, velocidade e conversão, preparados para SEO, anúncios e integração com seu CRM.",
    whatsappTopic: "sites",
    includes: [
      { title: "Arquitetura e copy", text: "Estrutura de páginas e textos pensados para a decisão do cliente." },
      { title: "Design responsivo", text: "Experiência consistente no celular, tablet e desktop." },
      { title: "SEO técnico", text: "Base preparada para busca orgânica e local." },
      { title: "Rastreamento e integrações", text: "Formulários, WhatsApp, GA4 e CRM conectados." },
    ],
    problem: {
      title: "Site bonito que não gera contato é custo, não ativo",
      text: "Sem estrutura de conversão, rastreamento e velocidade, o site vira vitrine parada, e a verba de anúncios escorre por uma página que não convence.",
    },
    differentials: [
      { title: "Conversão como objetivo", text: "Cada seção tem uma função clara na jornada." },
      { title: "Integrado ao seu funil", text: "Leads organizados no CRM desde o primeiro formulário." },
      { title: "Pronto para mídia paga", text: "Landing pages pensadas para campanhas específicas." },
    ],
    steps: defaultSteps,
    faqs: [
      {
        q: "Qual a diferença entre site institucional e landing page?",
        a: "O site institucional apresenta a empresa como um todo, com várias páginas e caminhos. A landing page tem um único objetivo (como solicitar orçamento) e elimina distrações para aumentar a conversão de campanhas específicas.",
      },
      {
        q: "O site já sai preparado para aparecer no Google?",
        a: "Sim. Entregamos a base técnica de SEO: estrutura semântica, metadados, velocidade e marcações adequadas. O posicionamento orgânico depende também de conteúdo e tempo, por isso não prometemos posições.",
      },
    ],
    ctaTitle: "Quer um site que trabalha a favor das suas vendas?",
    seoTitle: "Criação de sites e landing pages | Ello Táticas Digitais",
    seoDescription:
      "Sites institucionais e landing pages de alta conversão, com SEO técnico e integração com CRM. Agência em Louveira-SP.",
  },
  {
    slug: "gestao-de-redes-sociais",
    name: "Gestão de Redes Sociais",
    short: "Instagram, Facebook, LinkedIn, TikTok e Google Meu Negócio.",
    eyebrow: "Redes Sociais · Conteúdo",
    title: "Redes sociais com estratégia, não só posts bonitos.",
    subtitle:
      "Planejamento, criação e gestão de conteúdo para Instagram, Facebook, LinkedIn, TikTok e Google Meu Negócio, cada publicação com uma função na jornada do seu cliente.",
    whatsappTopic: "geral",
    includes: [
      { title: "Planejamento editorial", text: "Calendário com temas e objetivos por etapa do funil." },
      { title: "Criação de conteúdo", text: "Artes, carrosséis, roteiros e legendas alinhados à marca." },
      { title: "Gestão de perfis", text: "Instagram, Facebook, LinkedIn, TikTok e Google Meu Negócio." },
      { title: "Análise de desempenho", text: "Leitura dos números com foco em negócio." },
    ],
    problem: {
      title: "Postar todo dia não é estratégia",
      text: "Conteúdo sem objetivo consome tempo e verba sem levar ninguém para mais perto da compra. O que importa é a função de cada peça na jornada.",
    },
    differentials: [
      { title: "Conteúdo com função", text: "Topo, meio e fundo de funil planejados." },
      { title: "Integrado ao tráfego", text: "Conteúdo e mídia paga trabalhando juntos." },
      { title: "Leitura de negócio", text: "Relatórios que explicam o porquê dos números." },
    ],
    steps: defaultSteps,
    faqs: [
      {
        q: "Quais redes sociais a Ello gerencia?",
        a: "Instagram, Facebook, LinkedIn, TikTok e Google Meu Negócio. A escolha dos canais é feita no diagnóstico, de acordo com onde o seu cliente está e com o objetivo do negócio.",
      },
      {
        q: "A gestão inclui captação de vídeo?",
        a: "A captação e edição de vídeo é um serviço próprio da Ello e pode ser combinada com a gestão de redes. No plano Ello Expansão, a captação mensal já faz parte da composição.",
      },
    ],
    ctaTitle: "Quer redes sociais que geram oportunidades?",
    seoTitle: "Gestão de redes sociais | Ello Táticas Digitais",
    seoDescription:
      "Gestão estratégica de Instagram, Facebook, LinkedIn, TikTok e Google Meu Negócio. Agência de marketing digital em Louveira-SP.",
  },
  {
    slug: "captacao-e-edicao-de-video",
    name: "Captação e Edição de Vídeo",
    short: "Produção profissional para reels e redes sociais.",
    eyebrow: "Vídeo · Reels",
    title: "Vídeos que mostram as pessoas por trás da sua marca.",
    subtitle:
      "Captação e edição profissional para reels, redes sociais e anúncios: conteúdo humanizado que aproxima, gera confiança e prende a atenção nos primeiros segundos.",
    whatsappTopic: "geral",
    includes: [
      { title: "Roteiro", text: "Ideias e roteiros alinhados ao objetivo de cada vídeo." },
      { title: "Captação", text: "Gravação com equipamento e direção profissionais." },
      { title: "Edição", text: "Cortes, legendas e ritmo pensados para cada plataforma." },
      { title: "Formatos para anúncio", text: "Versões adaptadas para campanhas de mídia paga." },
    ],
    problem: {
      title: "Sem rosto, sua marca disputa só no preço",
      text: "Pessoas compram de pessoas. Vídeos reais da sua equipe e da sua operação criam uma conexão que imagem de banco nenhuma consegue substituir.",
    },
    differentials: [
      { title: "Humanizado de verdade", text: "Pessoas e bastidores reais, nunca banco de imagens." },
      { title: "Pensado para a plataforma", text: "Formato, duração e gancho adequados a cada canal." },
      { title: "Integrado à estratégia", text: "Cada vídeo com função no funil e nos anúncios." },
    ],
    steps: defaultSteps,
    faqs: [
      {
        q: "A Ello grava vídeos fora de Louveira?",
        a: "As captações presenciais são realizadas em Louveira e região. Para outras localidades, avaliamos a viabilidade no diagnóstico.",
      },
      {
        q: "Os vídeos podem ser usados em anúncios?",
        a: "Sim. Editamos versões adaptadas para mídia paga, respeitando os formatos e as boas práticas de cada plataforma.",
      },
    ],
    ctaTitle: "Vamos colocar sua marca em movimento?",
    seoTitle: "Captação e edição de vídeo para redes sociais | Ello",
    seoDescription:
      "Produção profissional de reels e vídeos para redes sociais e anúncios em Louveira e região. Conheça a Ello Táticas Digitais.",
  },
  {
    slug: "trafego-pago",
    name: "Tráfego Pago",
    short: "Google Ads, Meta Ads, LinkedIn Ads e TikTok Ads.",
    eyebrow: "Tráfego pago · Google Ads e Meta Ads",
    title: "Leads qualificados todos os dias, sem depender de sorte.",
    subtitle:
      "Campanhas geridas por quem já administrou mais de R$500 mil em mídia, com dashboard em tempo real e CRM integrado desde o primeiro clique.",
    whatsappTopic: "trafego",
    highlights: [
      { value: "4 anos", label: "de Ello" },
      { value: "+R$500 mil", label: "geridos em anúncios" },
      { value: "24 a 48h", label: "para 1ª campanha no ar" },
    ],
    includes: [
      { title: "Estratégia de campanha", text: "Público, verba e canal definidos por objetivo de negócio." },
      { title: "Criativos para anúncio", text: "Artes estáticas e carrosséis prontos para rodar." },
      { title: "Rastreamento e conversão", text: "Pixel, GTM e GA4 configurados e validados." },
      { title: "Dashboard em tempo real", text: "Números sempre à vista, sem esperar relatório." },
    ],
    problem: {
      title: "Campanha sem estratégia custa mais do que parece",
      text: "Verba disputando entre vários objetivos ao mesmo tempo é o erro mais caro (e o mais comum) em gestão de tráfego sem uma estratégia por trás.",
    },
    differentials: [
      { title: "+R$500 mil geridos", text: "Experiência prática em escalar campanhas com foco em resultado." },
      { title: "CRM integrado desde o dia 1", text: "Lead organizado, nunca perdido numa planilha." },
      { title: "Relatório com leitura estratégica", text: "Você entende o porquê do número, não só o número." },
    ],
    steps: [
      { title: "1. Diagnóstico", text: "Conversa de 20 min sobre seu objetivo e verba disponível." },
      { title: "2. Setup", text: "Campanha, pixel e CRM no ar em até 48h." },
      { title: "3. Acompanhamento", text: "Relatório semanal + reunião estratégica mensal." },
    ],
    faqs: [
      {
        q: "Qual o investimento mínimo em mídia?",
        a: "O investimento em mídia é definido no diagnóstico, a partir do seu objetivo, da sua região de atuação e da concorrência do segmento. Assim a verba é dimensionada para gerar aprendizado e oportunidades reais, em vez de seguir um valor genérico.",
      },
      {
        q: "Em quanto tempo aparece resultado?",
        a: "A primeira campanha pode entrar no ar entre 24 e 48 horas após o setup. Os primeiros dados aparecem logo nos primeiros dias; a otimização consistente acontece ao longo das semanas seguintes, conforme as campanhas aprendem com os resultados.",
      },
    ],
    ctaTitle: "Quer parar de depender de sorte no tráfego pago?",
    seoTitle: "Gestão de tráfego pago | Google Ads e Meta Ads | Ello",
    seoDescription:
      "Gestão de tráfego pago com Google Ads, Meta Ads, LinkedIn e TikTok, dashboard em tempo real e CRM integrado. Agência em Louveira-SP.",
  },
  {
    slug: "inbound-marketing",
    name: "Inbound Marketing",
    short: "SEO, blog, automações, e-mail marketing e WhatsApp.",
    eyebrow: "Inbound · SEO e automação",
    title: "Clientes que chegam até você, e uma jornada que conduz até a venda.",
    subtitle:
      "SEO, blog, automações, e-mail marketing e WhatsApp integrados para atrair, nutrir e converter oportunidades com consistência, sem depender só de anúncios.",
    whatsappTopic: "geral",
    includes: [
      { title: "SEO e blog", text: "Conteúdo pensado para busca orgânica e para respostas de IA." },
      { title: "Automações", text: "Fluxos de nutrição que acompanham o lead no tempo certo." },
      { title: "E-mail marketing", text: "Comunicação segmentada para cada etapa da jornada." },
      { title: "WhatsApp", text: "Atendimento e réguas de relacionamento no canal preferido do cliente." },
    ],
    problem: {
      title: "Lead que não é nutrido esfria e vai para o concorrente",
      text: "Nem todo contato está pronto para comprar hoje. Sem uma jornada de relacionamento, oportunidades valiosas se perdem entre o primeiro clique e a decisão.",
    },
    differentials: [
      { title: "Jornada ponta a ponta", text: "Do primeiro conteúdo até a conversa comercial." },
      { title: "Tecnologia integrada", text: "Automação conectada ao CRM e à Ello IA." },
      { title: "Pensado para GEO", text: "Conteúdo claro e estruturado para buscadores e IAs." },
    ],
    steps: defaultSteps,
    faqs: [
      {
        q: "O que é inbound marketing?",
        a: "É a estratégia de atrair clientes com conteúdo relevante e conduzi-los por uma jornada de relacionamento (com SEO, blog, automações, e-mail e WhatsApp) até que estejam prontos para comprar.",
      },
      {
        q: "Inbound substitui o tráfego pago?",
        a: "Não, eles se complementam. O tráfego pago acelera o alcance, enquanto o inbound constrói uma base de atração e relacionamento que reduz a dependência de anúncios ao longo do tempo.",
      },
    ],
    ctaTitle: "Quer uma jornada que transforma contato em cliente?",
    seoTitle: "Inbound marketing, SEO e automação | Ello Táticas Digitais",
    seoDescription:
      "SEO, blog, automações, e-mail marketing e WhatsApp integrados. Inbound marketing com a Ello, agência em Louveira-SP.",
  },
  {
    slug: "consultoria-estrategica",
    name: "Consultoria Estratégica",
    short: "Direcionamento de marketing e vendas, com clareza e foco.",
    eyebrow: "Consultoria · Marketing e vendas",
    title: "Clareza para decidir onde investir e onde parar de gastar.",
    subtitle:
      "Direcionamento estratégico de marketing e vendas para empresas que querem organizar prioridades, estruturar processos e crescer com foco.",
    whatsappTopic: "diagnostico",
    includes: [
      { title: "Diagnóstico do negócio", text: "Leitura do cenário atual de marketing e vendas." },
      { title: "Plano de prioridades", text: "O que fazer primeiro, com critério e foco." },
      { title: "Processo comercial", text: "Organização da jornada do lead até a venda." },
      { title: "Acompanhamento", text: "Encontros para ajustar a rota com base nos dados." },
    ],
    problem: {
      title: "Fazer de tudo um pouco é o caminho mais caro",
      text: "Sem direção, a empresa testa canais aleatórios, contrata fornecedores desconectados e não sabe o que realmente gera resultado.",
    },
    differentials: [
      { title: "Visão 360°", text: "Branding, conteúdo, performance e automação no mesmo olhar." },
      { title: "Lado a lado", text: "A Ello senta junto, não fala só por e-mail." },
      { title: "Baseada no Método ACELERA", text: "Um caminho estratégico claro para organizar o crescimento." },
    ],
    steps: defaultSteps,
    faqs: [
      {
        q: "Para quem é a consultoria estratégica?",
        a: "Para empresas que já investem ou querem investir em marketing digital e precisam de direção: definir prioridades, organizar o processo comercial e entender quais ações realmente contribuem para as vendas.",
      },
      {
        q: "A consultoria pode ser feita a distância?",
        a: "Sim. A Ello atende de forma 100% digital em todo o Brasil, com reuniões presenciais disponíveis em Louveira e região.",
      },
    ],
    ctaTitle: "Quer clareza sobre o próximo passo do seu crescimento?",
    seoTitle: "Consultoria estratégica de marketing e vendas | Ello",
    seoDescription:
      "Consultoria de marketing e vendas para organizar prioridades e crescer com foco. Ello Táticas Digitais, Louveira-SP.",
  },
  {
    slug: "ello-ia",
    name: "Ello IA",
    short: "CRM com atendimento por IA 24/7 no WhatsApp.",
    eyebrow: "Tecnologia própria · Ello IA",
    title: "Atendimento que não dorme: a Ello IA qualifica, conduz e vende 24/7.",
    subtitle:
      "CRM com atendimento por inteligência artificial no WhatsApp. A Ello IA qualifica, conduz e vende, e um humano da sua equipe assume quando precisar.",
    whatsappTopic: "ia",
    isTech: true,
    includes: [
      { title: "Atendimento 24/7", text: "Respostas no WhatsApp a qualquer hora do dia." },
      { title: "Qualificação", text: "A IA entende o interesse e organiza o lead." },
      { title: "Condução da venda", text: "Conversa conduzida até o próximo passo comercial." },
      { title: "Transição para humano", text: "Sua equipe assume a conversa quando necessário." },
    ],
    problem: {
      title: "Lead que espera, esfria",
      text: "Boa parte das oportunidades chega fora do horário comercial ou quando a equipe está ocupada. Sem resposta rápida, o investimento em marketing se perde no WhatsApp.",
    },
    differentials: [
      { title: "Tecnologia própria", text: "Desenvolvida pela Ello, conectada ao Método ACELERA." },
      { title: "Humano no controle", text: "A IA conduz, sua equipe assume quando precisa." },
      { title: "Camada adicional a qualquer plano", text: "Disponível junto com Performance, Expansão ou Conexão." },
    ],
    steps: defaultSteps,
    faqs: [
      {
        q: "O que é a Ello IA e como ela funciona no WhatsApp?",
        a: "A Ello IA é a tecnologia própria da Ello: um CRM com atendimento por inteligência artificial no WhatsApp, disponível 24 horas por dia. Ela qualifica o contato, conduz a conversa e pode vender, e um humano da sua equipe assume quando necessário.",
      },
      {
        q: "Posso contratar a Ello IA junto com um plano?",
        a: "Sim. A Ello IA está disponível como camada adicional a qualquer plano: Ello Performance, Ello Expansão ou Ello Conexão.",
      },
    ],
    ctaTitle: "Quer atender seus leads a qualquer hora?",
    seoTitle: "Ello IA | atendimento com IA no WhatsApp 24/7",
    seoDescription:
      "Ello IA: CRM com atendimento por inteligência artificial no WhatsApp que qualifica, conduz e vende 24/7, com humano assumindo quando precisa.",
  },
];

export const coreServices = services.filter((s) => !s.isTech);

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
