import './HeroArt.css';
import { usePointerTilt } from '../hooks/usePointerTilt';

const PROFILE_SRC = '/hero/profile.webp';
const CODE_BG_SRC = '/hero/code-bg.webp';

const ORBIT_A = 'M196,100 a96,34 0 1,1 -192,0 a96,34 0 1,1 192,0';
const ORBIT_B = 'M8,100 a92,26 0 1,0 184,0 a92,26 0 1,0 -184,0';

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

export default function HeroArt() {
  const tilt = usePointerTilt(
    (stage, x, y) => {
      stage.style.setProperty('--vx', (x - 0.5).toFixed(3));
      stage.style.setProperty('--vy', (y - 0.5).toFixed(3));
    },
    (stage) => {
      stage.style.setProperty('--vx', '0');
      stage.style.setProperty('--vy', '0');
    },
  );

  return (
    <div className="profile-visual" data-parallax="-0.12">
      <div className="art-stage" {...tilt}>
        <span className="art-grid" aria-hidden="true" />
        <span className="art-glow" aria-hidden="true" />

        <Orbit />

        <div className="art-portal" aria-hidden="true">
          <span className="portal-code" style={{ backgroundImage: `url(${CODE_BG_SRC})` }} />
          <span className="portal-tint" />
          <span className="portal-scan" />
        </div>
        <span className="art-ring" aria-hidden="true" />

        <div className="art-portrait">
          <img
            className="art-photo"
            src={PROFILE_SRC}
            alt="Foto de Marcos Martirio"
            width="800"
            height="817"
            fetchPriority="high"
            loading="eager"
            decoding="async"
          />
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
