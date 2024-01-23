import BaseDialog from './BaseDialog'
import { Dialog } from '@headlessui/react'

export default function EditBioDialog({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}) {
  return (
    <BaseDialog isOpen={isOpen} setIsOpen={setIsOpen}>
      <Dialog.Title className="text-lg font-semibold">Edit Bio</Dialog.Title>
      <div className="flex flex-row justify-between">
        <button
          className="px-2 h-12 btn-solid bg-gray-100 text-lg items-center gap-2"
          onClick={() => setIsOpen(false)}
        >
          Cancel
        </button>
        <button
          className="px-2 h-12 btn-solid bg-samon text-lg items-center gap-2"
          // onClick={() => handleClick()}
        >
          Confirm
        </button>
      </div>
    </BaseDialog>
  )
}
