import BaseDialog from './BaseDialog'
import { Dialog } from '@headlessui/react'

export default function EditRecordDialog({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}) {
  return (
    <BaseDialog isOpen={isOpen} setIsOpen={setIsOpen}>
      <Dialog.Title className="text-lg font-semibold">
        Edit Profile
      </Dialog.Title>
      <div className="flex flex-row justify-between">
        <button
          className="px-2 h-12 btn-solid bg-gray-100 text-lg items-center gap-2"
          onClick={() => setIsOpen(false)}
        >
          Cancel
        </button>
        <button className="px-2 h-12 btn-solid bg-samon text-lg items-center gap-2">
          Save changes
        </button>
      </div>
    </BaseDialog>
  )
}
