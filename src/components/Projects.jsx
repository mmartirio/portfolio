import './Projects.css';

const projects = [
  {
    name: 'Gerenciador de custos de projetos',
    description: 'Este é um gerenciador de custos. Este projeto foi criado em um treinamento via YouTube criado pelo canal hora de codar.',
    image: '/src/assets/gerenciador de projetos.png',
    url: 'https://gerenciador-de-custos-de-projetos.vercel.app/'
  },
  {
    name: 'Tela de Login',
    description: 'Este é um projeto simples de criação de tela de login utilizando HTML, CSS e Javascript mostrando que habilidades básicas de desenvolvimento web.',
    image: '/src/assets/Tela de login.png',
    url: 'https://mmartirio.github.io/TELA-INICIAL/'
  },
  {
    name: 'Lista de compras web',
    description: 'Este é um projeto que ainda está em andamento. Utilizando a biblioteca React.js estou criando uma lista de compras web',
    image: '/src/assets/Lista de compras.png',
    url: 'https://minha-lista-de-compras.vercel.app/'
  },
  {
    name: 'Calculadora de combustível web',
    description: 'Este é um projeto desenvolvimento na faculdade para exercitar o conhecimento de desenvolvimento utulizando React.js.',
    image: '/src/assets/calculador de combustivel.png',
    url: 'https://calculadora-combustivel-web.vercel.app/'
  },
  {
    name: 'TO-DO List',
    description: 'Este é um projeto desenvolvimento na faculdade para exercitar o conhecimento de desenvolvimento Rápido utulizando Python.',
    image: '/src/assets/to-do-list.png',
    url: 'https://to-do-lst.vercel.app/'
  }
];

export default function Projects() {
  return (
    <section className="project-container" id="projetos">
      <h2>Projetos em Destaque</h2>
      <div className="project-line"></div>
      <div className="project">
        {projects.map((proj, idx) => (
          <div className="card" key={idx}>
            <a href={proj.url} target="_blank" rel="noopener noreferrer">
              <img src={proj.image} alt={proj.name} className="card-img" />
            </a>
            <h4>{proj.name}</h4>
            <p>{proj.description}</p>
            <a className="link" href={proj.url} target="_blank" rel="noopener noreferrer">Ver Projeto</a>
          </div>
        ))}
      </div>
    </section>
  );
}
