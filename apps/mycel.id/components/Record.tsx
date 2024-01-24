import { Copy } from 'lucide-react'
import AddressBoard from './AddressBoard'

export type RecordProps = {
  recordType: string
  value: string
}
export default function Record(props: RecordProps) {
  return (
    <div className="bg-white shadow-solid border flex md:flex-row flex-col justify-between items-center gap-2 p-3 mb-4 rounded ">
      <p className="text-lg font-semibold">{props.recordType}</p>
      <AddressBoard address={props.value} />
    </div>
  )
}
