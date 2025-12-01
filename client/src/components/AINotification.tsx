import { useState, useEffect, useRef } from 'react';
import { X, Sparkles, Bot, ArrowRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function AINotification() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 400);
  };

  const handleOpen = () => {
    setIsOpen(true);
    setIsClosing(false);
  };

  useEffect(() => {
    if (isOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen && !isClosing) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, isClosing]);

  return (
    <>
      <Button
        onClick={handleOpen}
        className="fixed bottom-8 right-8 z-30 bg-gradient-to-r from-purple-600 to-pink-600 border-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.4)] animate-pulse-glow group"
        size="lg"
        data-testid="button-ai-open"
      >
        <Sparkles className="w-5 h-5 mr-2 group-hover:animate-spin" />
        <span className="font-display uppercase tracking-wider text-sm">AI Ассистент</span>
      </Button>

      {isOpen && (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="ai-notification-title"
          className={`fixed top-1/2 right-4 md:right-8 -translate-y-1/2 z-40 w-[400px] max-w-[calc(100vw-2rem)] ${
            isClosing ? 'animate-slide-out-right' : 'animate-slide-in-right'
          }`}
          data-testid="ai-notification"
        >
          <div className="relative backdrop-blur-xl bg-gradient-to-br from-purple-900/50 to-pink-900/40 border border-purple-500/30 rounded-2xl shadow-[0_0_50px_rgba(168,85,247,0.3)] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 pointer-events-none" />

            <div className="relative p-6">
              <div className="flex items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.5)]">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 id="ai-notification-title" className="font-display text-lg font-bold text-white uppercase tracking-wide">
                      AI Ассистент
                    </h3>
                    <p className="text-purple-300 text-xs">Night Word Intelligence</p>
                  </div>
                </div>
                <Button
                  ref={closeButtonRef}
                  variant="ghost"
                  size="icon"
                  onClick={handleClose}
                  className="text-purple-300 hover:text-white hover:bg-purple-500/20"
                  data-testid="button-ai-close"
                  aria-label="Закрыть панель AI ассистента"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="space-y-4 mb-6">
                <div className="bg-black/30 rounded-xl p-4 border border-purple-500/20">
                  <div className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-white font-medium mb-1">Умный помощник</h4>
                      <p className="text-muted-foreground text-sm">
                        AI понимает контекст и помогает создавать уникальные истории
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-black/30 rounded-xl p-4 border border-pink-500/20">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-pink-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-white font-medium mb-1">Генерация контента</h4>
                      <p className="text-muted-foreground text-sm">
                        Создавайте персонажей, сценарии и интерактивные истории
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl p-4 border border-purple-500/30 mb-4">
                <p className="text-purple-200 text-sm text-center">
                  AI-функции будут доступны в Q1 2026
                </p>
              </div>

              <Button
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 border-purple-500/50 group"
                data-testid="button-ai-learn-more"
              >
                <span className="font-display uppercase tracking-wider text-sm">Узнать больше</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
