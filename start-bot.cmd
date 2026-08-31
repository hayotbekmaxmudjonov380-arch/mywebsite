@echo off
set TELEGRAM_BOT_TOKEN=8843514458:AAF7O4edSgHXg0ULgIBmqv521n8lNOSu8y0
set NEXT_PUBLIC_API_URL=http://localhost:3000
set AUTH_CODE_EXPIRY_MS=120000
node scripts/telegram-bot.js
