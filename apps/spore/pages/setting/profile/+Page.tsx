import { useEffect, useState } from 'react'
import Record from '~/components/Record'
import SocialLink, { Links } from '~/components/SocialLink'
import logo from '@/assets/logo.svg'
import { Pencil, Plus } from 'lucide-react'
import EditBioDialog from '~/components/dialog/EditBioDialog'
import SocialDialog from '~/components/dialog/SocialDialog'
import AddressBoard from '~/components/AddressBoard'
import BackBrowser from '~/components/BackBrowser'
import { fetchAllRecords } from '~/utils/fetch'
import { RegistryRecord } from 'mycel-client-ts/mycel.resolver/rest'

export default function Page() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSocialOpen, setIsSocialOpen] = useState(false)
  const [socials, setSocials] = useState<Links[]>([])
  const [mycelRecords, setMycelRecords] = useState<
    RegistryRecord[] | undefined
  >(undefined)

  function addSocial(social: Links) {
    setSocials([...socials, social])
  }

  function removeSocial(id: string) {
    setSocials(socials.filter((social) => social.id !== id))
  }
  useEffect(() => {
    async function getRecords() {
      const fetchedRecords = await fetchAllRecords('shutanaka', 'cel')
      setMycelRecords(fetchedRecords)
      console.log('fetchedRecords', mycelRecords)
    }
    getRecords()
  }, [mycelRecords])

  return (
    <main className="h-full w-screen bg-light">
      <div className="xl:px-56 px-10 mb-5 xl:pt-12 py-5 flex justify-between">
        <BackBrowser />
        <button
          className="px-2 btn-solid bg-saffron text-lg items-center gap-2"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span>Edit</span>
          <Pencil />
        </button>
      </div>
      <div className="flex flex-col gap-4 justify-center mx-auto xl:px-56 px-10">
        <div className="flex lg:flex-row flex-col gap-4">
          <div className="w-1/3 items-center">
            <img
              src={logo}
              alt="avatar"
              className="md:w-48 md:h-48 w-40 h-40 rounded-full mx-auto p-1"
            />
          </div>
          <div className="w-2/3 flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <h1 className="lg:text-4xl text-2xl font-bold">mycel.id</h1>
              {/* TODO: should be passed proper value from previous page */}
              <AddressBoard
                address="mycel...kqww"
                className="bg-white rounded w-max p-2"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xl font-md">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
                dolores sunt accusantium consectetur iusto, explicabo ipsa atque
                perspiciatis error molestias voluptas ducimus quaerat nemo
                deleniti! Debitis magni sequi commodi repudiandae.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 w-full">
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
            {mycelRecords &&
              Object.values(mycelRecords).map((record, i) => {
                return (
                  <>
                    {record.walletRecord && (
                      <Record key={i} {...record.walletRecord} />
                    )}
                  </>
                )
              })}
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
