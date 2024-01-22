import Record, { RecordProps } from '~/components/Record'
import SocialLink, { Links } from '~/components/SocialLink'
import { BaseLayout } from '~/renderer/PageShell'
import logo from '@/assets/logo.svg'

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
      <div className="md:grid md:grid-cols-12 justify-center p-10">
        <div className="md:col-span-4 p-10 flex flex-col gap-4">
          <img
            width={500}
            height={500}
            src="https://picsum.photos/500/500"
            alt="avatar"
            className="w-48 h-48 rounded-full"
          />
          <h1 className="text-4xl font-bold">user.cel</h1>
          <div className="">
            <p className="bg-gray-200 rounded w-max p-1 text-xl font-md">
              {'mycel123...456'}
            </p>
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
        <div className="flex flex-col col-span-8 p-10 gap-4">
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
