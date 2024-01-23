import { Dialog } from '@headlessui/react'

type DialogProps = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  children: React.ReactNode
}

export default function BaseDialog({
  isOpen,
  setIsOpen,
  children,
}: DialogProps) {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-xl rounded bg-white p-4 gap-2">
          {children}
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}
