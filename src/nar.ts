export enum NetStatus {
    CHAIN_ADMIN = "NET_STATUS_CHAIN_ADMIN",
    HUB = "NET_STATUS_HUB",
    NODE = "NET_STATUS_NODE",
    RELAY = "NET_STATUS_RELAY",
    LEAVING = "NET_STATUS_LEAVING",
    LISTENING = "NET_STATUS_LISTENING",
    READY = "NET_STATUS_READY",
  }
  
  export interface NAR {
    recStatus: NetStatus;
    amtCoinR: number;
    nodeNum: number;
    nodeNum1: number;
    nodeNum2: number;
    acctNumRfdR: number;
    ipAddrR: number;
    ipPortNumR: number;
  }

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