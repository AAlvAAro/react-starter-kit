declare module "@rails/actioncable" {
  export interface Consumer {
    subscriptions: Subscriptions;
    disconnect(): void;
  }

  export interface Subscriptions {
    create(
      channel: string | { channel: string; [key: string]: unknown },
      callbacks?: {
        received?: (data: unknown) => void;
        connected?: () => void;
        disconnected?: () => void;
      }
    ): Subscription;
  }

  export interface Subscription {
    unsubscribe(): void;
    perform(action: string, data?: Record<string, unknown>): void;
  }

  export function createConsumer(url?: string): Consumer;
}
