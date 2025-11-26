import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";
import { newsArticles } from "@/data/news";

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
          {newsArticles.slice(0, 3).map((item) => (
            <Link
              key={item.id}
              to={`/noticias/${item.slug}`}
              className="bg-card rounded-2xl overflow-hidden border border-border hover:border-accent transition-all duration-300 card-hover group block"
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
                <span className="text-accent font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                  Ler mais
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
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
