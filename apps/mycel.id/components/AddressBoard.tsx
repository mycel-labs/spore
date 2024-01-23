import { copyClipboard } from '@/lib/utils'
import { Copy } from 'lucide-react'
// TODO: should manage sliced address and actual address
export default function AddressBoard({ address }: { address: string }) {
  return (
    <div className="flex flex-row">
      <p className="w-max">{address}</p>
      {/* TODO: copy to clipboard */}
      <Copy
        className="w-10 cursor-pointer"
        onClick={() => copyClipboard(address)}
      />
    </div>
  )
}
