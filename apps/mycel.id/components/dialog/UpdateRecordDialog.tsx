import React, { useState } from 'react'
import BaseDialog from './BaseDialog'
import { Dialog } from '@headlessui/react'
import { RegistryRecord } from 'mycel-client-ts/mycel.resolver/rest'

export interface EditRecordDialogProps {
  records: Record<string, RegistryRecord> | undefined
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export default function EditRecordDialog(props: EditRecordDialogProps) {
  const [newRecord, setNewRecord] = useState('')
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewRecord(e.target.value)
  }
  // TODO: update record
  // check if address is valid
  async function updateRecord() {
    if (newRecord === '') {
      confirm('Please enter new record')
      return
    }
    console.log('newRecord', newRecord)
  }

  return (
    <BaseDialog isOpen={props.isOpen} setIsOpen={props.setIsOpen}>
      <Dialog.Title className="text-lg font-semibold">
        Update Record
      </Dialog.Title>

      <div className="flex flex-col gap-4 mb-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-900">
            Current record
          </label>
          <input
            type="text"
            className="px-2 h-12 btn-solid bg-gray-100 text-lg items-center gap-2"
            value={props.records?.value as string}
            disabled
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-900">
            New record
          </label>
          <input
            type="text"
            className="px-2 h-12 btn-solid bg-gray-100 text-lg items-center gap-2"
            value={newRecord}
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <button
          className="px-2 h-12 btn-solid bg-gray-100 text-lg items-center gap-2"
          onClick={() => props.setIsOpen(false)}
        >
          Cancel
        </button>
        <button
          className="px-2 h-12 btn-solid bg-samon text-lg items-center gap-2"
          onClick={() => updateRecord()}
        >
          Confirm
        </button>
      </div>
    </BaseDialog>
  )
}
