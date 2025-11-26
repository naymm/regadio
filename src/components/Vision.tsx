import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import urbanImage from "@/assets/urban-development.jpg";

const Vision = () => {
  return (
    <section className="relative section-padding overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src={urbanImage}
          alt="Desenvolvimento urbano em África"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-darker/95 via-primary/90 to-primary/85"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto container-padding">
        <div className="max-w-4xl">
          <p className="text-accent font-semibold mb-4 tracking-wide uppercase text-lg">
            Para Onde Vamos
          </p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-white font-display leading-tight">
            CONSTRUÍMOS O FUTURO
          </h2>
          <div className="space-y-6 text-lg text-white/90 mb-10">
            <p className="text-xl md:text-2xl leading-relaxed texto-justificado">
              A nossa visão é expandir por toda África, construindo <span className="text-accent font-semibold">cidades integradas, sustentáveis e resilientes</span> que respondem aos desafios de crescimento urbano acelerado.
            </p>
            <p className="text-lg leading-relaxed texto-justificado">
              Comprometemo-nos com o desenvolvimento de <span className="font-semibold">habitação acessível</span> e <span className="font-semibold">infraestruturas críticas</span>, sempre com os mais altos padrões de qualidade e compliance internacional.
            </p>
            <p className="text-lg leading-relaxed texto-justificado">
              Cada projecto que entregamos é um marco no desenvolvimento do continente, criando oportunidades económicas e melhorando a qualidade de vida de milhares de famílias.
            </p>
          </div>
          <Button size="lg" className="btn-primary text-lg" asChild>
            <Link to="/sobre">Conheça Nossa Visão</Link>
          </Button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-accent/10 blur-3xl rounded-full"></div>
    </section>
  );
};

export default Vision;
