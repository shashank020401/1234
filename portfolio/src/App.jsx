import { AnimatePresence } from "framer-motion"
import { useState } from "react"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import About from "./pages/About"
import Skills from "./pages/Skills"
import Projects from "./pages/Projects"
import PeopleSay from "./pages/PeopleSay"
import Contact from "./pages/Contact"
import Footer from "./pages/Footer"
import CustomCursor from "./components/CustomCursor"
import Certificate from './pages/Certificate'
import Internship from "./pages/Internship"
import IntroAnimation from "./components/IntroAnimation"

export default function App() {
  const [isIntroVisible, setIsIntroVisible] = useState(true)

  return (
    <>
      <AnimatePresence>
        {isIntroVisible && (
          <IntroAnimation onComplete={() => setIsIntroVisible(false)} />
        )}
      </AnimatePresence>

      <CustomCursor />
      <Navbar />

      <div>
        <Home />
        <About />
        <Skills />
        <Projects />
        <Internship />
        <Certificate />
        <PeopleSay />
        <Contact />
      </div>

      <Footer />
    </>
  )
}