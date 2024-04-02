import { useState } from 'react'
import { toast } from '@/components/ui/sonner'
import Button from '~/components/Button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useStore } from '@/store'
import { useCreateUser } from '@/hooks/useReferral'
import { useWallet } from '@/hooks/useWallet'
import { getReferralSig } from '@/lib/wallets'
import { useQuery, useMutation } from '@tanstack/react-query'
import { callFn } from '@/lib/firebase'

const refSchema = z.object({
  // TODO: update with server validation
  refCode: z.string().min(1).max(48),
})

export default function CelNameForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const refCode = useStore((state) => state.refCode)
  const updateRefCode = useStore((state) => state.updateRefCode)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(refSchema),
    defaultValues: {
      refCode: refCode ?? '',
    },
  })
  const { mycelAccount, mycelOfflineSigner } = useWallet()

  const { data, status, error, mutateAsync } = useMutation({
    mutationKey: ['muataionCreateUser', 'aaaa.cel'],
    mutationFn: async ({
      code,
      signature,
    }: {
      code: string
      signature: string
    }) => {
      const res = await callFn({
        code,
        uid: 'aaaa.cel',
        address: mycelAccount.address,
        signature,
      })
      return res.data
    },
  })

  console.log(':::', data, status)

  const onSubmit = async (data: { refCode: string }) => {
    setIsLoading(true)
    try {
      const signature = await mycelOfflineSigner?.signDirect(
        mycelAccount.address,
        getReferralSig(mycelAccount.address, 'aaaa.cel')
      )
      console.log('data::', data, signature, status, error)
      await mutateAsync({ code: data.refCode, signature })
      toast(`👌 Welcome!`)
      // updateRefCode(undefined)
    } catch (e) {
      toast(`⚠️ Refferal error! ${e.message}`)
    }
    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" className="w-full mt-2" {...register('refCode')} />
      {errors.refCode && (
        <span className="font-sans text-right text-sm bg-primary px-2 pt-px mt-1 mx-2 inline-flex">
          {errors.refCode.message}
        </span>
      )}
      <Button
        type="submit"
        isLoading={isLoading}
        className="btn bg-secondary w-full h-14 mt-2"
      >
        Start
      </Button>
    </form>
  )
}
