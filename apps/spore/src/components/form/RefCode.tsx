import { useState } from 'react'
import { toast } from '@/components/ui/sonner'
import Button from '~/components/Button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useStore } from '@/store'
import { useWallet } from '@/hooks/useWallet'
import { callFn } from '@/lib/firebase'
import { useNavigate } from '@tanstack/react-router'

const refSchema = z.object({
  // TODO: update with server validation
  refCode: z.string().min(1).max(48),
})

export default function CelNameForm({ isClaimable }: { isClaimable: boolean }) {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const refCode = useStore((state) => state.refCode)
  const updateRefCode = useStore((state) => state.updateRefCode)
  const mycelName = useStore((state) => state.mycelName)
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
  const { mycelAccount, signDomainName } = useWallet()

  const onSubmit = async (data: { refCode: string }) => {
    setIsLoading(true)
    try {
      const { signature } = await signDomainName(mycelName)
      await callFn('createUser')({
        code: data.refCode,
        uid: mycelName,
        address: mycelAccount.address,
        evmAddress: mycelAccount.evmAddress,
        signature,
      })
      toast(`👌 Welcome!`)
      updateRefCode(undefined)
      navigate({ to: '/home' })
    } catch (e) {
      console.log(e)
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
        disabled={!mycelAccount?.address || isClaimable || !mycelName}
        className="btn bg-secondary w-full h-14 mt-2"
      >
        Start
      </Button>
    </form>
  )
}
