// server.js
import express from "express";
import admin from "firebase-admin";
import fs from "fs";
import cors from "cors";

const serviceAccount = JSON.parse(fs.readFileSync("./serviceAccountKey.json", "utf8"));

const app = express();
app.use(cors({ origin: "http://localhost:5173" })); // فقط React app
app.use(express.json());

// تهيئة Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// API لإرسال الإشعار
app.post("/send-notification", async (req, res) => {
  const { token, title, body } = req.body;

  if (!token || !title || !body) {
    return res.status(400).send({ error: "Missing fields" });
  }

  try {
    const message = {
      notification: { title, body },
      token,
    };

    const response = await admin.messaging().send(message);
    console.log("Successfully sent message:", response);
    res.status(200).send(response);
  } catch (error) {
    console.error("Error sending notification:", error);
    res.status(500).send({ error: error.message });
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
