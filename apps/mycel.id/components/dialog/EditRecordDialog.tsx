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
    </BaseDialog>
  )
}
