import * as firebaseAdmin from "firebase-admin";
import serviceAccount from "./secrets.json";
// var serviceAccount = require("./secrets.json");

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
  });
}

export { firebaseAdmin };
