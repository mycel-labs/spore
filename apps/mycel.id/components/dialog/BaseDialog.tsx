import { Dialog } from '@headlessui/react'

type DialogProps = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  children: React.ReactNode
  handleClick: () => void
}

export default function BaseDialog({
  isOpen,
  setIsOpen,
  children,
  handleClick,
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
          <div className="flex flex-row justify-between">
            <button
              className="px-2 h-12 btn-solid bg-gray-100 text-lg items-center gap-2"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
            <button
              className="px-2 h-12 btn-solid bg-samon text-lg items-center gap-2"
              onClick={() => handleClick()}
            >
              Confirm
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}
