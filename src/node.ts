import { verifyMessageSignature } from "./utils";

export class Node {
  validateMessage(
    id: number,
    data1: string,
    data2: string,
    signature: string,
    publicKey: string
  ): boolean {
    if (id <= 0) return false;
    const message = `${id}${data1}${data2}`;
    return verifyMessageSignature(message, signature, publicKey);
  }
}

export class NodeH extends Node {
  validateMessages(
    messages: { id: number; data1: string; data2: string; signature: string }[],
    publicKey: string
  ): boolean {
    const setOfIds = new Set<number>();
    for (const message of messages) {
      if (
        !this.validateMessage(
          message.id,
          message.data1,
          message.data2,
          message.signature,
          publicKey
        )
      )
        return false;

      if (setOfIds.has(message.id)) return false;

      setOfIds.add(message.id);
    }

    const minId = Math.min(...setOfIds);
    const maxId = Math.max(...setOfIds);

    return maxId - minId + 1 === setOfIds.size;
  }
}
