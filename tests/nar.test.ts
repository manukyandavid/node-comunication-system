import { describe, it, expect } from "vitest";
import { NAR, NetStatus } from "../src/nar";

export function narUpdateConsistencySC(nar: NAR): boolean {
  if (
    nar.recStatus === NetStatus.CHAIN_ADMIN &&
    nar.recStatus === NetStatus.HUB &&
    nar.recStatus === NetStatus.NODE &&
    nar.recStatus === NetStatus.RELAY
  ) {
    return false;
  }

  if (nar.recStatus === NetStatus.LEAVING || nar.amtCoinR <= 0) {
    return false;
  }

  if (nar.nodeNum !== nar.nodeNum1 && nar.nodeNum !== nar.nodeNum2) {
    return false;
  }

  if (
    nar.recStatus === NetStatus.LISTENING ||
    nar.recStatus === NetStatus.READY
  ) {
    if (
      nar.acctNumRfdR === 256 ||
      nar.ipAddrR === 64 ||
      nar.ipPortNumR === 16
    ) {
      return false;
    }
  }
  return true;
}

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
