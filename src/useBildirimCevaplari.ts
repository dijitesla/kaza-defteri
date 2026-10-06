import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';
import { useVeri } from './veri';

/**
 * Bildirim düğmelerine verilen cevapları kaydeder: uygulama açıkken gelenleri ve
 * uygulamayı bildirimin açtığı durumu (uygulama kapalıyken basılan düğme).
 */
export function useBildirimCevaplari() {
  const { bildirimCevabiIsle } = useVeri();

  useEffect(() => {
    const isle = (r: Notifications.NotificationResponse) => {
      bildirimCevabiIsle(r.notification.request.content.data, r.actionIdentifier);
      Notifications.dismissNotificationAsync(r.notification.request.identifier).catch(() => {});
      Notifications.clearLastNotificationResponseAsync().catch(() => {});
    };

    Notifications.getLastNotificationResponseAsync()
      .then((r) => {
        if (r) isle(r);
      })
      .catch(() => {});
    const abonelik = Notifications.addNotificationResponseReceivedListener(isle);
    return () => abonelik.remove();
  }, [bildirimCevabiIsle]);
}
