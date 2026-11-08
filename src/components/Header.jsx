import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import './Header.css';
import MobileMenu from './MobileMenu';

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'sobre', label: 'Sobre' },
  { id: 'projetos', label: 'Projetos' },
  { id: 'fale-comigo', label: 'Contato' },
];

// Marca a seção visível no momento (scroll spy).
function useActiveSection() {
  const [active, setActive] = useState('home');

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return active;
}

export default function Header() {
  const active = useActiveSection();
  const [hovered, setHovered] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const listRef = useRef(null);
  const linkRefs = useRef({});

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Move a "pílula" para o link sob o mouse ou para a seção ativa.
  useLayoutEffect(() => {
    const list = listRef.current;
    const target = linkRefs.current[hovered ?? active];
    if (!list || !target) return;
    list.style.setProperty('--ind-x', `${target.offsetLeft}px`);
    list.style.setProperty('--ind-w', `${target.offsetWidth}px`);
  }, [hovered, active, scrolled]);

  return (
    <header className={`head${scrolled ? ' is-scrolled' : ''}`}>
      <nav className="nav-bar" aria-label="Navegação principal">
        <a className="brand" href="#home">
          <span className="brand-mark" aria-hidden="true">
            MM
          </span>
          <h1 className="portfolio">Portfólio</h1>
        </a>

        <ul className="menu-desktop" ref={listRef} onPointerLeave={() => setHovered(null)}>
          <li className="menu-indicator" role="presentation" aria-hidden="true" />
          {sections.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                ref={(el) => {
                  linkRefs.current[id] = el;
                }}
                className={active === id ? 'is-active' : ''}
                aria-current={active === id ? 'location' : undefined}
                onPointerEnter={() => setHovered(id)}
                onFocus={() => setHovered(id)}
                onBlur={() => setHovered(null)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <MobileMenu />
      </nav>
    </header>
  );
}
