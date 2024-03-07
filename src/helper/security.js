import { AES, enc, HmacSHA256 } from "crypto-js";

export function encrypt(data) {
    return AES.encrypt(data, process.env.AES_TOKEN || "").toString();
}
export function decrypt(data) {
    return AES.decrypt(data, process.env.AES_TOKEN || "").toString(enc.Utf8);
}
export function generateHash(data) {
    return HmacSHA256(data, process.env.HMAC_TOKEN || "").toString();
}
