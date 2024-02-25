import { FullLayout } from '~/renderer/pageShell'

export default function Page({ is404 }: { is404: boolean }) {
  if (is404) {
    return (
      <FullLayout>
        <div className="flex items-center justify-center text-center h-screen">
          <div>
            <h1 className="font-title text-2xl my-10">404 Page Not Found</h1>
            <p>This page could not be found.</p>
          </div>
        </div>
      </FullLayout>
    )
  }
  return (
    <FullLayout>
      <div className="flex items-center justify-center text-center h-screen">
        <div>
          <h1 className="font-title text-2xl my-10">500 Internal Error</h1>
          <p>Something went wrong.</p>
        </div>
      </div>
    </FullLayout>
  )
}
