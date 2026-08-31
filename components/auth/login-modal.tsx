'use client'

import { useEffect, useRef, useState } from 'react'
import { X, Loader2, CheckCircle, ExternalLink, LogOut } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { useLanguage } from '@/lib/language-context'
import { useTheme } from '@/lib/theme-context'

const CODE_LENGTH = 4

export function LoginModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { user, login, logout } = useAuth()
  const { t } = useLanguage()
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [step, setStep] = useState<'idle' | 'waiting' | 'code' | 'verifying' | 'error' | 'success' | 'logged'>
    (user ? 'logged' : 'idle')
  const [codeInput, setCodeInput] = useState('')
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (user) setStep('logged')
    else setStep('idle')
  }, [user])

  useEffect(() => {
    if (step === 'code' && inputRef.current) {
      inputRef.current.focus()
    }
  }, [step])

  if (!open) return null

  const handleStart = async () => {
    setStep('waiting')
    try {
      const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
      let code = ''
      for (let i = 0; i < CODE_LENGTH; i++) {
        code += chars[Math.floor(Math.random() * chars.length)]
      }

      const telegramUrl = `https://t.me/itshopuzbot?start=${code}`
      window.open(telegramUrl, '_blank')

      await fetch('/api/auth/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ telegramUserId: 0, telegramUsername: 'pending', telegramFirstName: 'Foydalanuvchi' }),
      })

      setTimeout(() => setStep('code'), 2000)
    } catch {
      setError('Serverga ulanib bo\'lmadi')
      setStep('error')
      setTimeout(() => setStep('idle'), 2000)
    }
  }

  const handleLogout = async () => {
    await logout()
    setStep('idle')
    setCodeInput('')
  }

  const handleInputChange = (val: string) => {
    const upper = val.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, CODE_LENGTH)
    setCodeInput(upper)
    if (upper.length === CODE_LENGTH) {
      setTimeout(() => {
        setStep('verifying')
        login(upper).then((result) => {
          if (result.ok) {
            setStep('success')
            setTimeout(() => {
              onClose()
              setStep('idle')
              setCodeInput('')
            }, 1500)
          } else {
            setError(result.error || 'Noto\'g\'ri kod')
            setStep('error')
            setCodeInput('')
            setTimeout(() => setStep('code'), 1500)
          }
        })
      }, 300)
    }
  }

  const bgClass = isDark ? 'bg-[#0d0d0d]' : 'bg-white'
  const borderClass = isDark ? 'border-white/10' : 'border-black/10'
  const textClass = isDark ? 'text-white' : 'text-[#1d1d1f]'
  const subtextClass = isDark ? 'text-gray-400' : 'text-gray-500'
  const inputBgClass = isDark ? 'bg-white/5 border-white/10 text-white placeholder:text-gray-600' : 'bg-gray-50 border-black/10 text-[#1d1d1f] placeholder:text-gray-400'

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className={`relative w-full max-w-sm rounded-2xl border p-6 sm:p-8 ${bgClass} ${borderClass} shadow-2xl`}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className={`absolute right-3 top-3 p-1.5 rounded-lg transition-colors ${isDark ? 'text-gray-500 hover:text-white hover:bg-white/10' : 'text-gray-400 hover:text-black hover:bg-black/5'}`}>
          <X size={18} />
        </button>

        {step === 'logged' && user ? (
          <div className="text-center">
            <div className={`mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full ${isDark ? 'bg-[#6d8dff]/10' : 'bg-[#0071e3]/10'}`}>
              <CheckCircle size={28} className={isDark ? 'text-[#6d8dff]' : 'text-[#0071e3]'} />
            </div>
            <p className={`text-xs uppercase tracking-widest ${subtextClass}`}>Telegram</p>
            <p className={`mt-2 text-lg font-medium ${textClass}`}>
              {user.telegramFirstName}
            </p>
            <p className={`mt-1 text-sm ${subtextClass}`}>
              @{user.telegramUsername}
            </p>
            <button
              onClick={handleLogout}
              className={`mt-6 flex items-center gap-2 mx-auto rounded-xl px-5 py-2.5 text-xs font-medium uppercase tracking-wider transition-colors ${isDark ? 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10' : 'bg-gray-100 text-gray-500 hover:bg-gray-200 text-[#1d1d1f] border border-black/10'}`}
            >
              <LogOut size={14} /> Chiqish
            </button>
          </div>
        ) : step === 'idle' ? (
          <div className="text-center">
            <p className={`text-xs uppercase tracking-widest ${subtextClass}`}>Kirish</p>
            <h2 className={`mt-3 text-xl font-semibold tracking-tight ${textClass}`}>Telegram bilan kiring</h2>
            <p className={`mt-3 text-sm leading-relaxed ${subtextClass}`}>
              Telegram bot orqali maxsus kod oling va saytga kiring
            </p>
            <button
              onClick={handleStart}
              className={`mt-6 flex items-center gap-2.5 mx-auto rounded-xl px-6 py-3 text-sm font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] ${isDark ? 'bg-[#6d8dff] text-white hover:bg-[#5a7af0]' : 'bg-[#0071e3] text-white hover:bg-[#0077ED]'}`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" /></svg>
              Botga o&apos;tish
              <ExternalLink size={14} />
            </button>
            <div className={`mt-5 flex items-center gap-2 text-xs ${subtextClass}`}>
              <div className={`h-px flex-1 ${isDark ? 'bg-white/10' : 'bg-black/10'}`} />
              <span>2 daqiqalik kod</span>
              <div className={`h-px flex-1 ${isDark ? 'bg-white/10' : 'bg-black/10'}`} />
            </div>
          </div>
        ) : step === 'waiting' ? (
          <div className="text-center">
            <div className={`mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 ${isDark ? 'border-[#6d8dff] border-t-transparent' : 'border-[#0071e3] border-t-transparent'}`} />
            <p className={`text-sm ${textClass}`}>Telegram ochilmoqda...</p>
            <p className={`mt-2 text-xs ${subtextClass}`}>Botga /start bosing</p>
          </div>
        ) : step === 'code' ? (
          <div className="text-center">
            <p className={`text-xs uppercase tracking-widest ${subtextClass}`}>Kodni kiriting</p>
            <h2 className={`mt-3 text-lg font-semibold tracking-tight ${textClass}`}>4 ta belgili kod</h2>
            <p className={`mt-2 text-sm ${subtextClass}`}>Telegramdan olgan kodingizni kiriting</p>
            <div className="mt-6 flex justify-center gap-3">
              {Array.from({ length: CODE_LENGTH }).map((_, i) => (
                <div
                  key={i}
                  onClick={() => inputRef.current?.focus()}
                  className={`h-14 w-11 rounded-xl border-2 text-center text-xl font-bold flex items-center justify-center transition-all cursor-pointer ${codeInput[i]
                    ? isDark ? 'border-[#6d8dff] bg-[#6d8dff]/10 text-white' : 'border-[#0071e3] bg-[#0071e3]/10 text-[#0071e3]'
                    : isDark ? 'border-white/10 bg-white/5 text-gray-600' : 'border-black/10 bg-gray-50 text-gray-300'
                  }`}
                >
                  {codeInput[i] || ''}
                </div>
              ))}
            </div>
            <input
              ref={inputRef}
              type="text"
              value={codeInput}
              onChange={(e) => handleInputChange(e.target.value)}
              className={`mt-4 w-full rounded-xl border px-4 py-3 text-center text-lg font-mono tracking-[0.3em] outline-none transition-all ${inputBgClass}`}
              placeholder="XXXX"
              maxLength={CODE_LENGTH}
              autoFocus
            />
            <p className={`mt-3 text-xs ${subtextClass}`}>Kodni yuqoridagi maydonga kiriting</p>
          </div>
        ) : step === 'verifying' ? (
          <div className="text-center">
            <Loader2 size={32} className={`mx-auto mb-3 animate-spin ${isDark ? 'text-[#6d8dff]' : 'text-[#0071e3]'}`} />
            <p className={`text-sm ${textClass}`}>Tekshirilmoqda...</p>
          </div>
        ) : step === 'error' ? (
          <div className="text-center">
            <p className="text-sm text-red-500">{error}</p>
            <p className={`mt-2 text-xs ${subtextClass}`}>Qaytadan urinib ko'ring</p>
          </div>
        ) : step === 'success' ? (
          <div className="text-center">
            <CheckCircle size={32} className={`mx-auto mb-3 ${isDark ? 'text-green-400' : 'text-green-500'}`} />
            <p className={`text-sm font-medium ${textClass}`}>Muvaffaqiyatli kirdingiz!</p>
          </div>
        ) : null}
      </div>
    </div>
  )
}
