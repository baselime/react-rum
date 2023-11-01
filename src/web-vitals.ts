'use client';
import { ReactNode, useEffect } from "react";
import { onCLS, onFCP, onFID, onINP, onLCP, onTTFB } from 'web-vitals'
import { useBaselimeRum } from "./context.tsx";

export function WebVitals(props: { children: ReactNode }) {

  const { config, _trackWebVital, sendEvent } = useBaselimeRum();

  useEffect(() => {
    /**
     * Don't send anything for localhost
     */
    if (!config.enableLocal && typeof window != 'undefined' && window.location.hostname === "localhost") return

    if (config.enableWebVitals) {
      onCLS(_trackWebVital)
      onFCP(_trackWebVital)
      onINP(_trackWebVital)
      onLCP(_trackWebVital)
      onTTFB(_trackWebVital)
      onFID(_trackWebVital)
    }

    function onPageView(callback: Function) {
      callback({
        data: {
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          lanuage: navigator.language,
          os: navigator['oscpu'] || navigator.platform,
          userAgent: navigator.userAgent,
          url: window.location.href,
        },
        hostname: window.location.hostname,
        path: window.location.pathname,
      });
    }
    
    onPageView((event) => sendEvent('Page View', event))
  }, [])

  return props.children
}

