import './Profile.css';

export default function Profile() {
    return (
        <section className="name-profile">
        <div className="profile-content">
            <img className="profile-image" src="/src/assets/Profile_sem_fundo.png" alt="Foto de perfil" />
            <h2>Marcos <span>Martirio</span></h2>
            <h3><strong>Desenvolvedor</strong> <span>Full Stack</span></h3>
            <div className="svg-row">
            <div className="svg-circle"><img src="/src/assets/html-5-logo-svg-1.svg" alt="HTML5" className="svg-icon-small" /></div>
            <div className="svg-circle"><img src="/src/assets/css-3.svg" alt="CSS3" className="svg-icon-small" /></div>
            <div className="svg-circle"><img src="/src/assets/javascript-1.svg" alt="JavaScript" className="svg-icon-small" /></div>
            <div className="svg-circle"><img src="/src/assets/react.svg" alt="React" className="svg-icon-small" /></div>
            <div className="svg-circle"><img src="/src/assets/python-5.svg" alt="Python" className="svg-icon-small" /></div>
            <div className="svg-circle"><img src="/src/assets/java.svg" alt="Java" className="svg-icon-small" /></div>
            </div>
        </div>
        </section>
    );
}
