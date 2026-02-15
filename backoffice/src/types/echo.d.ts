// echo.d.ts - Déclarations TypeScript pour Laravel Echo
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

declare global {
  interface Window {
    Pusher: typeof Pusher;
    Echo: Echo;
  }
}

export interface PusherConfig {
  broadcaster: 'pusher';
  key: string;
  cluster: string;
  forceTLS: boolean;
  authEndpoint?: string;
  auth?: {
    headers: {
      Authorization?: string;
      Accept?: string;
      'Content-Type'?: string;
      'X-Requested-With'?: string;
    };
  };
  enabledTransports?: string[];
}

export interface NotificationData {
  title: string;
  message: string;
  type: string;
  timestamp?: string;
}

export interface NotificationItem {
  id: number;
  title: string;
  message: string;
  time: string;
  type: string;
}

export {};