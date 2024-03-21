import { useState } from 'react'
import { toast } from '@/components/ui/sonner'
import Button from '~/components/Button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRegisterSecondLevelDomain } from '@/hooks/useMycel'
import { CelNameForm } from '@/store'

const celNameSchema = z.object({
  // TODO: update with server validation
  domain: z.string().min(1).max(64),
})

export default function CelNameForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { mutate } = useRegisterSecondLevelDomain()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(celNameSchema),
  })
  const refCode = useStore((state) => state.refCode)
  const updateRefCode = useStore((state) => state.updateRefCode)

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      await mutate(data.domain)
      toast(`👌 You got ${data.domain} !`)
      updateRefCode(undefined)
    } catch (e) {
      toast(`⚠️ Register error! ${e.message}`)
    }
    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="xxx.cel"
        className="w-full mt-2"
        {...register('domain')}
      />
      {errors.domain && (
        <span className="font-sans text-right text-sm bg-primary px-2 pt-px mt-1 mx-2 inline-flex">
          {errors.domain.message}
        </span>
      )}
      <Button
        type="submit"
        isLoading={isLoading}
        className="btn bg-secondary w-full h-14 mt-2"
      >
        Get .cel name
      </Button>
    </form>
  )
}
