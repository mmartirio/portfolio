import { useEffect, useRef, useState } from 'react';
import './About.css';
import { prefersReducedMotion } from '../hooks/useScrollReveal';

const stats = [
  { value: 15, suffix: '+', label: 'anos em tecnologia' },
  { value: 2022, from: 2000, label: 'início no desenvolvimento' },
  { text: 'Full Stack', label: 'front-end, back-end e IA' },
];

const services = [
  {
    title: 'Front-end',
    summary: 'Interfaces funcionais e responsivas, com cuidado visual.',
    tags: ['React.js', 'JavaScript', 'HTML5', 'CSS3'],
  },
  {
    title: 'Back-end & APIs',
    summary: 'APIs e aplicações full stack, do banco à tela.',
    tags: ['Python', 'Java', 'Integração de APIs'],
  },
  {
    title: 'Inteligência artificial',
    summary: 'Projetos que integram modelos de IA ao produto.',
    tags: ['Ollama', 'ChatGPT'],
  },
];

function CountUp({ value, from = 0, suffix = '' }) {
  const ref = useRef(null);
  const [current, setCurrent] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !('IntersectionObserver' in window)) return undefined;
    let frame = 0;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const step = (now) => {
        const t = Math.min(1, (now - start) / 1400);
        const eased = 1 - Math.pow(1 - t, 4);
        setCurrent(Math.round(from + (value - from) * eased));
        if (t < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, from]);

  return (
    <span ref={ref} aria-label={`${value}${suffix}`}>
      <span aria-hidden="true">
        {current}
        {suffix}
      </span>
    </span>
  );
}

export default function About() {
  return (
    <section className="about" id="sobre">
      <div className="about-intro">
        <p className="section-kicker" data-reveal="up">Sobre mim</p>
        <h2 data-reveal="mask">Do suporte de TI ao código.</h2>
        <p className="about-lead" data-reveal="up" style={{ '--i': 1 }}>
          Mais de 15 anos em tecnologia. Em 2022 migrei para o desenvolvimento e hoje crio produtos web completos, do
          front-end às integrações com IA.
        </p>

        <dl className="about-stats">
          {stats.map((stat, i) => (
            <div className="about-stat" key={stat.label} data-reveal="up" style={{ '--i': i + 2 }}>
              <dt>{stat.label}</dt>
              <dd>{stat.text ?? <CountUp value={stat.value} from={stat.from} suffix={stat.suffix} />}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="about-services">
        <p className="services-title" data-reveal="up">O que eu faço</p>
        <ol>
          {services.map((service, i) => (
            <li className="service" key={service.title} data-reveal="up" style={{ '--i': i + 1 }}>
              <span className="service-index" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="service-body">
                <h3>{service.title}</h3>
                <p>{service.summary}</p>
                <ul className="service-tags" aria-label={`Tecnologias de ${service.title}`}>
                  {service.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
        <a className="about-github" href="https://github.com/mmartirio" target="_blank" rel="noopener noreferrer" data-reveal="up">
          Mais projetos no GitHub <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
