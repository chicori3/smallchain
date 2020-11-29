import * as CryptoJS from "crypto-js";

class Block {
  // 블럭을 생성하지 않아도 사용할 수 있는 메서드 생성
  // static 메서드로 만들어야 사용할 수 있다
  static calculateBlockHash = (
    index: number,
    previousHash: string,
    timestamp: number,
    data: string
  ): string =>
    CryptoJS.SHA256(index + previousHash + timestamp + data).toString();

  // 블럭의 구조가 유효한 지 판단하는 함수
  static validateStructre = (aBlock: Block): boolean =>
    typeof aBlock.index === "number" &&
    typeof aBlock.hash === "string" &&
    typeof aBlock.previousHash === "string" &&
    typeof aBlock.timestamp === "number" &&
    typeof aBlock.data === "string";

  public index: number;
  public hash: string;
  public previousHash: string;
  public data: string;
  public timestamp: number;

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

const getNewTimestamp = (): number => Math.round(new Date().getTime() / 1000);

const createNewBlock = (data: string): Block => {
  const previousBlock: Block = getLatestBlock();
  const newIndex: number = previousBlock.index + 1;
  const newTimestamp: number = getNewTimestamp();
  const newHash: string = Block.calculateBlockHash(
    newIndex,
    previousBlock.hash,
    newTimestamp,
    data
  );
  const newBlock: Block = new Block(
    newIndex,
    newHash,
    previousBlock.hash,
    data,
    newTimestamp
  );
  return newBlock;
};

// candidateBlock과 previousBlock을 인자로 받고 유효하지 않으면 false를 리턴
const isBlockValid = (candidateBlock: Block, previousBlock: Block): boolean => {
  if (!Block.validateStructre(candidateBlock)) {
    return false;
  } else if (previousBlock.index + 1 !== candidateBlock.index) {
    return false;
  } else if (previousBlock.hash !== candidateBlock.hash) {
    return false;
  }

  // switch (Block.validateStructre(candidateBlock)) {
  //   case !Block.validateStructre(candidateBlock):
  //     return false;
  //   case previousBlock.index + 1 !== candidateBlock.index:
  //     return false;
  //   case previousBlock.hash !== candidateBlock.hash:
  //     return false;
  // }
};
