import './Footer.css';

export default function Footer() {
  return (
    <footer id="fale-comigo">
      <div className="footer-content">
        <div className="footer-social">
          <a href="https://wa.me/5579991071656?text=Ol%C3%A1,%20dei%20uma%20olhada%20em%20seu%20portfolio%20e%20entrei%20em%20contato." target="_blank" rel="noopener noreferrer"><img src="/src/assets/whatsapp_3536479.png" alt="WhatsApp" className="footer-icon" /></a>
          <a href="https://www.linkedin.com/in/marcos-santos-martirio-08075a123/" target="_blank" rel="noopener noreferrer"><img src="/src/assets/linkedin_3536569.png" alt="LinkedIn" className="footer-icon" /></a>
          <a href="https://github.com/mmartirio" target="_blank" rel="noopener noreferrer"><img src="/src/assets/github_3291695.png" alt="GitHub" className="footer-icon" /></a>
        </div>
        <p className="footer-copy">© 2025 Marcos Martirio. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
