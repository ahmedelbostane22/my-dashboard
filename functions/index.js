// Firebase Admin & Functions
// eslint-disable-next-line no-undef
const admin = require("firebase-admin");
// eslint-disable-next-line no-undef
const functions = require("firebase-functions");
// eslint-disable-next-line no-undef
const { onDocumentUpdated } = require("firebase-functions/v2/firestore");

// Initialize Firebase Admin
admin.initializeApp();

/////////////////////////////////////////////
// 1️⃣ Function لإرسال Notification
// eslint-disable-next-line no-undef
exports.sendNotification = functions.https.onRequest(async (req, res) => {
  try {
    const { token, title, body } = req.body;

    if (!token || !title || !body) {
      return res.status(400).send({ success: false, error: "Missing fields" });
    }

    const message = {
      token,
      notification: { title, body },
    };

    const response = await admin.messaging().send(message);

    console.log("Successfully sent message:", response);
    res.send({ success: true, response });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).send({ success: false, error: error.message });
  }
});

/////////////////////////////////////////////
// 2️⃣ Function لنقل الأوردرز للـ sales بعد التسليم
// eslint-disable-next-line no-undef
exports.moveOrderToSales = onDocumentUpdated(
  "users/{userId}/orders/{orderId}",
  async (event) => {
    const before = event.data.before.data();
    const after = event.data.after.data();

    if (!after?.status) return;

    // نتحقق لو الأوردر اتسلم دلوقتي
    if (before?.status !== "Delivered" && after.status === "Delivered") {
      const db = admin.firestore();

      await db
        .collection("sales")
        .doc(after.orderId) // لضمان عدم التكرار
        .set({
          orderId: after.orderId,
          userId: after.userId,
          name: after.name,
          products: after.products,
          totalPrice: after.totalPrice,
          paymentMethod: after.paymentMethod,
          deliveredAt: admin.firestore.FieldValue.serverTimestamp(),
        });

      console.log(`Order ${after.orderId} moved to sales collection.`);
    }
  }
);
