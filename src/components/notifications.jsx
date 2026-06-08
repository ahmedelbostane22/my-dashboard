import { getToken } from "firebase/messaging";
import { messaging } from "../components/Layout/firebase";

export const requestNotificationPermission = async () => {
  const permission = await Notification.requestPermission();

  if (permission === "granted") {
    const token = await getToken(messaging, {
      vapidKey: "BJfoUsAdV1nFM6Clj5iYmxaOTNy7lVRTYJ9SxCgbRevi2zgRc7bwCfkUavBGGln7D6-5gmduqqQQDvKoy02QfQU",
    });

    console.log("FCM Token:", token);
   await fetch("https://fcm.googleapis.com/fcm/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token, 
        title: "Hello from React",
        body: "This is a test notification!"
      }),
    });

    return token;
  } else {
    console.log("Notification permission denied");
  }



};