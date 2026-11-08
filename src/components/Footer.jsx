import './Footer.css';

import whatsappIcon from '../assets/whatsapp_3536479.png';
import linkedinIcon from '../assets/linkedin_3536569.png';
import githubIcon from '../assets/github_3291695.png';
import profileImage from '../assets/Profile_sem_fundo.png';

const WHATSAPP_URL =
  'https://wa.me/5579991071656?text=Ol%C3%A1,%20dei%20uma%20olhada%20em%20seu%20portfolio%20e%20entrei%20em%20contato.';

// O símbolo dos ícones é vazado: a cor de fundo (--brand) aparece através dele.
const contacts = [
  {
    name: 'WhatsApp',
    handle: '(79) 99107-1656',
    hint: 'Resposta mais rápida',
    url: WHATSAPP_URL,
    icon: whatsappIcon,
    brand: '#25d366',
  },
  {
    name: 'LinkedIn',
    handle: 'Marcos Santos Martirio',
    hint: 'Experiência e carreira',
    url: 'https://www.linkedin.com/in/marcos-santos-martirio-08075a123/',
    icon: linkedinIcon,
    brand: '#0a66c2',
  },
  {
    name: 'E-mail',
    handle: 'marcos.martirio@gmail.com',
    hint: 'Propostas e orçamentos',
    url: 'mailto:marcos.martirio@gmail.com?subject=Contato%20pelo%20portf%C3%B3lio',
    brand: '#ea4335',
  },
  {
    name: 'GitHub',
    handle: '@mmartirio',
    hint: 'Código dos projetos',
    url: 'https://github.com/mmartirio',
    icon: githubIcon,
    brand: '#8e9bff',
  },
];

// Ícone de e-mail no mesmo estilo dos PNGs: quadrado escuro com o símbolo
// na cor de --brand ao passar o mouse.
function MailIcon() {
  return (
    <span className="contact-icon contact-icon-svg" aria-hidden="true">
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="5" width="18" height="14" rx="2.5" />
        <path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

// CTA de WhatsApp em forma de conversa: a foto "sai" da janela de chat e o
// campo de mensagem é o botão que abre o WhatsApp.
function WhatsAppChat() {
  return (
    <a
      className="wa-chat"
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar com Marcos no WhatsApp"
      data-reveal="up"
    >
      <span className="wa-photo" aria-hidden="true">
        <img src={profileImage} alt="" />
      </span>

      <span className="wa-window" aria-hidden="true">
        <span className="wa-header">
          <span className="wa-avatar">
            <img src={profileImage} alt="" />
          </span>
          <span className="wa-who">
            <strong>Marcos Martirio</strong>
            <small>via WhatsApp</small>
          </span>
        </span>

        <span className="wa-thread">
          <span className="wa-bubble">Oi! Eu sou o Marcos 👋</span>
          <span className="wa-bubble">Tem um projeto, uma ideia ou uma vaga em mente?</span>
          <span className="wa-bubble">Me manda uma mensagem por aqui.</span>
          <span className="wa-typing">
            <i />
            <i />
            <i />
          </span>
        </span>

        <span className="wa-compose">
          <span className="wa-input">Escreva sua mensagem…</span>
          <span className="wa-send">
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path d="M3.4 20.4 21 12 3.4 3.6 3.4 10l12.6 2-12.6 2z" fill="currentColor" />
            </svg>
          </span>
        </span>
      </span>
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="site-footer" id="fale-comigo">
      <div className="footer-inner">
        <div className="footer-cta">
          <div className="footer-cta-text">
            <p className="section-kicker" data-reveal="up">
              Contato
            </p>
            <h2 data-reveal="mask">
              Vamos tirar sua ideia <span>do papel?</span>
            </h2>
            <p className="footer-lead" data-reveal="up" style={{ '--i': 1 }}>
              Estou disponível para novos projetos, freelas e oportunidades. Me chame no WhatsApp ou em qualquer um dos
              canais abaixo.
            </p>
            <div className="footer-actions" data-reveal="up" style={{ '--i': 2 }}>
              <a className="footer-secondary" href="/Marcos_Martirio_CV_Desenvolvedor_Junior.pdf" download>
                Baixar CV
              </a>
            </div>
          </div>

          <WhatsAppChat />
        </div>

        <ul className="contact-cards">
          {contacts.map((contact, i) => (
            <li key={contact.name} data-reveal="up" style={{ '--i': i, '--brand': contact.brand }}>
              <a
                className="contact-card"
                href={contact.url}
                {...(contact.url.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                aria-label={`${contact.name}: ${contact.handle}`}
              >
                {contact.icon ? <img src={contact.icon} alt="" className="contact-icon" /> : <MailIcon />}
                <span className="contact-text">
                  <span className="contact-name">{contact.name}</span>
                  <span className="contact-handle">{contact.handle}</span>
                  <span className="contact-hint">{contact.hint}</span>
                </span>
                <span className="contact-arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="footer-bottom">
          <a className="footer-brand" href="#home">
            <span className="brand-mark" aria-hidden="true">
              MM
            </span>
            Marcos Martirio
          </a>

          <a className="back-to-top" href="#home">
            Voltar ao topo <span aria-hidden="true">↑</span>
          </a>
        </div>

        <p className="footer-copy">© {new Date().getFullYear()} Marcos Martirio. Todos os direitos reservados.</p>
      </div>

      <span className="footer-watermark" aria-hidden="true">
        MARTIRIO
      </span>
    </footer>
  );
}
