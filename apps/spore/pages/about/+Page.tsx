import { BaseLayout } from '~/renderer/PageShell'
import ImgIntro from '@/assets/intro-spore.svg'
import Faq from '~/components/Faq'

export default function Page() {
  return (
    <BaseLayout>
      <div className="bg-light rounded-xl my-6">
        <h2 className="text-center text-3xl py-8 centerline">About</h2>
        <img src={ImgIntro} className="mx-auto max-w-80 pl-10 pr-5" />
        <div className="py-6">
          <Faq />
        </div>
      </div>
    </BaseLayout>
  )
}
