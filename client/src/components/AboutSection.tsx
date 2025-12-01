import { Stars, Rocket, Heart } from 'lucide-react';

export function AboutSection() {
  return (
    <section id="about" className="relative py-20 px-4" data-testid="about-section">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6 uppercase tracking-wider text-white">
              О проекте Night Word
            </h2>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              Night Word — это инновационная платформа, объединяющая искусственный интеллект 
              и социальное взаимодействие в уникальном ночном пространстве.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Мы создаём место, где каждый может погрузиться в интерактивные истории, 
              найти сообщество единомышленников и участвовать в захватывающих ночных событиях.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg">
                  <Stars className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Уникальный опыт</h4>
                  <p className="text-muted-foreground text-sm">Погружение в мир ночных приключений</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-600 to-rose-600 flex items-center justify-center shadow-lg">
                  <Rocket className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Передовые технологии</h4>
                  <p className="text-muted-foreground text-sm">AI нового поколения для создания контента</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center shadow-lg">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Сообщество</h4>
                  <p className="text-muted-foreground text-sm">Тысячи пользователей по всему миру</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative backdrop-blur-lg bg-gradient-to-br from-purple-900/40 to-pink-900/30 border border-purple-500/30 rounded-2xl p-8 shadow-[0_0_60px_rgba(168,85,247,0.2)]">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-pink-600/20 to-violet-600/20 rounded-full blur-2xl" />

              <div className="relative space-y-6">
                <div className="text-center">
                  <div className="font-display text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                    2026
                  </div>
                  <p className="text-purple-300 text-sm uppercase tracking-wider mt-2">Год запуска</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black/30 rounded-xl p-4 text-center border border-purple-500/20">
                    <div className="font-display text-2xl font-bold text-white">4</div>
                    <p className="text-muted-foreground text-xs mt-1">Этапа развития</p>
                  </div>
                  <div className="bg-black/30 rounded-xl p-4 text-center border border-purple-500/20">
                    <div className="font-display text-2xl font-bold text-white">AI</div>
                    <p className="text-muted-foreground text-xs mt-1">Интеллект</p>
                  </div>
                  <div className="bg-black/30 rounded-xl p-4 text-center border border-purple-500/20">
                    <div className="font-display text-2xl font-bold text-white">24/7</div>
                    <p className="text-muted-foreground text-xs mt-1">Доступность</p>
                  </div>
                  <div className="bg-black/30 rounded-xl p-4 text-center border border-purple-500/20">
                    <div className="font-display text-2xl font-bold text-white">100%</div>
                    <p className="text-muted-foreground text-xs mt-1">Безопасность</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
