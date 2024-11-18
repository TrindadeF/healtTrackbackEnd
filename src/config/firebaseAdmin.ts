import admin from "firebase-admin";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const serviceAccountPath = path.resolve(
  __dirname,
  "firebase-service-account.json"
);

admin.initializeApp({
  credential: admin.credential.cert(require(serviceAccountPath)),
});

export default admin;
