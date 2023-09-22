"use client"
import { ReactNode, useEffect } from 'react'
import { Metric, onCLS, onFCP, onFID, onINP, onLCP, onTTFB } from 'web-vitals'

export function WebVitals(props: { apiKey: string, children: ReactNode, dataset: string, service: string, url?: string }) {

  async function reportWebVitals(metric: Metric) {

    const namespace = metric.name;
    await fetch(`${props.url || "https://events.baselime.io/v1"}/${props.dataset}/${props.service}/${namespace}`, {
      method: 'POST',
      headers: {
        contentType: 'application/json',
        'x-api-key': props.apiKey,
      },
      body: JSON.stringify([{ ...metric, data: metric.entries[0], entries: undefined }]),
    })
  }

  useEffect(() => {
    /**
     * Don't send anything for localhost
     */
    if(window.location.hostname === "localhost") return
    onCLS(reportWebVitals)
    onFCP(reportWebVitals)
    onINP(reportWebVitals)
    onLCP(reportWebVitals)
    onTTFB(reportWebVitals)
    onFID(reportWebVitals)
  }, [])

  return props.children;
}