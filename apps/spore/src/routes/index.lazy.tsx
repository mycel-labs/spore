import { createLazyFileRoute } from '@tanstack/react-router'
import ImgMashroom from '@/assets/mushrooms.svg'
import ImgLogo from '@/assets/spore-logo.svg'
import ImgTopBg from '@/assets/topimage-bg.svg'
import ImgTopLogo from '@/assets/topimage-logo.svg'
import LoginDialog from '~/components/dialog/LoginDialog'
import Play from '@/components/svg/PlayFill'

export const Route = createLazyFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="min-h-screen">
      <div className="flex justify-around flex-col max-w-sm mx-auto min-h-screen pt-6 sm:pt-10 px-10 pb-36 z-10">
        <img src={ImgLogo} />
        <div className="relative py-2 sm:py-6">
          <img src={ImgTopBg} />
          <div className="absolute top-20 sm:top-24 mt-3 w-32 left-1/2 -translate-x-16">
            <img src={ImgTopLogo} className="animate-bounce-slow" />
          </div>
        </div>
        <LoginDialog
          trigger={
            <button className="btn font-title text-xl bg-secondary mx-auto mb-6 pt-3 pb-2 pl-6 pr-8 flex items-center font-bold z-20">
              <span className="btn-inner h-2/3 w-5/6" />
              <span className="transiton animate-pulse mr-1.5 -mt-0.5">
                <Play />
              </span>
              START
            </button>
          }
        />
      </div>
      <div className="fixed inset-x-0 bottom-4 flex items-center">
        <div className="bg-primary text-center font-title text-sm py-2 px-8 mx-auto w-auto">
          Powerd by{' '}
          <a href="https://mycel.domains" target="_blank" rel="noreferrer">
            Mycel
          </a>
        </div>
      </div>
      <div
        className="absolute bottom-0 w-full bg-bottom bg-repeat-x h-64 sm:h-80 -z-10 text-sm"
        style={{ backgroundImage: `url(${ImgMashroom})` }}
      ></div>
    </div>
  )
}
