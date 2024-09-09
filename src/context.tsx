"use client";
import React, { createContext, useCallback, useContext } from "react";
import { DispatchQueue } from "./dispatch-queue.js";
import { formatError } from "./utils/format-error.js";

export interface BaselimeRumConfig {
  apiKey: string;
  dataset: string;
  service: string;
  namespace: string;
  url: string;
  userId?: string;
  sessionId?: string;
  pageLoadId: string;
  enableLocal: boolean;
  enableWebVitals: boolean;
}

export const BaselimeContext = createContext(
  {} as {
    config: BaselimeRumConfig;
    setConfig: React.Dispatch<React.SetStateAction<BaselimeRumConfig>>;
    queue: DispatchQueue;
  }
);

export function useBaselimeRum() {
  const { config, setConfig, queue } = useContext(BaselimeContext);
  const isOutsideBaselimeRumCtx = !config || !queue;

  const setUser = useCallback(
    (userId?: string) => {
      if (isOutsideBaselimeRumCtx) {
        return;
      }

      return setConfig((prev) => ({ ...prev, userId }));
    },
    [isOutsideBaselimeRumCtx]
  );

  const sendEvent = useCallback(
    (message: string, data: any = {}) => {
      if (isOutsideBaselimeRumCtx) {
        return;
      }

      const event = {
        level: data?.level || "info",
        message: message,
        ...data,
      };
      queue.push(event, config);
    },
    [isOutsideBaselimeRumCtx, config]
  );

  const captureException = useCallback(
    (error: Error, info?: React.ErrorInfo) => {
      if (isOutsideBaselimeRumCtx) {
        return;
      }
      if (info) {
        const component = info.componentStack.split("@")[0];
        const event = {
          level: "error",
          data: { error },
          stack: info.componentStack,
          error: {
            message: error.message,
            name: error.name,
            cause: error.cause,
          },
          causedBy: component,
          message: `${error.name}: ${error.message}`,
        };
        return queue.push(event, config);
      }

      const formattedError = formatError(error);
      const event = {
        level: "error",
        data: { error },
        stack: info?.componentStack,
        error: {
          ...formattedError,
        },
        message: `${error.name}: ${error.message}`,
      };
      queue.push(event, config);
    },
    [isOutsideBaselimeRumCtx, config]
  );

  const _trackWebVital = useCallback(
    (metric) => {
      if (isOutsideBaselimeRumCtx) {
        return;
      }

      const event = { ...metric, data: metric.entries[0], entries: undefined };
      queue.push(event, config);
    },
    [isOutsideBaselimeRumCtx, config]
  );

  if (isOutsideBaselimeRumCtx) {
    console.warn(
      "Using useBaselimeRum outside of BaselimeRum context, operations will be no-ops"
    );
  }

  return {
    config,
    setUser,
    captureException,
    sendEvent,
    _trackWebVital,
  };
}
