import {
  Accordion,
  AccordionContent as AccordionContent_,
  AccordionItem as AccordionItem_,
  AccordionTrigger as AccordionTrigger_,
} from '@/components/ui/accordion'
import Play from '@/components/svg/PlayFill'

export default function AccordionDemo() {
  return (
    <Accordion type="single" collapsible className="w-full px-8">
      <AccordionItem value="item-1">
        <AccordionTrigger>What is SPORE?</AccordionTrigger>
        <AccordionContent>
          Spore is a decentralized application (dapp) built specifically for
          Myceliens🍄, utilizing the power of Transferable Account. With
          Mycel&apos;s Transferable Account, NFTs can be minted across different
          chains. For example, you could mint NFTs on the Ethereum mainnet even
          if you only have BNB token on the BNB chain. It works across any
          chain. (Spore only supports Holesky. But we plan to support the BTC
          testnet soon.) Learn more about Transferable Account (TA) 👇
          <div className="text-sm text-blue-500 underline font-bold m-2 ml-0">
            <a
              href="https://medium.com/@mycel/introduction-to-transferable-account-c764ee982fa4"
              target="_blank"
              rel="noopener noreferrer"
            >
              🔗 Introduction to Transferable Account
            </a>
          </div>
          This innovative platform is designed to enhance the user experience
          within the Mycelien ecosystem by enabling seamless account portability
          and interaction.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Why SPORE?</AccordionTrigger>
        <AccordionContent>
          With Spore, market participants can earn points, level up their
          Citizen Cards, and enjoy a clear and engaging experience of
          Transferable Accounts&apos; use cases in the form of NFTs.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>How it works?</AccordionTrigger>
        <AccordionContent>
          Learn more about how Spore works:
          <div className="text-sm text-blue-500 underline font-bold m-2 ml-0">
            <a
              href="https://medium.com/@mycel/introducing-spore-our-very-first-public-testnet-60a331debf0d"
              target="_blank"
              rel="noopener noreferrer"
            >
              🔗 Introducing SPORE: Our Very First Public Testnet
            </a>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

const AccordionTrigger = ({ ...props }) => (
  <AccordionTrigger_
    className="border-dark px-6 py-3 text-xl [&[data-state=open]>svg]:-rotate-90"
    icon={
      <Play
        className="h-3 w-3 shrink-0 rotate-90 transition-transform duration-200"
        storoke
      />
    }
    {...props}
  />
)

const AccordionItem = ({ ...props }) => (
  <AccordionItem_
    className="bg-light border-dark border-2 rounded-lg mb-4"
    {...props}
  />
)

const AccordionContent = ({ ...props }) => (
  <AccordionContent_ className="pl-8 pr-4 pt-3 pb-6 text-base" {...props} />
)
