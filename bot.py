import os
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Updater, CommandHandler, CallbackQueryHandler, MessageHandler, Filters, CallbackContext
import openai

# --- Настройки через переменные окружения ---
TOKEN = os.environ.get("TELEGRAM_TOKEN")      # токен Telegram-бота
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")  # ключ OpenAI

openai.api_key = OPENAI_API_KEY

# Словарь для хранения состояния пользователя (ИИ или человек)
user_mode = {}

# Старт бота
def start(update: Update, context: CallbackContext):
    keyboard = [
        [InlineKeyboardButton("ИИ-поддержка", callback_data='ai')],
        [InlineKeyboardButton("Прямая связь с человеком", callback_data='human')]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    update.message.reply_text(
        "Привет! Это Night Word Project. Я здесь, чтобы поддерживать тебя.\nВыбери способ поддержки:",
        reply_markup=reply_markup
    )

# Обработка кнопок
def button(update: Update, context: CallbackContext):
    query = update.callback_query
    query.answer()
    user_id = query.from_user.id

    if query.data == 'ai':
        user_mode[user_id] = 'ai'
        query.edit_message_text("Ты выбрал ИИ-поддержку. Напиши мне сообщение, и я отвечу тебе прямо здесь 😊")
    elif query.data == 'human':
        user_mode[user_id] = 'human'
        query.edit_message_text("Ты выбрал связь с человеком. Напиши сообщение — оно будет отправлено оператору.")

# Обработка сообщений
def handle_message(update: Update, context: CallbackContext):
    user_id = update.message.from_user.id
    text = update.message.text

    mode = user_mode.get(user_id, 'ai')  # по умолчанию ИИ

    if mode == 'ai':
        try:
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "Ты — поддерживающий и дружелюбный помощник."},
                    {"role": "user", "content": text}
                ],
                max_tokens=200
            )
            answer = response['choices'][0]['message']['content']
        except Exception as e:
            answer = f"Произошла ошибка при запросе к ИИ: {e}"
        update.message.reply_text(answer)
    else:
        # Сообщения оператору
        operator_chat_id = os.environ.get("OPERATOR_CHAT_ID")
        if operator_chat_id:
            context.bot.send_message(chat_id=operator_chat_id,
                                     text=f"Запрос от {update.message.from_user.first_name}:\n{text}")
        update.message.reply_text("Твое сообщение отправлено оператору. Ожидай ответа.")

# Flask сервер для Replit, чтобы бот не засыпал
from flask import Flask
from threading import Thread

app = Flask('')

@app.route('/')
def home():
    return "Bot is running"

def run():
    app.run(host='0.0.0.0', port=8080)

Thread(target=run).start()

# Основной запуск бота
def main():
    updater = Updater(TOKEN, use_context=True)
    dp = updater.dispatcher

    dp.add_handler(CommandHandler("start", start))
    dp.add_handler(CallbackQueryHandler(button))
    dp.add_handler(MessageHandler(Filters.text & ~Filters.command, handle_message))

    updater.start_polling()
    updater.idle()

if __name__ == '__main__':
    main()
