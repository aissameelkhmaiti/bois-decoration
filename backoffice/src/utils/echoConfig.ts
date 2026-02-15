// utils/echoConfig.ts - Configuration centralisée pour Laravel Echo
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

// Rendre Pusher disponible globalement pour Laravel Echo
window.Pusher = Pusher;

/**
 * Configuration pour canal PUBLIC (sans authentification)
 */
export const createPublicEcho = (): Echo => {
  return new Echo({
    broadcaster: 'pusher',
    key: '01c02b56ace89f22c528',
    cluster: 'eu',
    forceTLS: true,
    enabledTransports: ['ws', 'wss'],
  });
};

/**
 * Configuration pour canal PRIVÉ (avec authentification)
 * Utilisez cette fonction si vous passez à un canal privé plus tard
 */
export const createPrivateEcho = (token: string): Echo => {
  return new Echo({
    broadcaster: 'pusher',
    key: '01c02b56ace89f22c528',
    cluster: 'eu',
    forceTLS: true,
    authEndpoint: 'http://localhost:8000/broadcasting/auth',
    auth: {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
    },
    enabledTransports: ['ws', 'wss'],
  });
};

/**
 * Types pour les notifications
 */
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

/**
 * Couleurs par type de notification
 */
export const NOTIFICATION_COLORS: Record<string, string> = {
  contact: '#3b82f6',  // bleu
  success: '#10b981',  // vert
  warning: '#f59e0b',  // orange
  error: '#ef4444',    // rouge
  info: '#A66D3B',     // or (défaut)
};

export const getNotificationColor = (type: string): string => {
  return NOTIFICATION_COLORS[type] || NOTIFICATION_COLORS.info;
};