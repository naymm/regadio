import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import heroImage from "@/assets/hero-construction.jpg";

const Hero = () => {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Equipamentos de construção em acção" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/75"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto container-padding text-center text-white">
        <p className="text-accent font-display text-lg md:text-xl mb-4 animate-fade-in tracking-wider branco uppercase">
          Engenharia e Construção
        </p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-slide-up font-display leading-tight">
          Onde a visão encontra<br />bases sólidas
        </h1>
        <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-white/90 animate-fade-in animation-delay-200">
          Mega-projectos de desenvolvimento urbano e infraestruturas críticas que transformam África
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-scale-in animation-delay-400">
          <Button 
            size="lg" 
            className="btn-primary text-lg group"
            asChild
          >
            <Link to="/projectos">
              Nossos Projectos
              <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 text-lg"
          >
            <Play className="mr-2 h-5 w-5" />
            Ver Vídeo
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-white/50 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
