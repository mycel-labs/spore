export default function Maintenance() {
  return (
    <div className="p-4">
      <div className="text-center text-2xl font-extrabold m-4">
        <p className="pb-4">🚧 Temporary Maintenance 🚧</p>
        <p className="text-xl mt-4">
          We&apos;re currently upgrading this feature to serve you better.
        </p>
        <p className="text-xl mt-4">Thank you for your patience!</p>
        <p className="text-base mt-4">
          For the latest updates, follow us on{' '}
          <a
            href="https://x.com/mycelmycel"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            X (Twitter)
          </a>{' '}
          or join our{' '}
          <a
            href="https://discord.com/invite/mycelland"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Discord
          </a>{' '}
          community.
        </p>
      </div>
    </div>
  )
}
