import admin from "../config/firebaseAdmin";

export const generateCustomToken = async (uid: string): Promise<string> => {
  return await admin.auth().createCustomToken(uid);
};
