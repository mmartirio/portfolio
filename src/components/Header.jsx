import './Header.css';
import MobileMenu from './MobileMenu';

export default function Header() {
  return (
    <header className="head" id="home">
      <nav className="desktop-nav">
        <h1 className="portfolio">Port<span>fólio</span></h1>
        <ul className="menu-desktop">
          <li><a href="#home">Home</a></li>
          <li><a href="#sobre">Sobre</a></li>
          <li><a href="#projetos">Projetos</a></li>
          <li><a href="#fale-comigo">Contato</a></li>
        </ul>
            <MobileMenu />
      </nav>

      <div className="line"></div>
    </header>
  );
}
