import { useEffect, useRef, useState } from 'react';
import './Projects.css';
import { useProjects } from '../hooks/useProjects';
import { prefersReducedMotion } from '../hooks/useScrollReveal';

import { techGroups, skills } from '../data/studies';
// Capturas reais da primeira dobra de cada site (gerado por `npm run screenshots`).
import screenshots from '../data/screenshots.json';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+<>/';

// Embaralha o texto e o "decodifica" letra por letra.
function useScramble(text) {
  const [scrambled, setDisplay] = useState(null);
  const timer = useRef(0);
  const display = scrambled ?? text;

  useEffect(() => () => clearInterval(timer.current), []);

  const play = () => {
    if (prefersReducedMotion()) return;
    clearInterval(timer.current);
    let frame = 0;
    const total = Math.min(28, text.length * 1.4 + 8);
    timer.current = setInterval(() => {
      frame += 1;
      const progress = frame / total;
      setDisplay(
        text
          .split('')
          .map((char, i) => {
            if (char === ' ' || i / text.length < progress) return char;
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join(''),
      );
      if (frame >= total) {
        clearInterval(timer.current);
        setDisplay(null);
      }
    }, 28);
  };

  return [display, play];
}

// Usa a theme-color do site, exceto tons quase pretos/brancos que sumiriam
// no fundo escuro do card.
function accentColor(hex) {
  const match = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(hex ?? '');
  if (!match) return '#2354f7';
  const full = match[1].length === 3 ? match[1].replace(/./g, '$&$&') : match[1];
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16) / 255);
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance < 0.12 || luminance > 0.85 ? '#2354f7' : `#${full}`;
}

function initials(name = '') {
  return name
    .split(/\s+/)
    .filter((w) => w.length > 2 || /^[A-Z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
}

// Ordem: captura real do site > og:image do site > capa gerada.
function ProjectMedia({ project }) {
  const sources = [screenshots[project.id], project.image].filter(Boolean);
  const [failed, setFailed] = useState(0);
  const [iconFailed, setIconFailed] = useState(false);
  const src = sources[failed];

  if (src) {
    return (
      <img
        src={src}
        alt={`Tela do projeto ${project.name}`}
        className="card-img"
        width="1440"
        height="900"
        loading="lazy"
        decoding="async"
        onError={() => setFailed((n) => n + 1)}
      />
    );
  }

  return (
    <div className="card-cover" role="img" aria-label={`Identidade visual do projeto ${project.name}`}>
      <span className="cover-blob cover-blob-a" />
      <span className="cover-blob cover-blob-b" />
      <span className="cover-grid" />
      {project.icon && !iconFailed ? (
        <img className="cover-icon" src={project.icon} alt="" onError={() => setIconFailed(true)} />
      ) : (
        <span className="cover-initials">{initials(project.name)}</span>
      )}
    </div>
  );
}

function domainOf(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

// Painel de estudo de caso: gruda no topo e o próximo empilha por cima.
// A janela de navegador inclina em 3D acompanhando o mouse.
function ProjectPanel({ project, index, total }) {
  const visualRef = useRef(null);
  const [title, scramble] = useScramble(project.name);

  const handleMove = (event) => {
    const el = visualRef.current;
    if (!el || event.pointerType === 'touch') return;
    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    el.style.setProperty('--mx', `${(x * 100).toFixed(1)}%`);
    el.style.setProperty('--my', `${(y * 100).toFixed(1)}%`);
    el.style.setProperty('--px', (x - 0.5).toFixed(3));
    el.style.setProperty('--py', (y - 0.5).toFixed(3));
  };

  const handleLeave = () => {
    visualRef.current?.style.setProperty('--px', '0');
    visualRef.current?.style.setProperty('--py', '0');
  };

  const accent = accentColor(project.themeColor);
  const techs = (project.technologies || '').split(/\s*[·,]\s*/).filter(Boolean);

  return (
    <div className="stack-item" data-stack style={{ '--n': index }}>
      <article className="showcase" style={{ '--accent': accent }} onPointerEnter={scramble} onFocus={scramble}>
        <div className="showcase-info" data-reveal="up">
          <p className="showcase-count" aria-hidden="true">
            <span>{String(index + 1).padStart(2, '0')}</span> / {String(total).padStart(2, '0')}
          </p>
          <p className="showcase-cat">{project.category}</p>
          <h3>
            <span aria-hidden="true">{title}</span>
            <span className="sr-only">{project.name}</span>
          </h3>
          <p className="showcase-desc">{project.description}</p>
          {techs.length > 0 && (
            <ul className="showcase-tags" aria-label={`Tecnologias de ${project.name}`}>
              {techs.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          )}
          <a
            className="showcase-cta"
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Ver projeto ${project.name} (abre em nova aba)`}
          >
            <span>Visitar site</span>
            <span className="cta-arrow" aria-hidden="true">↗</span>
          </a>
        </div>

        <div className="showcase-visual" data-reveal="up" style={{ '--i': 1 }} ref={visualRef} onPointerMove={handleMove} onPointerLeave={handleLeave}>
          <div className="browser">
            <div className="browser-bar" aria-hidden="true">
              <span className="browser-dots">
                <i />
                <i />
                <i />
              </span>
              <span className="browser-url">{domainOf(project.url)}</span>
            </div>
            <div className="browser-view card-media">
              <ProjectMedia key={`${project.image}|${project.icon}`} project={project} />
              <span className="browser-glare" aria-hidden="true" />
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

// Estudos e práticas: tecnologias por área e skills aplicadas (sem projetos).
function Studies() {
  return (
    <div className="practice">
      <div className="practice-block">
        <p className="practice-label" data-reveal="up">
          Tecnologias estudadas
        </p>
        <div className="tech-groups">
          {techGroups.map((group, i) => (
            <section className="tech-group" key={group.title} data-reveal="up" style={{ '--i': i }}>
              <h4>{group.title}</h4>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>

      <div className="practice-block">
        <p className="practice-label" data-reveal="up">
          Skills aplicadas
        </p>
        <ul className="skill-grid">
          {skills.map((skill, i) => (
            <li className="skill" key={skill.title} data-reveal="up" style={{ '--i': i % 3 }}>
              <span className="skill-check" aria-hidden="true" />
              <div>
                <h4>{skill.title}</h4>
                <p>{skill.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Projects() {
  const { projects, live } = useProjects();

  return (
    <section className="project-container" id="projetos">
      <div className="projects-heading">
        <p className="section-kicker" data-reveal="up">
          O que eu construo
          {live && (
            <span className="live-badge" title="Nomes e descrições lidos dos sites publicados">
              ao vivo
            </span>
          )}
        </p>
        <h2 data-reveal="mask">Projetos em destaque</h2>
        <p className="section-intro" data-reveal="up" style={{ '--i': 1 }}>
          Produtos e sites publicados para clientes, e as tecnologias e skills que venho praticando nos estudos.
        </p>
      </div>

      <div className="project-group">
        <div className="group-heading" data-reveal="up">
          <h3>Produtos e clientes</h3>
          <span>{String(projects.length).padStart(2, '0')}</span>
        </div>
        <div className="project stack-list">
          {projects.map((proj, i) => (
            <ProjectPanel key={proj.id} project={proj} index={i} total={projects.length} />
          ))}
        </div>
      </div>

      <div className="project-group">
        <div className="group-heading" data-reveal="up">
          <h3>Estudos e práticas</h3>
          <span>{String(skills.length).padStart(2, '0')}</span>
        </div>
        <Studies />
      </div>
    </section>
  );
}
