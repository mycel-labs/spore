import { BaseLayout } from '@/renderer/PageShell'
import SoonTm from '@/components/SoonTm'
import { ChevronRight } from 'lucide-react'

export default function Page() {
  return (
    <BaseLayout title="Contacts">
      <SoonTm className="opacity-50 bg-gray-300" />
      <ul className="opacity-50 bg-gray-300 border-t border-piano cursor-not-allowed">
        <li className="border-b border-piano flex items-center px-5 py-5">
          <div className="flex items-center content">
            <div className="flex-1 flex items-center content">
              <div className="rounded-full w-10 h-10 bg-lochmara mr-4" />A
            </div>
            <ChevronRight className="rounded-full border border-piano" />
          </div>
        </li>
        <li className="border-b border-piano flex items-center px-5 py-5">
          <div className="flex items-center content">
            <div className="flex-1 flex items-center content">
              <div className="rounded-full w-10 h-10 bg-lochmara mr-4" />B
            </div>
            <ChevronRight className="rounded-full border border-piano" />
          </div>
        </li>
      </ul>
    </BaseLayout>
  )
}
