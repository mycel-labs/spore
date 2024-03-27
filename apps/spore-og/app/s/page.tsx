import { redirect } from 'next/navigation'
import type { Metadata, ResolvingMetadata } from 'next'

type Props = {
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    openGraph: {
      images: [
        searchParams.ref
          ? `/api/og?ref=${searchParams.ref}`
          : 'https://spore.ooo/og.png',
      ],
    },
  }
}

export default function Page({ searchParams }: Props) {
  // if (!searchParams.ref) {
  //   redirect(`https://spore.ooo`)
  // } else {
  //   redirect(`https://spore.ooo?ref=${searchParams.ref}`)
  // }
}
