import logo from '@/assets/logo.svg'
// import usecaseImg from '@/assets/usecases.png'
import { FullLayout } from '@/renderer/PageShell'

export default function Page() {
  return (
    <FullLayout>
      <div className="w-full">
        <h1 className="font-title text-6xl border-b-2 border-piano text-center pt-4 pb-7">mycel.id</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <BG>
          <img src={logo} width={240} className="mx-auto my-20 px-6" alt="mycel" />
        </BG>
        <div className="border-t-2 sm:border-t-0 sm:border-l-2 border-piano bg-saffron flex items-center justify-center py-12 px-6">
          <div>
            <h2 className="text-2xl font-bold mt-6">Get mycel.id once, use it anywhere</h2>
            <ul className="mx-2 my-4 space-y-1">
              <li>✔️ 🙋🏻 Profile</li>
              <li>✔️ 💬 Chat with friends</li>
              <li>✔️ ➡️ Send money</li>
              <li>✔️ 💰 Get airdrop</li>
              <li>✔️ ...more!</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-piano border-t-2 border-b-2 pt-12 pb-10 px-6">
        <h2 className="text-4xl text-center mb-6">Get mycel.id</h2>
        <a href="/home" className="px-4 h-12 btn-solid bg-samon text-xl mx-auto mb-8 max-w-xs"><span className="flex-1 text-center ml-14 mr-10">Start</span><span>☞</span></a>
      </div>
      {/* <div className="grid grid-cols-1 sm:grid-cols-2">
        <div className="flex items-center justify-center p-16 min-h-64 bg-jade">
          <div className="">
            <img src={usecaseImg} />
          </div>
        </div>
        <div className="border-t-2 sm:border-t-0 sm:border-l-2 border-piano flex items-center justify-center py-16 px-6 min-h-64">
          <h3 className="text-xl font-bold">Other usecases</h3>
        </div>
      </div> */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-2">
        <div className="flex items-center justify-center py-16 px-6 min-h-64">
          <div>
            <div className="text-jade">
              <svg enableBackground="new 0 0 24 24" height="96" viewBox="0 0 24 24" width="96" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"><path d="m6.6 17.5c-2.9-.7-5.9-4.1-5.9-8.5 0-4.6 3.5-8.5 7.6-8.5h7.5c4.1 0 7.4 3.9 7.4 8.5 0 4.5-3.3 8.5-7.4 8.5h-2.4l-6.9 5.8c.1 0 .1-5.8.1-5.8z"/><path d="m16.5 5.8c-1-1.1-2.7-1.1-3.8 0l-.6.6-.6-.6c-1-1.1-2.7-1.1-3.8 0-1 1.1-1 2.8 0 3.9l4.4 4.5 4.4-4.5c1.1-1.1 1.1-2.9 0-3.9z"/></g></svg>
            </div>
            <h3 className="text-xl font-bold mt-6">With friends</h3>
            <p className="">Message</p>
            <p className="">Join %%%</p>
          </div>
        </div>
        <div className="border-t-2 sm:border-t-0 sm:border-l-2 border-piano flex items-center justify-center py-16 px-6 min-h-64">
          <div>
            <div className="text-lochmara">
              <svg enableBackground="new 0 0 24 24" height="96" viewBox="0 0 24 24" width="96" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><g strokeMiterlimit="10"><circle cx="12" cy="14" r="4.4"/><path d="m11 11.9v4.3"/><path d="m11.5 11.1v.8"/><path d="m11.5 16.2v.7"/></g><path d="m10.5 11.9h1.8c1.9 0 1.6 2.1.1 2"/><path d="m10.5 16.2h2.1c1.6 0 1.5-2.3.1-2.3h-1.7"/><path d="m.4 5.5v13.5c0 .9.7 1.6 1.6 1.6h21.5v-13.1h-21.5c-.9 0-1.6-.9-1.6-2 0-1.1.7-2 1.6-2h21.5"/><path d="m23.4 5.5h-21.1" strokeMiterlimit="10"/></g></svg>
            </div>
            <h3 className="text-xl font-bold mt-6">With friends</h3>
            <p className="">Message</p>
            <p className="">Join %%%</p>
          </div>
        </div>
      </div> */}
      <div className="bg-piano py-12 px-6 text-white flex items-center justify-center text-center">
        <div className="max-w-lg">
          <p>Powered by<br /><a className="font-title text-2xl hover:underline" href="https://mycel.domains">mycel.domains</a></p>
          <p className="text-sm mt-6 text-smoke">Mycel is a Decentralized ID Infrastructure solution that resolves addresses such as websites, crypto wallets, IPFS, among many more accessible through a single domain with name resolution support in DNS, IBC and smart contracts.</p>
        </div>
      </div>
    </FullLayout>
  )
}

const BG = ({children}: {children: React.ReactNode}) => (
  <div className="bg-g h-full w-full">
    <div className="bg-noise h-full w-full overflow-hidden">{children}</div>
  </div>
)
