// Lista curada de projetos exibidos no portfólio.
//
// Nome, descrição, imagem e cor de cada projeto são lidos AO VIVO do próprio
// site publicado (tags <title>, description, og:*, theme-color) pela função
// /api/projects. Assim, quando um projeto muda, o portfólio muda junto.
//
// - `fallback`: usado apenas se o site estiver fora do ar ou com metadados
//   genéricos (ex.: "Document", "React App").
// - `override`: sempre vence o dado ao vivo. Use só quando o site não tiver
//   metadados bons e você não puder corrigi-los na origem.
// - `vercelProject`: nome do projeto no Vercel. Liga o item à descoberta
//   automática, evitando duplicatas.

export const projects = [
  {
    id: 'fotografia-digital',
    vercelProject: 'fotografia-digital',
    url: 'https://www.davifotovideo.com.br',
    category: 'Site institucional',
    technologies: 'Next.js · React',
    fallback: {
      name: 'Davi Foto Vídeo',
      description: 'Site de fotografia e vídeo para casamentos, ensaios e eventos em Sergipe.',
    },
  },
  {
    id: 'site-coach',
    vercelProject: 'site-coach',
    url: 'https://site-coach-tree.vercel.app',
    category: 'Landing page',
    technologies: 'Next.js · React',
    fallback: {
      name: 'Site Coach',
      description: 'Coaching pessoal e profissional, treinamentos e palestras.',
    },
  },
  {
    id: 'aliunde',
    vercelProject: 'barbeiroon-frontend',
    url: 'https://aliunde.com.br',
    category: 'Produto digital',
    technologies: 'React · Vite',
    fallback: {
      name: 'Aliunde',
      description: 'Plataforma de gestão para pequenos negócios, com recursos para organizar atendimentos e agendamentos.',
    },
  },
  {
    id: 'oia-a-conta',
    vercelProject: 'oia-a-conta-frontend',
    url: 'https://oiaaconta.com.br',
    category: 'Produto digital',
    technologies: 'React · Vite',
    fallback: {
      name: 'Oia a Conta',
      description: 'Plataforma de gestão para restaurantes, com atendimento presencial e delivery em um só lugar.',
    },
  },
];

// Projetos do Vercel que nunca devem aparecer via descoberta automática.
export const excludedVercelProjects = [
  'portfolio',
  // Estudos: aparecem só como tecnologias/skills em src/data/studies.js.
  'gerenciador-de-custos-de-projetos',
  'calculadora-combustivel-web',
  'to-do-lst',
];
