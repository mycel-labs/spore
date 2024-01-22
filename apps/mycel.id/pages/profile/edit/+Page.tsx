import SocialLink from '@/components/SocialLink'
import { BaseLayout } from '@/renderer/PageShell'

export default function Page() {
  return (
    <BaseLayout title="Edit Profile">
      <div className="md:grid md:grid-cols-12 justify-center p-10">
        <div className="md:col-span-4 p-10 flex flex-col gap-2">
          <img
            width={500}
            height={500}
            src="https://picsum.photos/500/500"
            alt="avatar"
            className="w-48 h-48 rounded-full"
          />
          <h1 className="text-4xl font-bold">user.cel</h1>
        </div>
        <div className=" col-span-8 p-10 gap-4">
          <h1 className="text-xl font-bold">Links</h1>
          <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
            <SocialLink></SocialLink>
            <SocialLink></SocialLink>
            <SocialLink></SocialLink>
            <SocialLink></SocialLink>
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}
