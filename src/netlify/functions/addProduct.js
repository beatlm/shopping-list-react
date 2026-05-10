const admin = require("firebase-admin");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(
      JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
    )
  });
}

const db = admin.firestore();

exports.handler = async (event) => {
  try {
    // Seguridad básica
    const auth = event.headers.authorization;

    if (auth !== `Bearer ${process.env.API_SECRET}`) {
      return {
        statusCode: 401,
        body: "Unauthorized"
      };
    }

    const body = JSON.parse(event.body);

    const item = body.item?.trim();

    if (!item) {
      return {
        statusCode: 400,
        body: "Missing item"
      };
    }

    await db.collection("shopping").add({
      text: item,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      done: false
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        item
      })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err.message
    };
  }
};