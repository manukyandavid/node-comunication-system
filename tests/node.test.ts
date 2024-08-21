import { signMessage, publicKey, privateKey } from "../src/utils";
import { Node, NodeH } from "../src/node";
import { describe, it, expect } from "vitest";

const generatedPrivateKey = privateKey;
const generatedPublicKey = publicKey;

describe("System Validation Tests", () => {
  const nodeA = new Node();
  const nodeB = new Node();
  const nodeH = new NodeH();

  it("should return true for a valid message at Node A/B", () => {
    const message = "1data1data2";
    const signature = signMessage(message, generatedPrivateKey);
    const isValid = nodeA.validateMessage(
      1,
      "data1",
      "data2",
      signature,
      generatedPublicKey
    );
    expect(isValid).toBe(true);
  });

  it("should return false for a invalid id at Node A/B", () => {
    const message = "0data1data2";
    const signature = signMessage(message, generatedPrivateKey);
    const isValid = nodeB.validateMessage(
      0,
      "data1",
      "data2",
      signature,
      generatedPublicKey
    );
    expect(isValid).toBe(false);
  });

  it("should return false for a invalid signature at Node A/B", () => {
    const invalidSignature = "invalid signature";
    const isValid = nodeB.validateMessage(
      1,
      "data1",
      "data2",
      invalidSignature,
      generatedPublicKey
    );
    expect(isValid).toBe(false);
  });

  it("should return true for a valid messages at Node H", () => {
    const messages = [
      {
        id: 1,
        data1: "data1",
        data2: "data2",
        signature: signMessage("1data1data2", generatedPrivateKey),
      },
      {
        id: 2,
        data1: "data3",
        data2: "data4",
        signature: signMessage("2data3data4", generatedPrivateKey),
      },
      {
        id: 3,
        data1: "data5",
        data2: "data6",
        signature: signMessage("3data5data6", generatedPrivateKey),
      },
    ];
    const isValid = nodeH.validateMessages(messages, generatedPublicKey);
    expect(isValid).toBe(true);
  });

  it("should return false for a non-contiguous ids at Node H", () => {
    const messages = [
      {
        id: 1,
        data1: "data1",
        data2: "data2",
        signature: signMessage("1data1data2", generatedPrivateKey),
      },
      {
        id: 3,
        data1: "data3",
        data2: "data4",
        signature: signMessage("3data3data4", generatedPrivateKey),
      },
    ];
    const isValid = nodeH.validateMessages(messages, generatedPublicKey);
    expect(isValid).toBe(false);
  });

  it("should return false for a duplicate ids at Node H", () => {
    const messages = [
      {
        id: 1,
        data1: "data1",
        data2: "data2",
        signature: signMessage("1data1data2", generatedPrivateKey),
      },
      {
        id: 1,
        data1: "data3",
        data2: "data4",
        signature: signMessage("1data3data4", generatedPrivateKey),
      },
    ];
    const isValid = nodeH.validateMessages(messages, generatedPublicKey);
    expect(isValid).toBe(false);
  });
});
