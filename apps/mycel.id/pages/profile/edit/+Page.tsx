import { useEffect, useState } from 'react'
import Record, { RecordProps } from '~/components/Record'
import SocialLink, { Links } from '~/components/SocialLink'
import logo from '@/assets/logo.svg'
import { ArrowLeft, Pencil, Plus } from 'lucide-react'
import EditBioDialog from '~/components/dialog/EditBioDialog'
import SocialDialog from '~/components/dialog/SocialDialog'
import AddressBoard from '~/components/AddressBoard'
import { useAllRecords } from '../../../../../packages/shared/hooks/useMycel'
import BackBrowser from '~/components/BackBrowser'

const mockRecords: RecordProps[] = [
  {
    recordType: 'Ethereum Mainnet',
    value: '0x06aa005386F53Ba7b980c61e0D067CaBc7602a62',
  },
  {
    recordType: 'Optimism',
    value: '0x06aa005386F53Ba7b980c61e0D067CaBc7602a62',
  },
  {
    recordType: 'Arbitrum',
    value: '0x06aa005386F53Ba7b980c61e0D067CaBc7602a62',
  },
]

export default function Page() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSocialOpen, setIsSocialOpen] = useState(false)
  const [socials, setSocials] = useState<Links[]>([])

  function addSocial(social: Links) {
    setSocials([...socials, social])
  }
  // const socials = MockSocials
  function removeSocial(id: string) {
    setSocials(socials.filter((social) => social.id !== id))
  }

  const { data: records } = useAllRecords({
    name: 'shutanaka',
    parent: 'cel',
  })
  console.log('Records: ', records)

  return (
    <main className="md:px-20 md:py-12 h-screen bg-smoke">
      <div className="px-10 mb-5">
        <BackBrowser />
      </div>
      <div className="md:grid md:grid-cols-12 flex flex-col gap-4">
        <div className="md:col-span-4 px-10 flex flex-col gap-4">
          <div className="flex flex-row justify-between">
            <img
              src={logo}
              alt="avatar"
              className="md:w-48 md:h-48 w-40 h-40 rounded-full"
            />
          </div>
          {/* TODO: should be passed proper value from previous page */}
          <h1 className="text-4xl font-bold">mycel.id</h1>
          <div className=" bg-white rounded w-max p-2 justify-between">
            <AddressBoard address="mycel...kqww" />
          </div>
          <div>
            <div className="flex flex-row items-center justify-between">
              <p className="text-xl font-bold">Bio</p>
              <button
                className="px-2 h-10 w-10 btn-solid bg-saffron text-lg items-center gap-2"
                onClick={() => setIsOpen((prev) => !prev)}
              >
                {/* <span className="flex-1 text-center">Edit</span> */}
                <Pencil />
              </button>
            </div>
            <p className="text-xl font-md">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
              dolores sunt accusantium consectetur iusto, explicabo ipsa atque
              perspiciatis error molestias voluptas ducimus quaerat nemo
              deleniti! Debitis magni sequi commodi repudiandae.
            </p>
          </div>
        </div>
        <div className="flex flex-col col-span-8 px-10 gap-4">
          <div>
            <h1 className="text-xl font-bold mb-2">Social Links</h1>
            <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
              {socials.map((social, index) => (
                <SocialLink
                  key={index}
                  Link={social}
                  removeSocial={removeSocial}
                />
              ))}
              <div
                className="bg-gray-200 flex items-center h-36 w-36 cursor-pointer"
                onClick={() => setIsSocialOpen((prev) => !prev)}
              >
                <Plus className="mx-auto" />
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold mb-2">Records</h1>
            {mockRecords.map((record, index) => (
              <Record key={index} {...record} />
            ))}
          </div>
        </div>
      </div>
      {isOpen && <EditBioDialog isOpen={isOpen} setIsOpen={setIsOpen} />}
      {isSocialOpen && (
        <SocialDialog
          isOpen={isSocialOpen}
          setIsOpen={setIsSocialOpen}
          setSocials={addSocial}
        />
      )}
    </main>
  )
}
