import { ArrowLeft } from 'lucide-react'
function backBrowser() {
  if (confirm('Are you sure you want to go back?')) {
    window.history.back()
  } else {
    return
  }
}

export default function BackBrowser({ className }: { className?: string }) {
  return (
    <button
      className={`px-10 h-12 btn-solid bg-gray-100 text-lg items-center gap-2 ${className}`}
      onClick={() => backBrowser()}
    >
      <span>
        <ArrowLeft />
      </span>
      <span className="text-center font-semibold">Back</span>
    </button>
  )
}
