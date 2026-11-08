import './Profile.css';

import HeroArt from './HeroArt';
import htmlIcon from '../assets/html-5-logo-svg-1.svg';
import cssIcon from '../assets/css-3.svg';
import jsIcon from '../assets/javascript-1.svg';
import reactIcon from '../assets/react.svg';
import pythonIcon from '../assets/python-5.svg';
import javaIcon from '../assets/java.svg';

const stack = [
    { name: 'HTML5', icon: htmlIcon, color: '#e34f26' },
    { name: 'CSS3', icon: cssIcon, color: '#1572b6' },
    { name: 'JavaScript', icon: jsIcon, color: '#f7df1e' },
    { name: 'React', icon: reactIcon, color: '#61dafb' },
    { name: 'Python', icon: pythonIcon, color: '#3776ab' },
    { name: 'Java', icon: javaIcon, color: '#f89820' },
];

export default function Profile() {
    return (
        <section className="name-profile">
        <div className="profile-content">
            <p className="profile-kicker">DESENVOLVIMENTO WEB · PRODUTOS DIGITAIS</p>
            <h2><span className="first-name">Marcos</span><span>Martirio</span></h2>
            <h3><strong>Desenvolvedor</strong> <span>Full Stack</span></h3>
            <p className="profile-lead">Crio interfaces e aplicações funcionais para transformar ideias em experiências digitais claras, úteis e bem construídas.</p>
            <div className="profile-actions">
                <a className="primary-action" href="#projetos">Ver projetos <span aria-hidden="true">↗</span></a>
                <a className="secondary-action" href="/Marcos_Martirio_CV_Desenvolvedor_Junior.pdf" download>Baixar CV</a>
            </div>
            <ul className="stack-dock" aria-label="Tecnologias que uso">
                {stack.map((tech) => (
                    <li className="dock-item" key={tech.name} style={{ '--brand': tech.color }}>
                        <img src={tech.icon} alt="" className="dock-icon" />
                        <span className="dock-tip">{tech.name}</span>
                    </li>
                ))}
            </ul>
        </div>
        <HeroArt />
        </section>
    );
}