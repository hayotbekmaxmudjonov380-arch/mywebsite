import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <p className="font-mono text-[10px] uppercase tracking-[.25em] text-[#6d8dff]">404</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[#1d1d1f]">Sahifa topilmadi</h1>
      <p className="mt-3 max-w-sm text-sm text-gray-500">
        Siz qidirgan sahifa mavjud emas yoki o&apos;chirilgan.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#0071e3] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#0077ED]"
      >
        Bosh sahifaga qaytish
      </Link>
    </main>
  )
}
