import ImgMap from '@/assets/spore-map.svg'

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen max-w-screen-sm mx-auto p-10 font-title font-bold">
      <div className="text-center">
        <h1 className="text-4xl mb-10">Not Found</h1>
        <img src={ImgMap} />
        <a href="/" className="text-xl block mt-6">
          Go TOP ↑
        </a>
      </div>
    </div>
  )
}
