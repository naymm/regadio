import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowLeft, Tag, User, Share2 } from "lucide-react";
import { getNewsBySlug, newsArticles } from "@/data/news";
import { useEffect } from "react";

const NewsDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const article = slug ? getNewsBySlug(slug) : null;

  useEffect(() => {
    if (!article && slug) {
      // Redirect to news page if article not found
      navigate("/noticias", { replace: true });
    }
  }, [article, slug, navigate]);

  // Scroll to top when article changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [slug]);

  if (!article) {
    return null;
  }

  // Get related articles (exclude current article)
  const relatedArticles = newsArticles
    .filter(a => a.id !== article.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative bg-primary text-white">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/90 to-primary"></div>
          <div className="relative container mx-auto container-padding py-20">
            <Button
              variant="ghost"
              className="mb-8 text-white hover:bg-white/10"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            
            <div className="max-w-4xl">
              {article.category && (
                <span className="inline-block px-4 py-2 bg-accent/20 text-accent rounded-full font-semibold mb-4">
                  {article.category}
                </span>
              )}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display mb-6 leading-tight">
                {article.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-white/80 mb-8">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{article.date}</span>
                </div>
                {article.author && (
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    <span>{article.author}</span>
                  </div>
                )}
              </div>
              <p className="text-xl text-white/90 leading-relaxed">
                {article.description}
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="section-padding bg-background">
          <div className="container mx-auto container-padding">
            <div className="max-w-4xl mx-auto">
              {/* Featured Image */}
              <div className="mb-12 rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Article Content */}
              <article className="mb-12">
                <div
                  className="news-content"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              </article>

              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-3 mb-12 pb-8 border-b border-border">
                  <Tag className="w-5 h-5 text-accent" />
                  {article.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Share Section */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-secondary rounded-2xl mb-12">
                <div>
                  <h3 className="text-xl font-display text-primary mb-2">Partilhar esta notícia</h3>
                  <p className="text-muted-foreground">Ajude-nos a espalhar a palavra</p>
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="border-accent text-accent hover:bg-accent hover:text-white"
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: article.title,
                          text: article.description,
                          url: window.location.href,
                        });
                      } else {
                        navigator.clipboard.writeText(window.location.href);
                        alert("Link copiado para a área de transferência!");
                      }
                    }}
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Partilhar
                  </Button>
                </div>
              </div>

              {/* Related Articles */}
              {relatedArticles.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-3xl font-display text-primary mb-8">Notícias Relacionadas</h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    {relatedArticles.map((related) => (
                      <Link
                        key={related.id}
                        to={`/noticias/${related.slug}`}
                        className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-accent transition-all duration-300 card-hover"
                      >
                        <div className="aspect-[16/10] overflow-hidden">
                          <img
                            src={related.image}
                            alt={related.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                        <div className="p-6">
                          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                            <Calendar className="w-4 h-4" />
                            <span>{related.date}</span>
                          </div>
                          <h3 className="text-lg font-bold text-primary mb-2 font-display leading-tight group-hover:text-accent transition-colors">
                            {related.title}
                          </h3>
                          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                            {related.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Back to News Button */}
              <div className="text-center">
                <Button size="lg" variant="outline" className="border-accent text-accent hover:bg-accent hover:text-white" asChild>
                  <Link to="/noticias">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Ver Todas as Notícias
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default NewsDetailPage;

