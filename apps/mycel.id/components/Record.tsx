import { RegistryWalletRecord } from 'mycel-client-ts/mycel.resolver/rest'
import AddressBoard from './AddressBoard'

export default function Record(props: RegistryWalletRecord) {
  console.log('props', props)
  return (
    <div className="bg-white shadow-solid border flex md:flex-row flex-col justify-between items-center gap-2 p-3 mb-4 rounded ">
      <p className="text-lg font-semibold">{props.walletRecordType}</p>
      <AddressBoard address={props.value} />
    </div>
  )
}
