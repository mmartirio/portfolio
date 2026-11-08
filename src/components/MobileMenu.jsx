import { useEffect, useRef, useState } from 'react';
import './MobileMenu.css';

const links = [
  { href: '#home', label: 'Home' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#projetos', label: 'Projetos' },
  { href: '#fale-comigo', label: 'Contato' },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => event.key === 'Escape' && setOpen(false);
    const onClick = (event) => !rootRef.current?.contains(event.target) && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onClick);
    };
  }, [open]);

  return (
    <div className="mobile-nav" ref={rootRef}>
      <button
        type="button"
        className={`menu-toggle${open ? ' open' : ''}`}
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        aria-expanded={open}
        aria-controls="mobile-menu-list"
      >
        <span />
        <span />
        <span />
      </button>
      <ul id="mobile-menu-list" className={open ? 'open' : ''}>
        {links.map((link, i) => (
          <li key={link.href}>
            <a href={link.href} data-index={`0${i + 1}`} tabIndex={open ? undefined : -1} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
