'use client'
import Image from 'next/image'
import React from 'react'
import { BaselimeRum, BaselimeErrorBoundary, useBaselimeRum } from '../../../dist';


export default function Home() {
  const [broken, setBroken] = React.useState(false)
  return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <button onClick={() => {
          setBroken(true)
        }} >
          <Image
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
        </button>
        <BaselimeErrorBoundary fallback={<div>Oh No</div>}>
          <BrokenComponent broken={broken} />
        </BaselimeErrorBoundary>
      </main>
  )
}

function UserProfile({}) { 
    const { sendEvent } = useBaselimeRum();
    return <button onClick={() => sendEvent({})}>
        User Profile
    </button>
}

function BrokenComponent({ broken }: { broken: boolean}) {
  const stuff = {

  }
  

  return (<div>Broken

    <button onClick={() => stuff.break()}></button>
  </div>)
}