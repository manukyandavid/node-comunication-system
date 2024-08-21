import { describe, it, expect } from "vitest";
import { NAR, narUpdateConsistencySC, NetStatus } from "../src/nar";

describe("NAR Update Consistency Single Check Tests", () => {
  it("should return true for valid NAR with correct status", () => {
    const nar: NAR = {
      recStatus: NetStatus.NODE,
      amtCoinR: 1,
      nodeNum: 1,
      nodeNum1: 1,
      nodeNum2: 2,
      acctNumRfdR: 255,
      ipAddrR: 63,
      ipPortNumR: 15,
    };

    const result = narUpdateConsistencySC(nar);
    expect(result).toBe(true);
  });

  it("should return false if NAR status is LEAVING", () => {
    const nar: NAR = {
      recStatus: NetStatus.LEAVING,
      amtCoinR: 1,
      nodeNum: 1,
      nodeNum1: 1,
      nodeNum2: 2,
      acctNumRfdR: 255,
      ipAddrR: 63,
      ipPortNumR: 15,
    };

    const result = narUpdateConsistencySC(nar);
    expect(result).toBe(false);
  });

  it("should return false if amtCoinR is zero", () => {
    const nar: NAR = {
      recStatus: NetStatus.NODE,
      amtCoinR: 0,
      nodeNum: 1,
      nodeNum1: 1,
      nodeNum2: 2,
      acctNumRfdR: 255,
      ipAddrR: 63,
      ipPortNumR: 15,
    };

    const result = narUpdateConsistencySC(nar);
    expect(result).toBe(false);
  });

  it("should return false if receiving NAR has default values of acctNumRfdR, ipAddrR, ipPortNumR and status is LISTENING", () => {
    const nar: NAR = {
      recStatus: NetStatus.LISTENING,
      amtCoinR: 1,
      nodeNum: 1,
      nodeNum1: 1,
      nodeNum2: 2,
      acctNumRfdR: 256,
      ipAddrR: 64,
      ipPortNumR: 16,
    };

    const result = narUpdateConsistencySC(nar);
    expect(result).toBe(false);
  });

  it("should return true if all conditions are met for NET_STATUS_READY", () => {
    const nar: NAR = {
      recStatus: NetStatus.READY,
      amtCoinR: 1,
      nodeNum: 1,
      nodeNum1: 1,
      nodeNum2: 2,
      acctNumRfdR: 255,
      ipAddrR: 63,
      ipPortNumR: 15,
    };

    const result = narUpdateConsistencySC(nar);
    expect(result).toBe(true);
  });
});
