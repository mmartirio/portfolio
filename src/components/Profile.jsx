import './Profile.css';
import About from './About';

// Importações individuais (mais simples e confiável)
import profileImage from '../assets/Profile_sem_fundo.png';
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
            <img className="profile-image" src={profileImage} alt="Foto de perfil" />
            <h2>Marcos <span>Martirio</span></h2>
            <h3><strong>Desenvolvedor</strong> <span>Full Stack</span></h3>
            <div className="svg-row">
                <div className="svg-circle"><img src={htmlIcon} alt="HTML5" className="svg-icon-small" /></div>
                <div className="svg-circle"><img src={cssIcon} alt="CSS3" className="svg-icon-small" /></div>
                <div className="svg-circle"><img src={jsIcon} alt="JavaScript" className="svg-icon-small" /></div>
                <div className="svg-circle"><img src={reactIcon} alt="React" className="svg-icon-small" /></div>
                <div className="svg-circle"><img src={pythonIcon} alt="Python" className="svg-icon-small" /></div>
                <div className="svg-circle"><img src={javaIcon} alt="Java" className="svg-icon-small" /></div>
            </div>
        </div>
        <About />
        </section>
    );
}