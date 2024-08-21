import { generateKeyPairSync, createSign, createVerify } from "crypto";
import { Message } from "./message";

export function generateSignature(
  message: Message,
  privateKey: string,
  publicKey: string
): string {
  return `${message.id}-${message.data1}-${message.data2}-${privateKey}:${publicKey}`;
}

const { publicKey, privateKey } = generateKeyPairSync("rsa", {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: "spki",
    format: "pem",
  },
  privateKeyEncoding: {
    type: "pkcs8",
    format: "pem",
  },
});

export function signMessage(message: string, privateKey: string): string {
  const sign = createSign("SHA256");
  sign.update(message);
  sign.end();
  return sign.sign(privateKey, "hex");
}

export function verifyMessageSignature(
  message: string,
  signature: string,
  publicKey: string
): boolean {
  const verify = createVerify("SHA256");
  verify.update(message);
  verify.end();
  return verify.verify(publicKey, signature, "hex");
}

export { publicKey, privateKey };
