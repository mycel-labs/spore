import { Copy } from 'lucide-react'
export type RecordProps = {
  recordType: string
  value: string
}
export default function Record(props: RecordProps) {
  return (
    <div className="bg-gray-200 flex md:flex-row flex-col justify-between items-center gap-2 w-max p-2 mb-2">
      <p className="text-lg font-semibold">{props.recordType}</p>
      <div className="flex flex-row">
        <p className="w-max">{props.value}</p>
        {/* TODO: copy to clipboard */}
        <Copy className="w-10 cursor-pointer" />
      </div>
    </div>
  )
}
