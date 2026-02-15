// hooks/useNotifications.ts - Hook personnalisé pour gérer les notifications temps réel
import { useState, useEffect } from 'react';
import Echo from 'laravel-echo';
import { 
  createPublicEcho, type
  NotificationData, type
  NotificationItem 
} from '../utils/echoConfig';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    let echo: Echo | null = null;

    try {
      // Créer l'instance Echo pour le canal public
      echo = createPublicEcho();

      // Gestion des événements de connexion Pusher
      echo.connector.pusher.connection.bind('connected', () => {
        console.log('✅ Pusher connecté avec succès');
        setIsConnected(true);
      });

      echo.connector.pusher.connection.bind('disconnected', () => {
        console.log('🔌 Pusher déconnecté');
        setIsConnected(false);
      });

      echo.connector.pusher.connection.bind('error', (err: any) => {
        console.error('❌ Erreur de connexion Pusher:', err);
        setIsConnected(false);
      });

      echo.connector.pusher.connection.bind('state_change', (states: any) => {
        console.log('🔄 État Pusher:', states.previous, '→', states.current);
      });

      // Écoute du canal public admin-notifications
      const channel = echo.channel('admin-notifications');
      
      channel
        .listen('.app.notification', (data: NotificationData) => {
          console.log('📩 Notification reçue:', data);
          
          const newNotif: NotificationItem = {
            id: Date.now(),
            title: data.title,
            message: data.message,
            type: data.type || 'info',
            time: new Date().toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })
          };
          
          setNotifications(prev => [newNotif, ...prev]);
          setUnreadCount(prev => prev + 1);
        })
        .error((error: any) => {
          console.error('❌ Erreur sur le canal:', error);
        });

      // Confirmation de souscription
      channel.subscribed(() => {
        console.log('✅ Souscription au canal admin-notifications réussie');
      });

      channel.bind('pusher:subscription_succeeded', () => {
        console.log('✅ pusher:subscription_succeeded');
      });

      channel.bind('pusher:subscription_error', (status: any) => {
        console.error('❌ pusher:subscription_error:', status);
      });

    } catch (error) {
      console.error('❌ Erreur lors de l\'initialisation d\'Echo:', error);
      setIsConnected(false);
    }

    // Nettoyage
    return () => {
      if (echo) {
        try {
          echo.leave('admin-notifications');
          echo.disconnect();
          console.log('🔌 Echo déconnecté proprement');
          setIsConnected(false);
        } catch (error) {
          console.error('⚠️ Erreur lors de la déconnexion:', error);
        }
      }
    };
  }, []);

  const clearNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
  };

  const markAsRead = () => {
    setUnreadCount(0);
  };

  return {
    notifications,
    unreadCount,
    isConnected,
    clearNotifications,
    markAsRead,
  };
};