import { useRef } from 'react';
import './HeroArt.css';
import profileImage from '../assets/Profile_sem_fundo.png';
import backgroundImage from '../assets/background-img.jpg';

const ORBIT_A = 'M196,100 a96,34 0 1,1 -192,0 a96,34 0 1,1 192,0';
const ORBIT_B = 'M8,100 a92,26 0 1,0 184,0 a92,26 0 1,0 -184,0';

// O mesmo anel é desenhado duas vezes: atrás do retrato (metade de cima) e na
// frente (metade de baixo), dando a sensação de órbita em volta da cabeça.
function Orbit({ front = false }) {
  return (
    <svg className={`art-orbit${front ? ' art-orbit-front' : ''}`} viewBox="0 0 200 200" aria-hidden="true">
      <g className="orbit-a">
        <path d={ORBIT_A} />
        <circle className="orbit-dot" r="3.2">
          <animateMotion dur="9s" repeatCount="indefinite" path={ORBIT_A} />
        </circle>
      </g>
      <g className="orbit-b">
        <path d={ORBIT_B} />
        <circle className="orbit-dot orbit-dot-b" r="2.4">
          <animateMotion dur="13s" repeatCount="indefinite" path={ORBIT_B} />
        </circle>
      </g>
    </svg>
  );
}

const BADGE_TEXT = 'DISPONÍVEL PARA NOVOS PROJETOS ✦ ';

// Retrato "saindo do portal": o fundo fica preso no círculo, mas a cabeça
// ultrapassa a borda. Cada camada se move numa profundidade diferente com o mouse.
export default function HeroArt() {
  const stageRef = useRef(null);

  const handleMove = (event) => {
    const stage = stageRef.current;
    if (!stage || event.pointerType === 'touch') return;
    const rect = stage.getBoundingClientRect();
    stage.style.setProperty('--vx', ((event.clientX - rect.left) / rect.width - 0.5).toFixed(3));
    stage.style.setProperty('--vy', ((event.clientY - rect.top) / rect.height - 0.5).toFixed(3));
  };

  const handleLeave = () => {
    stageRef.current?.style.setProperty('--vx', '0');
    stageRef.current?.style.setProperty('--vy', '0');
  };

  return (
    <div className="profile-visual" data-parallax="-0.12">
      <div className="art-stage" ref={stageRef} onPointerMove={handleMove} onPointerLeave={handleLeave}>
        <span className="art-grid" aria-hidden="true" />
        <span className="art-glow" aria-hidden="true" />

        <Orbit />

        <div className="art-portal" aria-hidden="true">
          <span className="portal-code" style={{ backgroundImage: `url(${backgroundImage})` }} />
          <span className="portal-tint" />
          <span className="portal-scan" />
        </div>
        <span className="art-ring" aria-hidden="true" />

        <div className="art-portrait">
          <img className="art-photo" src={profileImage} alt="Foto de Marcos Martirio" />
        </div>

        <Orbit front />

        <div className="art-badge" aria-hidden="true">
          <svg viewBox="0 0 120 120">
            <defs>
              <path id="badge-circle" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
            </defs>
            <text>
              <textPath href="#badge-circle" textLength="289" lengthAdjust="spacing">
                {BADGE_TEXT}
              </textPath>
            </text>
          </svg>
          <span className="badge-dot" />
        </div>
        <p className="sr-only">Disponível para novos projetos.</p>

        <span className="art-chip chip-code" aria-hidden="true">
          <span className="chip-bracket">&lt;</span>FullStack<span className="chip-bracket"> /&gt;</span>
        </span>
        <span className="art-chip chip-years">
          <strong>15+</strong> anos em TI
        </span>
        <span className="art-chip chip-quote">Front-end, back-end e interfaces que fazem sentido.</span>
      </div>
    </div>
  );
}
