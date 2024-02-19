import { copyClipboard } from '@/lib/utils'
import { Copy } from 'lucide-react'
interface Props {
  address: string
  className?: string
}
// TODO: should manage sliced address and actual address
export default function AddressBoard({ address, className }: Props) {
  return (
    <div className={`flex flex-row ${className}`}>
      <p className="w-max text-right font-medium md:text-lg text-sm">
        {address}
      </p>
      <Copy
        className="w-10 cursor-pointer"
        onClick={() => copyClipboard(address)}
      />
    </div>
  )
}
