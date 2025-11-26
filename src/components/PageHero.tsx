import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  kicker?: string;
  title: string;
  description: string;
  className?: string;
  actions?: ReactNode;
}

const PageHero = ({ kicker, title, description, className, actions }: PageHeroProps) => {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-primary text-white pt-32 pb-20",
        "before:absolute before:inset-0 before:bg-gradient-to-r before:from-primary before:via-navy-darker/90",
        "before:to-primary/80 before:-z-10",
        className,
      )}
    >
      <div className="absolute inset-y-0 right-0 w-1/2 opacity-20 pointer-events-none hidden lg:block">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.25),_transparent_60%)]" />
      </div>
      <div className="container mx-auto container-padding">
        {kicker && (
          <p className="text-accent font-semibold tracking-[0.4em] uppercase text-sm mb-4">
            {kicker}
          </p>
        )}
        <div className="max-w-3xl space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight font-display">{title}</h1>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed">{description}</p>
          {actions && <div className="flex flex-wrap gap-4">{actions}</div>}
        </div>
      </div>
    </section>
  );
};

export default PageHero;

