export default function Loading() {
  return (
    <div className="fixed top-0 right-0 left-0 bottom-0 grid place-content-center bg-primary/80 overlay-dot z-50 backdrop-blur">
      <h2 className="font-title text-4xl uppercase font-bold animate-pulse">
        Now Loading ...
      </h2>
    </div>
  )
}
