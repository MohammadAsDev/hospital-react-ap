import { _iv, _secretKey } from "./encrypt";
import CryptoJS from "crypto-js";

const secretKey = CryptoJS.enc.Utf8.parse(_secretKey);
const iv = CryptoJS.enc.Utf8.parse(_iv);

// تشفير البيانات
export function encryptData(data) {
  const encrypted = CryptoJS.AES.encrypt(
    CryptoJS.enc.Utf8.parse(data),
    secretKey,
    { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
  );
  return encrypted.toString();
}

// فك تشفير البيانات
export function decryptData(encryptedData) {
  const decrypted = CryptoJS.AES.decrypt(encryptedData, secretKey, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}