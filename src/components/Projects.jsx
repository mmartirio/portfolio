import './Projects.css';

// Importação direta das imagens
import gerenciadorProjetosImg from '../assets/gerenciador de projetos.png';
import telaLoginImg from '../assets/Tela de login.png';
import calculadoraCombustivelImg from '../assets/calculador de combustivel.png';
import todoListImg from '../assets/to-do-list.png';

const projects = [
  {
    name: 'Gerenciador de custos de projetos',
    description: 'Este é um gerenciador de custos. Este projeto foi criado em um treinamento via YouTube criado pelo canal hora de codar.',
    image: gerenciadorProjetosImg,
    url: 'https://gerenciador-de-custos-de-projetos.vercel.app/',
    category: 'Aplicacao web',
    technologies: 'React · JavaScript'
  },
  {
    name: 'Tela de Login',
    description: 'Este é um projeto simples de criação de tela de login utilizando HTML, CSS e Javascript mostrando que habilidades básicas de desenvolvimento web.',
    image: telaLoginImg,
    url: 'https://mmartirio.github.io/TELA-INICIAL/',
    category: 'Interface',
    technologies: 'HTML · CSS · JavaScript'
  },
  {
    name: 'Calculadora de combustível web',
    description: 'Este é um projeto desenvolvimento na faculdade para exercitar o conhecimento de desenvolvimento utulizando React.js.',
    image: calculadoraCombustivelImg,
    url: 'https://calculadora-combustivel-web.vercel.app/',
    category: 'Ferramenta',
    technologies: 'React · CSS'
  },
  {
    name: 'TO-DO List',
    description: 'Este é um projeto desenvolvimento na faculdade para exercitar o conhecimento de desenvolvimento Rápido utulizando Python.',
    image: todoListImg,
    url: 'https://to-do-lst.vercel.app/',
    category: 'Produtividade',
    technologies: 'Python · Web'
  },
  {
    name: 'Aliunde',
    description: 'Plataforma de gestao para pequenos negocios, com recursos para organizar atendimentos e agendamentos.',
    url: 'https://aliunde.com.br',
    category: 'Produto digital',
    technologies: 'React · UI design',
    cover: 'AL'
  },
  {
    name: 'Oia a Conta',
    description: 'Plataforma de gestao para restaurantes, com atendimento presencial e delivery em um so lugar.',
    url: 'https://oiaaconta.com.br',
    category: 'Ferramenta',
    technologies: 'React · JavaScript',
    cover: 'OC'
  }
];

export default function Projects() {
  return (
    <section className="project-container" id="projetos">
      <div className="projects-heading">
        <p className="section-kicker">O que eu construo</p>
        <h2>Projetos em destaque</h2>
        <p className="section-intro">Uma selecao de interfaces, ferramentas e experiencias que mostram meu jeito de transformar ideias em produto.</p>
      </div>
      <div className="project">
        {projects.map((proj) => (
          <article className="project-card" key={proj.name}>
            <a href={proj.url} target="_blank" rel="noopener noreferrer">
              {proj.image ? (
                <img src={proj.image} alt={`Previa do projeto ${proj.name}`} className="card-img" />
              ) : (
                <div className={`card-cover cover-${proj.cover.toLowerCase()}`} aria-label={`Identidade visual do projeto ${proj.name}`}>
                  <span>{proj.cover}</span>
                </div>
              )}
            </a>
            <div className="card-meta">
              <span>{proj.category}</span>
              <span>{proj.technologies}</span>
            </div>
            <h3>{proj.name}</h3>
            <p>{proj.description}</p>
            <a className="link" href={proj.url} target="_blank" rel="noopener noreferrer">
              Ver projeto <span aria-hidden="true">↗</span>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}