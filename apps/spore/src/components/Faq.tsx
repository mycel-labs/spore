import {
  Accordion,
  AccordionContent as AccordionContent_,
  AccordionItem,
  AccordionTrigger as AccordionTrigger_,
} from '@/components/ui/accordion'
import Play from '@/components/svg/Play'

export default function AccordionDemo() {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full border-b-2 border-dotted border-dark"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>Waht is SPORE?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Why SPORE?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other
          components&apos; aesthetic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>How it works?</AccordionTrigger>
        <AccordionContent>
          Yes. It&apos;s animated by default, but you can disable it if you
          prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

const AccordionTrigger = ({ ...props }) => (
  <AccordionTrigger_
    className="border-t-2 border-dotted border-dark px-6 py-3 text-xl [&[data-state=open]>svg]:-rotate-90"
    icon={
      <Play className="h-3 w-3 shrink-0 rotate-90 transition-transform duration-200" />
    }
    {...props}
  />
)

const AccordionContent = ({ ...props }) => (
  <AccordionContent_ className="pl-8 pr-4 pt-4 pb-6" {...props} />
)
