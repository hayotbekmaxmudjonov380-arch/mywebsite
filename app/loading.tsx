import { Loader2 } from 'lucide-react'

export default function Loading() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <Loader2 size={32} className="animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Yuklanmoqda...</p>
      </div>
    </main>
  )
}
