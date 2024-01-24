import { FileStack, Pencil } from 'lucide-react'
import { useState } from 'react'
import BackBrowser from '~/components/BackBrowser'

export default function EditAddressRecord() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <main className="px-20 py-12 bg-smoke h-screen">
      <div className="px-10 mb-10">
        <BackBrowser />
      </div>
      <div className="px-10 flex flex-col">
        <h3 className="text-xl text-black font-semibold py-2 px-1 flex items-center border-b-2 border-black mb-4">
          <FileStack className="opacity-70 mr-2" size={24} />
          Records
        </h3>

        <div className="relative overflow-x-auto shadow-solid rounded">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Record Type
                </th>
                <th scope="col" className="px-6 py-3">
                  Value
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {mycelRecords &&
                Object.values(mycelRecords).map((record, i) => {
                  return (
                    <>
                      {record.walletRecord && (
                        <tr
                          key={`wallet-${i}`}
                          className="bg-white border-b  hover:bg-gray-50 "
                        >
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                          >
                            {record.walletRecord.walletRecordType}
                          </th>
                          <td className="px-6 py-4">
                            {record.walletRecord.value}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button
                              className="table-row px-2 h-10 w-10 btn-solid bg-saffron text-lg items-center gap-2"
                              onClick={() => setIsOpen((prev) => !prev)}
                            >
                              <Pencil />
                            </button>
                          </td>
                        </tr>
                      )}
                      {record.dnsRecord && (
                        <tr
                          key={`dns-${i}`}
                          className="bg-white border-b hover:bg-gray-50"
                        >
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                          >
                            {record.dnsRecord.dnsRecordType}
                          </th>
                          <td className="px-6 py-4">
                            {record.dnsRecord.value}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button
                              className="table-row px-2 h-10 w-10 btn-solid bg-saffron text-lg items-center gap-2"
                              onClick={() => setIsOpen((prev) => !prev)}
                            >
                              <Pencil />
                            </button>
                          </td>
                        </tr>
                      )}
                      {record.metadata && (
                        <tr
                          key={`dns-${i}`}
                          className="bg-white border-b  hover:bg-gray-50 "
                        >
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                          >
                            {record.metadata.key}
                          </th>
                          <td className="px-6 py-4">{record.metadata.value}</td>
                          <td className="px-6 py-4 text-right">
                            <button
                              className="table-row px-2 h-10 w-10 btn-solid bg-saffron text-lg items-center gap-2"
                              onClick={() => setIsOpen((prev) => !prev)}
                            >
                              <Pencil />
                            </button>
                          </td>
                        </tr>
                      )}
                    </>
                  )
                })}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}

// Mock mycelRecords
const mycelRecords = {
  1: {
    walletRecord: {
      walletRecordType: 'ETHEREUM_TESTNET_SEPOLIA',
      value: '0x06aa005386F53Ba7b980c61e0D067CaBc7602a62',
    },
    dnsRecord: {
      dnsRecordType: 'Type2',
      value: 'Value2',
    },
    metadata: {
      key: 'Key1',
      value: 'Value3',
    },
  },
  2: {
    walletRecord: {
      walletRecordType: 'ETHEREUM_TESTNET_SEPOLIA',
      value: '0x06aa005386F53Ba7b980c61e0D067CaBc7602a62',
    },
    dnsRecord: {
      dnsRecordType: 'Type4',
      value: 'Value5',
    },
    metadata: {
      key: 'Key2',
      value: 'Value6',
    },
  },
}
