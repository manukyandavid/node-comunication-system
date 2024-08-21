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