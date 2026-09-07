import Header from './components/Header'
import Profile from './components/Profile'
import About from './components/About'
import Projects from './components/Projects'
import Footer from './components/Footer'
import './App.css'

function App() {

  return (
    <div className="portfolio-shell">
      <Header />
      <main className="site-main">
        <section className="intro-band">
          <Profile />
        </section>
        <About />
        <Projects />
      </main>
      <Footer />
    </div>
  )
}

export default App
