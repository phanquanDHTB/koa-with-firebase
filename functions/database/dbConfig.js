import admin from "firebase-admin";
import serviceAccount from "./todo-db-e9ba9-firebase-adminsdk-8pqz3-24328340f6.json" assert { type: "json" };

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore().collection("todos");
const batch = admin.firestore().batch();

export { db, batch };
