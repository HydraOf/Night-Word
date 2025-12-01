import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: string; text: string }>>([
    {
      role: 'ai',
      text: 'Привет! AI чат находится в разработке. Вскоре здесь появятся интерактивные истории и персонализированные рекомендации.',
    },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages([
      ...messages,
      { role: 'user', text: input },
      { role: 'ai', text: 'Спасибо за ваше сообщение! Функция находится в разработке. Возвращайтесь позже!' },
    ]);
    setInput('');
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-8 z-40 p-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:shadow-[0_0_40px_rgba(168,85,247,0.6)] transition-all duration-300"
        aria-label="AI чат"
        data-testid="button-ai-chat"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {isOpen && (
        <div
          className="fixed bottom-40 right-8 z-50 w-96 max-w-[calc(100vw-2rem)] bg-[#0a0010] border-2 border-purple-500/40 rounded-xl shadow-[0_0_50px_rgba(168,85,247,0.3)] flex flex-col max-h-96"
          data-testid="ai-chat-window"
        >
          <div className="flex items-center justify-between p-4 border-b border-purple-500/20 bg-gradient-to-r from-purple-900/30 to-pink-900/20">
            <h3 className="font-display font-bold text-white uppercase tracking-wide">AI Ассистент</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-purple-300 hover:text-white"
              data-testid="button-ai-chat-close"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.role === 'user'
                      ? 'bg-purple-600 text-white'
                      : 'bg-purple-900/30 border border-purple-500/20 text-purple-100'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div className="text-xs text-purple-400 text-center italic">В разработке</div>
          </div>

          <div className="p-4 border-t border-purple-500/20 flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Напишите сообщение..."
              className="bg-purple-900/20 border-purple-500/30 text-white placeholder:text-purple-400/50"
              data-testid="input-ai-chat"
              disabled
            />
            <Button
              onClick={handleSend}
              size="icon"
              className="bg-purple-600 hover:bg-purple-700"
              data-testid="button-ai-chat-send"
              disabled
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
