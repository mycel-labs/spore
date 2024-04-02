import { useState } from 'react'
import { toast } from '@/components/ui/sonner'
import Button from '~/components/Button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useStore } from '@/store'
import { useCreateUser } from '@/hooks/useReferral'
import { useWallet } from '@/hooks/useWallet'

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
  const { mutateAsync } = useCreateUser(
    'aaaa.cel',
    mycelAccount?.address,
    mycelOfflineSigner ?? undefined
  )

  const onSubmit = async (data: { refCode: string }) => {
    setIsLoading(true)
    try {
      console.log('data::', data)
      await mutateAsync({ code: data.refCode })
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
