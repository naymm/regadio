import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";
import project1 from "@/assets/project-1.jpg";
import project3 from "@/assets/project-3.jpg";
import project6 from "@/assets/project-6.jpg";

const news = [
  {
    image: project6,
    date: "15 Nov 2025",
    title: "Inauguração da Cidade Nova Esperança",
    description: "Marco histórico com entrega de 5.000 habitações e infraestruturas completas para a comunidade."
  },
  {
    image: project3,
    date: "08 Nov 2025",
    title: "Parceria com Banco Africano de Desenvolvimento",
    description: "Financiamento aprovado para novo mega-projecto de desenvolvimento urbano sustentável."
  },
  {
    image: project1,
    date: "01 Nov 2025",
    title: "Prémio de Excelência em Construção 2025",
    description: "REGADIO reconhecida pela qualidade e inovação nos projectos de infraestrutura em África."
  },
];

const News = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto container-padding">
        <div className="text-center mb-16">
          <p className="text-accent font-semibold mb-3 tracking-wide uppercase">Notícias</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary font-display">
            Últimas Atualizações
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Fique a par das nossas conquistas e desenvolvimentos mais recentes
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {news.map((item, index) => (
            <article 
              key={index}
              className="bg-card rounded-2xl overflow-hidden border border-border hover:border-accent transition-all duration-300 card-hover group"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img 
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                  <Calendar className="w-4 h-4" />
                  <span>{item.date}</span>
                </div>
                <h3 className="text-xl font-bold text-primary mb-3 font-display leading-tight group-hover:text-accent transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {item.description}
                </p>
                <button className="text-accent font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                  Ler mais
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline" className="border-accent text-accent hover:bg-accent hover:text-white" asChild>
            <Link to="/noticias">Ver Todas as Notícias</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default News;
