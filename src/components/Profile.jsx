import './Profile.css';

// Importações individuais (mais simples e confiável)
import profileImage from '../assets/Profile_sem_fundo.png';
import backgroundImage from '../../assets/background-img.jpg';
import htmlIcon from '../assets/html-5-logo-svg-1.svg';
import cssIcon from '../assets/css-3.svg';
import jsIcon from '../assets/javascript-1.svg';
import reactIcon from '../assets/react.svg';
import pythonIcon from '../assets/python-5.svg';
import javaIcon from '../assets/java.svg';

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
            <div className="svg-row">
                <div className="svg-circle"><img src={htmlIcon} alt="HTML5" className="svg-icon-small" /></div>
                <div className="svg-circle"><img src={cssIcon} alt="CSS3" className="svg-icon-small" /></div>
                <div className="svg-circle"><img src={jsIcon} alt="JavaScript" className="svg-icon-small" /></div>
                <div className="svg-circle"><img src={reactIcon} alt="React" className="svg-icon-small" /></div>
                <div className="svg-circle"><img src={pythonIcon} alt="Python" className="svg-icon-small" /></div>
                <div className="svg-circle"><img src={javaIcon} alt="Java" className="svg-icon-small" /></div>
            </div>
        </div>
        <div className="profile-visual" style={{ '--profile-background': `url(${backgroundImage})` }}>
            <span className="visual-label">Disponível para novos projetos</span>
            <img className="profile-image" src={profileImage} alt="Foto de perfil" />
            <span className="visual-caption">Front-end, back-end e interfaces que fazem sentido.</span>
        </div>
        </section>
    );
}