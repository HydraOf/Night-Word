import { ArrowDown, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NightScene } from '@/components/NightScene';
import { Header } from '@/components/Header';
import { AboutSection } from '@/components/AboutSection';
import { RoadmapScene } from '@/components/RoadmapScene';
import { FeaturesSection } from '@/components/FeaturesSection';
import { TeamSection } from '@/components/TeamSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { AINotification } from '@/components/AINotification';
import { AudioManager } from '@/components/AudioManager';
import { AIChat } from '@/components/AIChat';
import { GitHubDeployButton } from '@/components/GitHubDeployButton';
import { HeroBackground } from '@/components/HeroBackground';

export default function Home() {
  const scrollToAbout = () => {
    const element = document.querySelector('#about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0015] text-white overflow-x-hidden">
      <Header />

      <section id="hero" className="relative min-h-screen h-screen max-h-[100svh] overflow-hidden bg-[#0a0010]" data-testid="hero-section">
        <NightScene />
        <HeroBackground />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/20 to-[#0a0010] pointer-events-none" />

        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-4 pt-24 pb-20">
          <div className="text-center max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-900/30 border border-purple-500/30 mb-8 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-purple-300 text-sm font-medium">Скоро запуск в 2026</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-wider mb-6 neon-text-glow">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 animate-pulse">
                Night Word
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-purple-200/80 mb-4 max-w-2xl mx-auto">
              Погрузитесь в мир ночных приключений
            </p>
            <p className="text-muted-foreground mb-10 max-w-xl mx-auto">
              Интерактивные истории с AI, уникальные сообщества и захватывающие ночные события
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <GitHubDeployButton />
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 border-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.4)] px-8"
                data-testid="button-hero-start"
              >
                <span className="font-display uppercase tracking-wider">Начать путешествие</span>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-purple-500/30 text-purple-200 hover:bg-purple-500/20 hover:text-white hover:border-purple-500/50 backdrop-blur-sm"
                data-testid="button-hero-learn"
              >
                <span>Узнать больше</span>
              </Button>
            </div>
          </div>
        </div>

        <button
          onClick={scrollToAbout}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-purple-300 hover:text-white transition-colors animate-float"
          data-testid="button-scroll-down"
        >
          <span className="text-xs uppercase tracking-widest">Прокрутите</span>
          <ArrowDown className="w-5 h-5" />
        </button>
      </section>

      <AboutSection />

      <div id="roadmap">
        <RoadmapScene />
      </div>

      <FeaturesSection />

      <TeamSection />

      <ContactSection />

      <Footer />

      <AINotification />
      <AIChat />
      <AudioManager />
    </div>
  );
}
