'use client'
import Image from 'next/image'
import React from 'react'
import { BaselimeRum } from '@baselime/react-rum';

const apiKey = process.env.NEXT_PUBLIC_BASELIME_KEY;

export default function Home() {

  return (
    <BaselimeRum apiKey={apiKey as string} enableWebVitals enableLocal>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">


        <button onClick={() => alert('boop')} >
          <Image
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
        </button>


      </main>
    </BaselimeRum>
  )
}
