'use client'
import React, { createContext, useContext } from 'react';
import { DispatchQueue } from './dispatch-queue.js';
import { formatError } from './utils/format-error.js';

export interface BaselimeRumConfig {
    apiKey: string,
    dataset: string,
    service: string,
    namespace: string,
    url: string,
    userId?: string,
    sessionId?: string,
    pageLoadId: string,
    enableLocal: boolean,
    enableWebVitals: boolean
    
}


export const BaselimeContext = createContext({} as {
  config: BaselimeRumConfig,
  setConfig: React.Dispatch<React.SetStateAction<BaselimeRumConfig>>
  queue: DispatchQueue
});

export function useBaselimeRum() {
  const { config, setConfig, queue } = useContext(BaselimeContext)
  if(!config || !queue) {
    console.warn('Using useBaselimeRum outside of BaselimeRum context, operations will be no-ops')

    return {
      setUser: () => {},
      sendEvent: () => {},
    }
  }
  return {
    config,
    setUser: (userId: string) => setConfig((prev) => ({ ...prev, userId })),
    _trackWebVital: (metric) => {
      const event = { ...metric, data: metric.entries[0], entries: undefined };
      queue.push(event)
    },
    captureException: (error: Error, info?: React.ErrorInfo) => {
      if(info) {
        const component = info.componentStack.split('@')[0]
        const event = {
          level: 'error',
          data: { error },
          stack: info.componentStack,
          error: {
              message: error.message,
              name: error.name,
              cause: error.cause,
          },
          causedBy: component,
          message: `${error.name}: ${error.message}`
        }
        return queue.push(event)
      }

      const formattedError = formatError(error);
      const event = {
        level: 'error',
        data: { error },
        stack: info?.componentStack,
        error: {
            ...formattedError
        },
        message: `${error.name}: ${error.message}`
      }
      queue.push(event)
    },
    sendEvent: (message: string, data: any = {}) => {
      const event = {
        level: data?.level || 'info',
        message: message,
        ...data
      }
      queue.push(event)
    }
  }
}
