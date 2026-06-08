import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import 'firebase-functions/lib/logger/compat';

admin.initializeApp();

export const sendOrderNotification = functions.firestore
.document('users/{userId}/orders/{orderId}')

  .onUpdate(async (change, context) => {

    const beforeData = change.before.data();
    const afterData = change.after.data();

  
    if (beforeData?.status !== 'Accepted' && afterData?.status === 'Accepted') {
      const userId = afterData.userId;
      if (!userId) return null;

      const userDoc = await admin.firestore().collection('users').doc(userId).get();
      if (!userDoc.exists) return null;

      const fcmToken = userDoc.data()?.fcmToken;
      if (!fcmToken) return null;

      // الرسالة
      const message = {
        token: fcmToken,
        notification: {
          title: 'Order Accepted',
          body: `Your order with ID ${context.params.orderId} has been accepted.`,
        },
        android: {
          notification: {
            channelId: 'order_updates', // لازم يكون موجود في Flutter
            priority: 'HIGH',
          },
        },
        apns: {
          payload: {
            aps: {
              alert: {
                title: 'Order Accepted',
                body: `Your order with ID ${context.params.orderId} has been accepted.`,
              },
              badge: 1,
              sound: 'default',
              contentAvailable: true,
              mutableContent: true,
            },
          },
          fcmOptions: {
            image: null,
          },
        },
        data: {
          orderId: context.params.orderId, // لو حبيت تمسك الـ orderId في Flutter
          status: 'Accepted',
        },
      };

      // إرسال Notification
      try {
        await admin.messaging().send(message);
        console.log('📩 Notification sent successfully to', userId);
      } catch (error) {
        console.error('❌ Error sending notification:', error);
      }
    }

    return null;
  });
