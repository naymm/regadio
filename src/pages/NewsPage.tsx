import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import News from "@/components/News";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Megaphone, Newspaper, PenLine, Mail, Phone, ArrowRight } from "lucide-react";
import { newsArticles } from "@/data/news";

const mediaContacts = [
  { icon: Mail, title: "Press Desk", detail: "press@regadio.co.ao" },
  { icon: Phone, title: "Linha directa", detail: "+244 999 000 111" },
];

const NewsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <PageHero
          kicker="Imprensa"
          title="Notícias, comunicados e insights"
          description="Acompanhe os principais anúncios corporativos, milestones de mega-projectos e publicações oficiais da REGADIO."
          actions={
            <>
              <Button className="btn-primary" asChild>
                <Link to="/contactos">Contactar comunicação</Link>
              </Button>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                <Link to="/noticias#newsletter">Subscrever newsletter</Link>
              </Button>
            </>
          }
        />

        <News />

        <section className="section-padding bg-secondary">
          <div className="container mx-auto container-padding">
            <div className="grid lg:grid-cols-2 gap-10 mb-12">
              <div>
                <p className="text-accent font-semibold mb-3 tracking-wide uppercase">Comunicados</p>
                <h2 className="text-4xl font-display text-primary mb-4">Notas oficiais recentes</h2>
                <p className="text-lg text-muted-foreground">
                  Conteúdo preparado para meios de comunicação e stakeholders institucionais.
                </p>
              </div>
              <div className="flex items-center gap-4 bg-white p-6 rounded-2xl border border-border shadow-sm">
                <Megaphone className="w-10 h-10 text-accent" />
                <p className="text-muted-foreground">
                  Disponibilizamos kits de imprensa, galerias de imagens e entrevistas mediante solicitação.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              {newsArticles.map((article) => (
                <article key={article.id} className="p-6 rounded-2xl bg-white border border-border card-hover group">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
                    <p className="text-sm uppercase tracking-widest text-muted-foreground">{article.date}</p>
                    <span className="inline-flex items-center gap-2 text-accent font-semibold">
                      <Newspaper className="w-4 h-4" />
                      {article.category || "Notícia"}
                    </span>
                  </div>
                  <h3 className="text-2xl font-display text-primary mb-2 group-hover:text-accent transition-colors">{article.title}</h3>
                  <p className="text-muted-foreground mb-4">{article.description}</p>
                  <Button variant="ghost" className="text-accent hover:text-orange-light px-0" asChild>
                    <Link to={`/noticias/${article.slug}`}>
                      Ler notícia completa
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="newsletter" className="section-padding bg-background">
          <div className="container mx-auto container-padding grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-accent font-semibold mb-3 tracking-wide uppercase">Newsletter</p>
              <h2 className="text-4xl font-display text-primary mb-4">Receba actualizações mensais</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Relatórios de progresso, novos projectos e oportunidades de parceria directamente no seu email.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  type="email"
                  placeholder="O seu email"
                  className="h-14 text-lg"
                  aria-label="Email para newsletter"
                />
                <Button size="lg" className="btn-primary">
                  Subscrever
                </Button>
              </div>
            </div>
            <div className="p-8 rounded-3xl bg-primary text-white space-y-6">
              <div className="flex items-center gap-4">
                <PenLine className="w-10 h-10 text-accent" />
                <div>
                  <h3 className="text-2xl font-display">Contactos de imprensa</h3>
                  <p className="text-white/70">Resposta em menos de 24h úteis.</p>
                </div>
              </div>
              <ul className="space-y-4">
                {mediaContacts.map((contact) => (
                  <li key={contact.title} className="flex items-start gap-4">
                    <contact.icon className="w-6 h-6 text-accent flex-shrink-0" />
                    <div>
                      <p className="text-sm uppercase tracking-widest text-white/70">{contact.title}</p>
                      <p className="text-lg">{contact.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default NewsPage;

