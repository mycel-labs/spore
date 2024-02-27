import { createLazyFileRoute } from '@tanstack/react-router'
import ImgMashroom from '@/assets/mushroom.svg'
import ImgLogo from '@/assets/spore-logo.svg'
// import { FullLayout } from '~/renderer/PageShell'
import LoginDialog from '~/components/dialog/LoginDialog'
import Play from '@/components/svg/PlayFill'

export const Route = createLazyFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="min-h-screen">
      <div className="flex justify-between flex-col sm:max-w-2xl mx-auto min-h-screen">
        <div className="p-10">
          <img src={ImgLogo} />
        </div>
        <div className="-mt-36 text-center">
          <p className="font-title mb-2 text-xl font-bold uppercase">
            Press Start
          </p>
          <LoginDialog
            trigger={
              <button className="btn font-title text-xl bg-secondary mx-auto mb-6 pt-3 pb-2 pl-6 pr-8 flex items-center font-bold">
                <span className="btn-inner h-2/3 w-5/6" />
                <span className="transition animate-pulse mr-1.5 -mt-0.5">
                  <Play />
                </span>
                START
              </button>
            }
          />
        </div>
        <div className="bg-primary px-6 py-2 mb-6 text-center mx-auto font-title text-sm">
          Powered by{' '}
          <a href="https://mycel.domains" target="_blank" rel="noreferrer">
            Mycel
          </a>
        </div>
      </div>
      <div
        className="absolute bottom-0 w-full bg-bottom bg-repeat-x h-64 -z-10 text-sm"
        style={{ backgroundImage: `url(${ImgMashroom})` }}
      ></div>
    </div>
  )
}
