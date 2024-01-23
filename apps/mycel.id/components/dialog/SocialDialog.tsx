import { useState } from 'react'
import SelectSocial from '../select/SelectSocial'
import BaseDialog from './BaseDialog'
import { Dialog } from '@headlessui/react'
import { Socials } from '~/public/Socials'
import { Links } from '../SocialLink'

export default function SocialDialog({
  isOpen,
  setIsOpen,
  setSocials,
}: {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  setSocials: (socials: Links) => void
}) {
  const [selected, setSelected] = useState(Socials[0])
  const [username, setUsername] = useState('')
  function handleClick() {
    setSocials({ ...selected, id: username })
    setIsOpen(false)
  }
  function handleUsername(e: React.ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value)
  }
  return (
    <BaseDialog isOpen={isOpen} setIsOpen={setIsOpen} handleClick={handleClick}>
      <div className="flex flex-col gap-2">
        <Dialog.Title className="text-lg font-semibold">
          Add Social Link
        </Dialog.Title>
        <div className="mb-2 gap-2 flex flex-col">
          <div>
            <SelectSocial
              selected={selected}
              setSelected={setSelected}
              Socials={Socials}
            />
          </div>
          <h2 className="text-sm font-medium leading-6 text-gray-900">Link</h2>
          <div className="flex flex-row items-center rounded mb-2">
            <span className="px-2 py-1 bg-gray-100 rounded-l text-sm">
              {selected.link}
            </span>
            <input
              type="text"
              placeholder="@username"
              onChange={handleUsername}
              className="w-full text-sm bg-gray-100 rounded-l px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>
    </BaseDialog>
  )
}
