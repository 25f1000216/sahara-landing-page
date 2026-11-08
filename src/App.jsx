import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Framework from './components/Framework'
import Events from './components/Events'
import Timeline from './components/Timeline'
import Testimonials from './components/Testimonials'
import Team from './components/Team'
import Gallery from './components/Gallery'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <a href="#about" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-emerald-600 focus:px-4 focus:py-2">Skip to content</a>
      <Navbar />
      <main>
        <Hero /><About /><Framework /><Events /><Timeline /><Testimonials /><Team /><Gallery /><Contact />
      </main>
      <Footer />
    </>
  )
}
