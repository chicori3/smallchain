import * as CryptoJS from "crypto-js";

class Block {
  public index: number;
  public hash: string;
  public previousHash: string;
  public data: string;
  public timestamp: number;

  // 블럭을 생성하지 않아도 사용할 수 있는 메서드 생성
  // static 메서드로 만들어야 사용할 수 있다
  static calculateBlockHash = (
    index: number,
    previousHash: string,
    timestamp: number,
    data: string
  ): string =>
    CryptoJS.SHA256(index + previousHash + timestamp + data).toString();

  constructor(
    index: number,
    hash: string,
    previousHash: string,
    data: string,
    timestamp: number
  ) {
    this.index = index;
    this.hash = hash;
    this.previousHash = previousHash;
    this.data = data;
    this.timestamp = timestamp;
  }
}

Block.calculateBlockHash(1, "adad", 1, "1ada");

const genesisBlock: Block = new Block(0, "22323232", "", "Hello", 1234);

let blockchain: Block[] = [genesisBlock]; // TS는 블록만 블록체인에 추가하게 된다

const getBlockChain = (): Block[] => blockchain;

const getLatestBlock = (): Block => blockchain[blockchain.length - 1];

const getNewTimestamp = (): Number => Math.round(new Date().getTime() / 1000);
