import admin from "firebase-admin";
import serviceAccount from "./caminho-para-sua-chave.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

export default admin;
