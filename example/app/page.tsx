'use client'
import Image from 'next/image'
import React from 'react'
import { BaselimeErrorBoundary, } from '@baselime/react-rum';
import Link from 'next/link';

export default function Home() {
  const [broken, setBroken] = React.useState(false)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href="/user">User</Link>

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
      <BaselimeErrorBoundary fallback={<div>Oh No</div>} onError={(error) => console.log(error)}>
        <BrokenComponent broken={broken} />
      </BaselimeErrorBoundary>
    </main>
  )
}

function BrokenComponent({ broken }: { broken: boolean }) {
  if (broken) {
    throw new Error('I am broken')
  }


  return <div>Broken</div>
}