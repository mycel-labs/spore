import { FileStack, Pencil } from 'lucide-react'
import { useState } from 'react'
import BackBrowser from '~/components/BackBrowser'
import EditRecordDialog from '~/components/dialog/EditRecordDialog'
import UpdateRecordDialog from '~/components/dialog/UpdateRecordDialog'

export default function EditAddressRecord() {
  const [isOpen, setIsOpen] = useState(false)
  const [isUpdateRecordOpen, setIsUpdateRecordOpen] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState(undefined)
  function handleClick(record: any) {
    setIsUpdateRecordOpen(true)
    setSelectedRecord(record)
  }
  return (
    <main className="px-20 py-12 bg-smoke h-screen">
      <div className="px-10 mb-10">
        <BackBrowser />
      </div>
      <div className="px-10 flex flex-col">
        <div className="items-center border-b-2 border-black mb-4 flex justify-between flex-row">
          <div className="flex flex-row items-center py-2">
            <FileStack className="opacity-70 mr-2" size={24} />
            <h3 className="text-xl text-black font-semibold">Records</h3>
          </div>
          <span className="py-2">
            <button
              className="p-2 btn-solid bg-samon text-lg items-center gap-2"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <span className="flex-1 text-center text-lg font-semibold">
                Add Records
              </span>
              <Pencil />
            </button>
          </span>
        </div>
        <div className="relative overflow-x-auto shadow-solid border rounded">
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
                              className=" px-2 h-10 w-10 btn-solid bg-saffron text-lg items-center gap-2"
                              onClick={() => handleClick(record.walletRecord)}
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
                              className=" px-2 h-10 w-10 btn-solid bg-saffron text-lg items-center gap-2"
                              onClick={() => handleClick(record.dnsRecord)}
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
                              className=" px-2 h-10 w-10 btn-solid bg-saffron text-lg items-center gap-2"
                              onClick={() => handleClick(record.metadata)}
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
        {isUpdateRecordOpen && (
          <UpdateRecordDialog
            isOpen={isUpdateRecordOpen}
            setIsOpen={setIsUpdateRecordOpen}
            record={selectedRecord}
          />
        )}
        {isOpen && <EditRecordDialog isOpen={isOpen} setIsOpen={setIsOpen} />}
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
  },
}
