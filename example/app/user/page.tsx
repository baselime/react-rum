'use client'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { BaselimeErrorBoundary, useBaselimeRum } from '@baselime/react-rum';


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
      <UserProfile />
      <BaselimeErrorBoundary fallbackRender={(error) => <div>{error.error.message}</div>}>
        <BrokenComponent broken={broken} />
      </BaselimeErrorBoundary>
    </main>
  )
}

function UserProfile({ }) {
  const { sendEvent, setUser } = useBaselimeRum();

  useEffect(() => {
    setUser("2pi3j3")
  })
  return <button onClick={() => sendEvent("User Profile Clicked", {
    name: "John Doe",
    email: "yeyy@clickme.com"
  })}>
    User Profile
  </button>
}

function BrokenComponent({ broken }: { broken: boolean }) {
  if (broken) {
    throw new Error('This application has crashed')
  }
  return (<div>Broken


  </div>)
}