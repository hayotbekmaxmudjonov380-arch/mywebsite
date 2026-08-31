const BOT_TOKEN = '8843514458:AAF7O4edSgHXg0ULgIBmqv521n8lNOSu8y0'

async function setWebhook(webhookUrl: string) {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/setWebhook`
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url: webhookUrl, allowed_updates: ['message'] }),
  })
  const data = await res.json()
  console.log('Webhook result:', JSON.stringify(data, null, 2))
}

const url = process.argv[2]
if (!url) {
  console.error('Foydalanish: node scripts/set-webhook.js https://yourdomain.com/api/telegram/webhook')
  process.exit(1)
}
setWebhook(url)
