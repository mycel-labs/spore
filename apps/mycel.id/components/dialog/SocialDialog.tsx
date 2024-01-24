import { useState } from 'react'
import SelectSocial from '../select/SelectSocial'
import BaseDialog from './BaseDialog'
import { Dialog } from '@headlessui/react'
import { Socials } from '~/lib/social/utils'
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
    if (username === '') return alert('Username cannot be empty')
    setSocials({ ...selected, id: username })
    setIsOpen(false)
  }
  function handleUsername(e: React.ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value)
  }
  return (
    <BaseDialog isOpen={isOpen} setIsOpen={setIsOpen}>
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
          <h2 className="text-sm font-semibold leading-6 text-gray-900">
            Link
          </h2>
          <div className="flex flex-row items-center rounded px-2 h-12 mb-2 bg-gray-100">
            <span className="rounded-l text-medium bg-gray-100">
              {selected.link}
            </span>
            <input
              type="text"
              placeholder="@username"
              onChange={handleUsername}
              className="w-full text-medium rounded-l p-1 bg-gray-100"
            />
          </div>
        </div>
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
      </div>
    </BaseDialog>
  )
}
