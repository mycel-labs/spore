import { cn } from "@/lib/utils"

type TProps = {
  className?: string
}

export default function SoonTm({className}: TProps) {
  return (
    <p className={cn(
      "py-20 text-saffron font-title text-center text-3xl",
      className
    )}>
      SOON<span className="text-base align-top">TM</span>
    </p>
  )
}
