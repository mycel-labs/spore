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
        <img className="w-full h-[20vh]" src={ImgLogo} />
        <div className="relative h-[50vh] py-2 sm:py-6">
          <img className="w-full h-[30vh] " src={ImgTopBg} />
          <div className="absolute flex  justify-center items-center top-[8vh] left-1/2 transform -translate-x-1/2">
            <img src={ImgTopLogo} className="animate-bounce-slow w-[50%] h-auto max-h-[20vh]" />
          </div>
          <LoginDialog
            trigger={
              <button className="btn font-title text-xl bg-secondary mx-auto mt-5 mb-6 pt-3 pb-2 pl-6 pr-8 flex items-center font-bold z-20">
                <span className="btn-inner" />
                <span className="transiton animate-pulse mr-1.5 -mt-0.5">
                  <Play />
                </span>
                START
              </button>
            }
          />
        </div>
      </div>
      <div className="fixed inset-x-0 bottom-4 flex items-center">
        <div className="bg-primary text-center font-title text-sm py-2 px-8 mx-auto w-auto">
          Powerd by{' '}
          <a href="https://mycel.land" target="_blank" rel="noreferrer">
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
