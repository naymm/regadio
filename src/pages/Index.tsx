import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import Production from "@/components/Production";
import Projects from "@/components/Projects";
import Vision from "@/components/Vision";
import Certifications from "@/components/Certifications";
import News from "@/components/News";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Stats />
        <Services />
        <Production />
        <Projects />
        <Vision />
        <Certifications />
        <News />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
