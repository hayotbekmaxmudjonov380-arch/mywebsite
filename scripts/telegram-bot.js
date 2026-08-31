const { Bot } = require('node-telegram-bot-api')

const BOT_TOKEN = '8843514458:AAF7O4edSgHXg0ULgIBmqv521n8lNOSu8y0'
const API_URL = 'http://localhost:3000'
const CODE_EXPIRY_MS = 120_000

const bot = new Bot(BOT_TOKEN)

console.log('ITSHOP Bot ishga tushdi...')

function showCode(ctx, code) {
  const sentMsg = ctx.reply(
    '\u{1F511} *Sizning kirish kodingiz:*\n\n' +
    '*`' + code + '`*\n\n' +
    '\u23F3 Bu kod 2 daqiqada bekor bo\'ladi.\n' +
    'Kodni nusxalab saytda kiriting.',
    { parse_mode: 'Markdown' }
  )
  sentMsg.then((msg) => {
    setTimeout(() => {
      ctx.api.deleteMessage(msg.chat.id, msg.message_id).catch(() => {})
    }, CODE_EXPIRY_MS)
  }).catch(() => {})
}

async function requestCodeFromAPI() {
  try {
    const res = await fetch(API_URL + '/api/auth/request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ telegramUserId: 0, telegramUsername: 'bot_user', telegramFirstName: 'Foydalanuvchi' }),
    })
    const data = await res.json()
    if (data.ok && data.code) {
      return data.code
    }
  } catch (e) {
    console.error('API xatosi:', e.message)
  }
  return null
}

bot.command('start', (ctx) => {
  const args = ctx.message.text.split(' ')
  const codeParam = args.length > 1 ? args[1].trim() : ''

  if (codeParam && /^[A-Z0-9]{4}$/i.test(codeParam)) {
    showCode(ctx, codeParam.toUpperCase())
  } else {
    const sentMsg = ctx.reply(
      '\u{1F44B} *Salom!*\n\n' +
      'ITSHOP autentifikatsiya botiga xush kelibsiz!\n\n' +
      'Saytda kirish uchun maxsus parol oling:',
      {
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: [
            [{ text: '\u{1F513} Kirish uchun parol', callback_data: 'get_code' }]
          ]
        }
      }
    )
    sentMsg.then((msg) => {
      setTimeout(() => {
        ctx.api.deleteMessage(msg.chat.id, msg.message_id).catch(() => {})
      }, CODE_EXPIRY_MS)
    }).catch(() => {})
  }
})

bot.command('help', (ctx) => {
  ctx.reply('Buyruqlar:\n/start — Botni boshlash\n/help — Yordam')
})

bot.on('callback_query', async (ctx) => {
  const data = ctx.callbackQuery.data

  if (data === 'get_code') {
    ctx.answerCallbackQuery({ text: 'Parol yaratilmoqda...' }).catch(() => {})

    const code = await requestCodeFromAPI()
    if (code) {
      showCode(ctx, code)
    } else {
      ctx.reply('Xatolik yuz berdi. Iltimos, qaytadan urinib ko\'ring.').catch(() => {})
    }
  }
})

bot.on('message', (ctx) => {
  if (ctx.message.text && !ctx.message.text.startsWith('/')) {
    ctx.reply('Iltimos, /start buyrug\'ini bosing.')
  }
})

bot.startPolling()
console.log('Bot polling rejimida ishlayapti...')
