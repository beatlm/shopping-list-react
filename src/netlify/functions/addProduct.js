const admin = require("firebase-admin");


if (!admin.apps.length) {
  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!serviceAccount) {
    throw new Error("FIREBASE_SERVICE_ACCOUNT environment variable is required.");
  }

  let serviceAccountJson;
  try {
    serviceAccountJson = JSON.parse(serviceAccount);
  } catch (error) {
    throw new Error("FIREBASE_SERVICE_ACCOUNT is not valid JSON.");
  }

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountJson)
  });
}

const db = admin.firestore();

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: "Method Not Allowed"
      };
    }

    const body = JSON.parse(event.body || "{}");

    const item = body.item?.trim();

    if (!item) {
      return {
        statusCode: 400,
        body: "Missing item"
      };
    }

    const shopsSnapshot = await db.collection("shops")
      .where("name", "==", "Todas")
      .limit(1)
      .get();

    if (shopsSnapshot.empty) {
      return {
        statusCode: 404,
        body: "Shop with name 'Todas' not found."
      };
    }

    const shopDoc = shopsSnapshot.docs[0];
    await shopDoc.ref.update({
      products: admin.firestore.FieldValue.arrayUnion({
        addedBy: "API",
        name: item,
        quantity: 1,
        priority: 1
      })
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        item,
        shopId: shopDoc.id,
        shopName: "Todas"
      })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err.message
    };
  }
};