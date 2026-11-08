import Header from './components/Header'
import Profile from './components/Profile'
import About from './components/About'
import Projects from './components/Projects'
import Footer from './components/Footer'
import ScrollFx from './components/ScrollFx'
import { useScrollReveal } from './hooks/useScrollReveal'
import './App.css'

function App() {
  useScrollReveal()

  return (
    <div className="portfolio-shell">
      <ScrollFx />
      <Header />
      <main className="site-main">
        <section className="intro-band" id="home">
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
