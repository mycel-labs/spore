export default function TitleBar({ title }: { title?: string }) {
  return (
    <nav className="fixed top-0 w-full border-b-2 border-text h-8 bg-light z-50">
      <div className="bg-line w-full">
        <h1 className="bg-light px-4 font-title mx-auto">{title ?? 'SPORE'}</h1>
      </div>
    </nav>
  )
}
