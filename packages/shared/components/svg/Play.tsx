export default function Icon({ className = '' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      className={className}
      viewBox="0 0 12 12"
      fill="none"
    >
      <path
        fill="currentColor"
        d="M1 1H0v10h1V1zM1 0v1h2V0H1zM3 1v1h2V1H3zM5 2v1h2V2H5zM7 3v1h2V3H7zM9 4v1h2V4H9zM11 7h1V5h-1v2zM9 7v1h2V7H9zM7 8v1h2V8H7zM5 9v1h2V9H5zM3 10v1h2v-1H3zM1 11v1h2v-1H1z"
      />
    </svg>
  )
}
