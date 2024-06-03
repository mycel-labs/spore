import { createLazyFileRoute } from '@tanstack/react-router'
import ImgIntro from '@/assets/intro-spore.svg'

export const Route = createLazyFileRoute('/_app/mint')({
  component: About,
})

function About() {
  return (
    <div className="py-8 space-y-8">
      <div className="bg-light overlay-dot-ll rounded-xl">
        <h2 className="text-center text-3xl font-bold py-8 centerline">Mint</h2>
      </div>
    </div>
  )
}
