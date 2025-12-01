import { Sparkles, Users, Moon, Palette, Shield, Zap } from 'lucide-react';

const features = [
  {
    icon: Sparkles,
    title: 'AI Истории',
    description: 'Генерируйте уникальные интерактивные истории с помощью искусственного интеллекта',
    color: 'from-purple-600 to-pink-600',
  },
  {
    icon: Users,
    title: 'Сообщества',
    description: 'Присоединяйтесь к тематическим сообществам и находите единомышленников',
    color: 'from-pink-600 to-rose-600',
  },
  {
    icon: Moon,
    title: 'Ночные события',
    description: 'Участвуйте в эксклюзивных ночных мероприятиях и квестах',
    color: 'from-violet-600 to-purple-600',
  },
  {
    icon: Palette,
    title: 'Кастомизация',
    description: 'Создавайте уникальных персонажей и настраивайте их внешний вид',
    color: 'from-blue-600 to-violet-600',
  },
  {
    icon: Shield,
    title: 'Безопасность',
    description: 'Ваши данные защищены современными технологиями шифрования',
    color: 'from-emerald-600 to-teal-600',
  },
  {
    icon: Zap,
    title: 'Быстродействие',
    description: 'Мгновенная загрузка и плавная работа на любых устройствах',
    color: 'from-amber-600 to-orange-600',
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-20 px-4" data-testid="features-section">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 uppercase tracking-wider text-white">
          Особенности
        </h2>
        <p className="text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
          Откройте для себя уникальные возможности платформы Night Word
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group backdrop-blur-lg bg-gradient-to-br from-purple-900/30 to-pink-900/20 border border-purple-500/20 rounded-xl p-8 transition-all duration-300 hover:border-purple-500/40 hover:shadow-[0_0_40px_rgba(168,85,247,0.2)] hover:-translate-y-1"
                data-testid={`feature-card-${index}`}
              >
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg group-hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-shadow`}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-3 uppercase tracking-wide">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
