import { RegistryWalletRecord } from 'mycel-client-ts/mycel.resolver/rest'
import AddressBoard from './AddressBoard'

export default function Record(props: RegistryWalletRecord) {
  return (
    <div className="mb-4">
      <p className=" text-base md:font-semibold font-medium">
        {props.walletRecordType}
      </p>
      <div className="bg-white shadow-solid border items-center p-3  rounded w-max">
        <AddressBoard address={props.value} />
      </div>
    </div>
  )
}
