import { useState } from 'react'
import BaseDialog from './BaseDialog'
import { Dialog } from '@headlessui/react'
// ref: https://tailwindui.com/components/application-ui/forms/select-menus

import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { Network, Networks } from '~/lib/token/utils'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}
export default function EditRecordDialog({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}) {
  const [selected, setSelected] = useState('Address')
  const [selectedChain, setSelectedChain] = useState<Network>(Networks[0])
  const [address, setAddress] = useState('')

  async function addRecord() {
    if (address === '') {
      confirm('Please enter address')
      return
    }

    // TODO: add record
    // check if address is valid
    console.log('address', address, 'selectedChain', selectedChain)
    setIsOpen(false)
  }

  return (
    <BaseDialog isOpen={isOpen} setIsOpen={setIsOpen}>
      <Dialog.Title className="text-lg font-semibold">
        Add Address Record
      </Dialog.Title>
      {/* TODO: support DNS, other textRecord */}
      {/* <div className="inline-flex rounded-md shadow-sm">
        <button
          className={`px-4 py-2 text-sm font-semibold text-gray-400 bg-white border border-gray-200 rounded-l hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 ${
            selected === 'Address' && 'text-blue-700'
          }`}
          onClick={() => setSelected('Address')}
        >
          Address
        </button>
        <button
          className={`px-4 py-2 text-sm font-semibold text-gray-400 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 ${
            selected === 'DNS' && 'text-blue-700'
          }`}
          onClick={() => setSelected('DNS')}
        >
          DNS
        </button>
        <button
          className={`px-4 py-2 text-sm font-semibold text-gray-400 bg-white border border-gray-200 rounded-e hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 ${
            selected === 'Other' && 'text-blue-700'
          }`}
          onClick={() => setSelected('Other')}
        >
          Other
        </button>
      </div> */}

      {selected === 'Address' && (
        <div className="gap-4 flex flex-col mb-4">
          <div>
            <Listbox value={selectedChain} onChange={setSelectedChain}>
              {({ open }) => (
                <>
                  <Listbox.Label className=" mt-2 text-sm font-medium leading-6 text-gray-900">
                    Select Network
                  </Listbox.Label>
                  <div className="relative mt-2">
                    <Listbox.Button className="relative w-full rounded cursor-pointer bg-white px-2 h-12 py-2 pl-3 pr-10 text-left text-gray-900 shadow-solid ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                      <span className="flex items-center">
                        <img
                          src={selectedChain.icon}
                          alt="appLogo"
                          className="h-5 w-5 flex-shrink-0"
                        />
                        <span className="ml-3 block truncate">
                          {selectedChain.chainName}
                        </span>
                      </span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                        <ChevronsUpDown
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </Listbox.Button>

                    <Transition
                      show={open}
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {Networks.map((network) => (
                          <Listbox.Option
                            key={network.id}
                            className={({ active }) =>
                              classNames(
                                active
                                  ? 'bg-indigo-600 text-white'
                                  : 'text-gray-900',
                                'relative cursor-pointer select-none py-2 pl-3 pr-9'
                              )
                            }
                            value={network}
                          >
                            {({ selected, active }) => (
                              <>
                                <div className="flex items-center">
                                  <img
                                    src={network.icon}
                                    alt=""
                                    className="h-5 w-5 flex-shrink-0"
                                  />
                                  <span
                                    className={classNames(
                                      selected
                                        ? 'font-semibold'
                                        : 'font-normal',
                                      'ml-3 block truncate'
                                    )}
                                  >
                                    {network.chainName}
                                  </span>
                                </div>

                                {selected ? (
                                  <span
                                    className={classNames(
                                      active ? 'text-white' : 'text-indigo-600',
                                      'absolute inset-y-0 right-0 flex items-center pr-4'
                                    )}
                                  >
                                    <Check
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </>
              )}
            </Listbox>
          </div>
          <div>
            <input
              type="text"
              placeholder="Enter address"
              className="w-full h-12 border border-gray-200 rounded px-2 text-lg"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>
      )}

      <div className="flex flex-row justify-between">
        <button
          className="px-2 h-12 btn-solid bg-gray-100 text-lg items-center gap-2"
          onClick={() => setIsOpen(false)}
        >
          Cancel
        </button>
        <button
          className="px-2 h-12 btn-solid bg-samon text-lg items-center gap-2"
          onClick={() => addRecord()}
        >
          Confirm
        </button>
      </div>
    </BaseDialog>
  )
}
