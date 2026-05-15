import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Solution from './components/Solution/Solution'
import Problem from './components/Problem/Problem'
import Hub from './components/Hub/Hub'
import Journey from './components/Journey/Journey'
import Tools from './components/Tools/Tools'
import Partnership from './components/Partnership/Partnership'
import Affiliates from './components/Affiliates/Affiliates'
import Impact from './components/Impact/Impact'
import Benefits from './components/Benefits/Benefits'
import HowItWorks from './components/HowItWorks/HowItWorks'
import Testimonials from './components/Testimonials/Testimonials'
import FAQ from './components/FAQ/FAQ'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Solution />
        <Problem />
        <Hub />
        <Journey />
        <Tools />
        <Partnership />
        <Affiliates />
        <Impact />
        <Benefits />
        <HowItWorks />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
