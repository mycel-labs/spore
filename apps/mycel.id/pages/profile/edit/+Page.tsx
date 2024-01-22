import Record, { RecordProps } from '~/components/Record'
import SocialLink, { Links } from '~/components/SocialLink'
import { BaseLayout } from '~/renderer/PageShell'
import logo from '@/assets/logo.svg'
import { Copy, Pencil } from 'lucide-react'

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
const mockSocialLinks: Links[] = [
  {
    link: 'https://github.com/mycel-domain',
    icon: logo,
    app: 'mycel.id',
    id: 'user.cel',
  },
  {
    link: 'https://github.com/mycel-domain',
    icon: logo,
    app: 'mycel.id',
    id: 'user.cel',
  },
  {
    link: 'https://github.com/mycel-domain',
    icon: logo,
    app: 'mycel.id',
    id: 'user.cel',
  },
  {
    link: 'https://github.com/mycel-domain',
    icon: logo,
    app: 'mycel.id',
    id: 'user.cel',
  },
]

export default function Page() {
  return (
    <BaseLayout title="Edit Profile">
      <div className="md:grid md:grid-cols-12 flex flex-col gap-4 md:p-10 mt-4">
        <div className="md:col-span-4 px-10 flex flex-col gap-4">
          <div className="flex flex-row justify-between">
            <img
              src={logo}
              alt="avatar"
              className="md:w-48 md:h-48 w-40 h-40 rounded-full"
            />
            <div className="flex md:justify-end justify-center">
              <button className="px-2 h-12 btn-solid bg-samon text-lg items-center gap-2">
                <span className="flex-1 text-center">Edit</span>
                <Pencil />
              </button>
            </div>
          </div>
          <h1 className="text-4xl font-bold">user.cel</h1>
          <div className="flex flex-row  items-center bg-gray-200 rounded w-max p-1 justify-between">
            <p className="text-lg font-semibold">{'mycel123...456'}</p>
            <Copy className="w-10 cursor-pointer" />
          </div>
          <div>
            <p className="text-xl font-bold mb-1">Bio</p>
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
              {mockSocialLinks.map((link, index) => (
                <SocialLink key={index} {...link} />
              ))}
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
    </BaseLayout>
  )
}
