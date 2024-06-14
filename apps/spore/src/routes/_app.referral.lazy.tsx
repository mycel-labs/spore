import { createLazyFileRoute } from '@tanstack/react-router'
import { toast } from '@/components/ui/sonner'
import {
  useGetUser,
  useGetReferralCodeByIssuerUserId,
} from '@/hooks/useReferral'
import { copyClipboard } from '@/lib/utils'
import { User, ReferralCode } from '@/types/referral'
import { SPORE_SHARE_URL } from '@/constants/spore'
import { useStore } from '@/store'
import { ClipboardCopy } from 'lucide-react'
import LoaderCircle from '~/components/LoaderCircle'

export const Route = createLazyFileRoute('/_app/referral')({
  component: Referral,
})

function Referral() {
  const mycelName = useStore((state) => state.mycelName)
  const user = useGetUser(mycelName || '')
  const invitedUserCount =
    !user.isLoading && user.data
      ? (user.data.data as { user: User })?.user?.invitedUserCount
      : 0

  const refCode = useGetReferralCodeByIssuerUserId(mycelName || '')
  const codes =
    !refCode.isLoading && refCode.data
      ? (refCode.data.data?.referralCodes as ReferralCode[])
      : []
  const code = codes ? codes.find((c) => c.active)?.id : 'NOT_FOUND'
  const referralUrl: string = `${SPORE_SHARE_URL}?ref=${code}`

  return (
    <div className="py-8 space-y-8">
      <div className="bg-light overlay-dot-ll rounded-xl pb-8">
        <div className="bg-light rounded-xl">
          <h2 className="centerline text-3xl font-bold py-8">Referral</h2>
        </div>
        <ul className="list-table bg-light mx-4 sm:mx-6">
          <li>
            <div className="header">Invited friends</div>
            <div className="text-right text-3xl font-bold">
              {invitedUserCount}
            </div>
          </li>
          <li>
            <div className="header">Points</div>
            <div className="text-right text-3xl font-bold">
              {invitedUserCount}
            </div>
          </li>
        </ul>
        <div className="px-6 mb-2 mt-8">
          {refCode.isLoading ? (
            <div className="py-4">
              <LoaderCircle />
            </div>
          ) : (
            <input
              type="text"
              value={referralUrl}
              readOnly
              className="w-full font-lg font-title"
            />
          )}
          <button
            className="btn bg-secondary h-14 px-10 font-bold font-title w-full mt-4"
            onClick={() => {
              copyClipboard(referralUrl)
              toast('URL Copied!')
            }}
          >
            <span className="btn-inner" />
            <ClipboardCopy size={28} strokeWidth={3} className="mr-2" />
            Copy referral url
          </button>
        </div>
      </div>
    </div>
  )
}
