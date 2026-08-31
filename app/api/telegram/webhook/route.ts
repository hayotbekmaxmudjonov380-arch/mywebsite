import { NextRequest, NextResponse } from 'next/server'

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!

export async function POST(req: NextRequest) {
  try {
    const update = await req.json()

    const message = update.message || update.channel_post
    if (!message) return NextResponse.json({ ok: true })

    const chatId = message.chat.id
    const text = message.text || ''

    if (text.startsWith('/start')) {
      const parts = text.split(' ')
      const codeParam = parts.length > 1 ? parts[1] : null

      if (codeParam && /^[A-Z0-9]{4}$/i.test(codeParam)) {
        const displayCode = codeParam.toUpperCase()
        await sendTelegramMessage(chatId,
          `Salom! \u{1F511}\nSizning kirish kodingiz: *${displayCode}*\n\n` +
          `\u23F3 2 daqiqa ichida saytda kiriting.\n` +
          `Kod faqat sizga tegishli, boshqalarga bermang.`
        )
      } else {
        await sendTelegramMessage(chatId,
          `Salom! \u{1F44B}\nITSHOP autentifikatsiya botiga xush kelibsiz!\n\n` +
          `Saytda "Kirish" tugmasini bosing va Telegram orqali tizimga kiring.`
        )
      }
    } else if (text === '/help') {
      await sendTelegramMessage(chatId,
        `Buyruqlar:\n/start — Botni boshlash\n/help — Yordam`
      )
    } else {
      await sendTelegramMessage(chatId,
        `Iltimos, /start buyrug'ini bosing.`
      )
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: true })
  }
}

async function sendTelegramMessage(chatId: number, text: string) {
  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'Markdown',
    }),
  })
}
