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
    </BaseDialog>
  )
}
