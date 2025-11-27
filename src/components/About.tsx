import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import engineersImage from "@/assets/engineers-planning.jpg";
import engenheiro from "../img/engenheiro.jpg";

const About = () => {
  return (
    <section className="section-padding bg-secondary">
      <div className="container mx-auto container-padding">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative animate-fade-in">
            <div className="absolute -inset-4 bg-accent/10 rounded-2xl blur-2xl"></div>
            <img 
              src={engenheiro}
              alt="Engenheiros profissionais a planear projectos"
              className="relative rounded-2xl shadow-2xl w-full h-auto"
            />
            <div className="absolute -bottom-8 -right-8 bg-accent text-white p-6 rounded-xl shadow-xl">
              <p className="text-4xl font-bold font-display">+100</p>
              <p className="text-sm">Projectos a nível nacional</p>
            </div>
          </div>

          {/* Content */}
          <div className="animate-slide-up">
            <p className="text-accent font-semibold mb-3 tracking-wide uppercase vermelho">Sobre Nós</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary font-display leading-tight">
              Criando os marcos de amanhã, hoje
            </h2>
            <div className="space-y-4 text-lg text-foreground/80 mb-8">
              <p className="texto-justificado">
                A <span className="font-semibold text-primary">REGADIO</span> é uma empresa de engenharia e construção com ambição global, focada na concepção, gestão e entrega de projectos de desenvolvimento urbano e infraestruturas críticas de grande escala.
              </p>
              <p className="texto-justificado">
                Nascemos para resolver o desafio de desenvolvimento habitacional e de infraestrutura em África, com o projecto estratégico de construir <span className="font-semibold text-accent">cidades integradas e resilientes</span>.
              </p>
              <p className="texto-justificado">
                A nossa governação e compliance são estruturadas para a transparência e auditabilidade exigidas pelos <span className="font-semibold">Fundos de Investimento e Bancos de Desenvolvimento Internacionais</span>.
              </p>
            </div>
            <Button size="lg" className="btn-secondary" asChild>
              <Link to="/sobre">Conheça Nossa História</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
