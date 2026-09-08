import { useState } from 'react';
import './MobileMenu.css';

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="mobile-nav">
      <input
        type="checkbox"
        className="menu-faketrigger"
        checked={open}
        onChange={() => setOpen(!open)}
        aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        aria-expanded={open}
        aria-controls="mobile-menu-list"
      />
      <div className="menu-mobile" aria-hidden="true" onClick={() => setOpen(!open)}>
        <span className={open ? 'open' : ''}></span>
        <span className={open ? 'open' : ''}></span>
        <span className={open ? 'open' : ''}></span>
      </div>
      <ul id="mobile-menu-list" className={open ? 'open' : ''}>
        <li><a href="#home" onClick={() => setOpen(false)}>Home</a></li>
        <li><a href="#sobre" onClick={() => setOpen(false)}>Sobre</a></li>
        <li><a href="#projetos" onClick={() => setOpen(false)}>Projetos</a></li>
        <li><a href="#fale-comigo" onClick={() => setOpen(false)}>Contato</a></li>
      </ul>
    </nav>
  );
}