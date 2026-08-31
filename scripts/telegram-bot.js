const { Bot } = require('node-telegram-bot-api')
const fs = require('fs')
const path = require('path')

// Load .env.local manually
try {
  const envPath = path.join(__dirname, '..', '.env.local')
  const envContent = fs.readFileSync(envPath, 'utf-8')
  envContent.split('\n').forEach(line => {
    const trimmed = line.trim()
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const eqIdx = trimmed.indexOf('=')
      const key = trimmed.slice(0, eqIdx).trim()
      const val = trimmed.slice(eqIdx + 1).trim()
      if (!process.env[key]) process.env[key] = val
    }
  })
} catch {}

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
const CODE_EXPIRY_MS = Number(process.env.AUTH_CODE_EXPIRY_MS) || 120_000

if (!BOT_TOKEN) {
  console.error('TELEGRAM_BOT_TOKEN environment variable is required')
  process.exit(1)
}

const bot = new Bot(BOT_TOKEN)

console.log('ITSHOP Bot ishga tushdi...')

function showCode(ctx, code) {
  ctx.reply(
    '\u{1F511} *Sizning kirish kodingiz:*\n\n' +
    '*`' + code + '`*\n\n' +
    '\u23F3 Bu kod 2 daqiqada bekor bo\'ladi.\n' +
    'Kodni nusxalab saytda kiriting.',
    { parse_mode: 'Markdown' }
  ).then((msg) => {
    setTimeout(() => {
      ctx.api.editMessageText(
        msg.chat.id,
        msg.message_id,
        '\u23F0 *Kod muddati tugadi*\n\n' +
        'Yangi kod olish uchun /start ni bosing.',
        { parse_mode: 'Markdown' }
      ).catch(() => {})
    }, CODE_EXPIRY_MS)
  }).catch(() => {})
}

bot.command('start', (ctx) => {
  const args = ctx.message.text.split(' ')
  const codeParam = args.length > 1 ? args[1].trim() : ''

  if (codeParam && /^[A-Z0-9]{4}$/i.test(codeParam)) {
    showCode(ctx, codeParam.toUpperCase())
  } else {
    ctx.reply(
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
    ).then((msg) => {
      setTimeout(() => {
        ctx.api.editMessageText(
          msg.chat.id,
          msg.message_id,
          '\u23F0 *Xabar muddati tugadi*\n\n' +
          'Yangi kod olish uchun /start ni bosing.',
          { parse_mode: 'Markdown', reply_markup: {} }
        ).catch(() => {})
      }, CODE_EXPIRY_MS)
    }).catch(() => {})
  }
})

bot.command('help', (ctx) => {
  ctx.reply('Buyruqlar:\n/start — Botni boshlash\n/help — Yordam')
})

bot.on('callback_query', (ctx) => {
  const data = ctx.callbackQuery.data

  if (data === 'get_code') {
    ctx.answerCallbackQuery({ text: 'Parol yaratilmoqda...' }).catch(() => {})

    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
    let code = ''
    for (let i = 0; i < 4; i++) {
      code += chars[Math.floor(Math.random() * chars.length)]
    }

    fetch(API_URL + '/api/auth/bot-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code,
        telegramUserId: ctx.from.id,
        telegramUsername: ctx.from.username || 'user',
        telegramFirstName: ctx.from.first_name || 'Foydalanuvchi',
      }),
    }).then(() => {
      showCode(ctx, code)
    }).catch(() => {
      ctx.reply('Xatolik yuz berdi. Iltimos, qaytadan urinib ko\'ring.').catch(() => {})
    })
  }
})

bot.on('message', (ctx) => {
  if (ctx.message.text && !ctx.message.text.startsWith('/')) {
    ctx.reply('Iltimos, /start buyrug\'ini bosing.')
  }
})

bot.startPolling()
console.log('Bot polling rejimida ishlayapti...')
