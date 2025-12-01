import { Mail, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

export function ContactSection() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormState({ name: '', email: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <section id="contact" className="relative py-24 px-4" data-testid="contact-section">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-900/30 border border-purple-500/30 mb-6 backdrop-blur-sm">
              <Mail className="w-4 h-4 text-purple-400" />
              <span className="text-purple-300 text-sm font-medium">Контакты</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-wider mb-6 text-white">
              Свяжитесь с нами
            </h2>
            <p className="text-muted-foreground mb-8">
              Есть вопросы или предложения? Мы готовы услышать ваши идеи о Night Word. Пишите нам прямо сейчас!
            </p>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-purple-900/30 border border-purple-500/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-white mb-1">Email</h3>
                  <a href="mailto:nightwordd@gmail.com" className="text-purple-300 hover:text-purple-200 transition-colors">
                    nightwordd@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-purple-900/30 border border-purple-500/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-white mb-1">Локация</h3>
                  <p className="text-muted-foreground">Киев, Украина</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Ваше имя</label>
                <Input
                  placeholder="Введите ваше имя"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  required
                  data-testid="input-contact-name"
                  className="bg-purple-900/20 border-purple-500/20 text-white placeholder:text-purple-400/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Email</label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  required
                  data-testid="input-contact-email"
                  className="bg-purple-900/20 border-purple-500/20 text-white placeholder:text-purple-400/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Сообщение</label>
                <Textarea
                  placeholder="Ваше сообщение..."
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  required
                  data-testid="input-contact-message"
                  className="bg-purple-900/20 border-purple-500/20 text-white placeholder:text-purple-400/50 min-h-32"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 border-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.4)]"
                data-testid="button-contact-submit"
              >
                <Send className="w-4 h-4 mr-2" />
                <span className="font-display uppercase tracking-wider">Отправить</span>
              </Button>

              {submitted && (
                <div className="p-4 rounded-lg bg-green-900/30 border border-green-500/30 text-green-300 text-center animate-in fade-in">
                  Спасибо! Мы получили ваше сообщение
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
