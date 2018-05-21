import { BigNumber } from "bignumber.js";
import ethUtil = require("ethereumjs-util");
import { LoopringSubmitParams, OrderParams } from "../util/types";
import { Order } from "./order";
import { Ring } from "./ring";

export class RingFactory {
  public loopringProtocolAddr: string;
  public eosAddress: string;
  public neoAddress: string;
  public lrcAddress: string;
  public qtumAddress: string;
  public currBlockTimeStamp: number;
  public authAddress: string;
  public walletAddr: string;

  constructor(loopringProtocolAddr: string,
              eosAddress: string,
              neoAddress: string,
              lrcAddress: string,
              qtumAddress: string,
              authAddress: string,
              currBlockTimeStamp: number) {
    this.loopringProtocolAddr = loopringProtocolAddr;
    this.eosAddress = eosAddress;
    this.neoAddress = neoAddress;
    this.lrcAddress = lrcAddress;
    this.qtumAddress = qtumAddress;
    this.authAddress = authAddress;
    this.currBlockTimeStamp = currBlockTimeStamp;
  }

  public async generateRingForCancel(order1Owner: string,
                                     order2Owner: string,
                                     ringOwner: string,
                                     feeSelections: number[]) {
    const orderPrams1 = {
      loopringProtocol: this.loopringProtocolAddr,
      tokenS: this.eosAddress,
      tokenB: this.neoAddress,
      amountS: new BigNumber(1000e18),
      amountB: new BigNumber(100e18),
      validSince: new BigNumber(this.currBlockTimeStamp),
      validUntil: new BigNumber((this.currBlockTimeStamp + 360000) + 110),
      lrcFee: new BigNumber(1e18),
      buyNoMoreThanAmountB: false,
      marginSplitPercentage: 0,
      authAddr: this.authAddress,
      walletAddr: this.walletAddr,
    };

    const orderPrams2 = {
      loopringProtocol: this.loopringProtocolAddr,
      tokenS: this.neoAddress,
      tokenB: this.eosAddress,
      amountS: new BigNumber(100e18),
      amountB: new BigNumber(1000e18),
      validSince: new BigNumber(this.currBlockTimeStamp),
      validUntil: new BigNumber((this.currBlockTimeStamp + 360000) + 120),
      lrcFee: new BigNumber(1e18),
      buyNoMoreThanAmountB: false,
      marginSplitPercentage: 0,
      authAddr: this.authAddress,
      walletAddr: this.walletAddr,
    };

    const order1 = new Order(order1Owner, orderPrams1);
    const order2 = new Order(order2Owner, orderPrams2);
    await order1.signAsync();
    await order2.signAsync();

    const ring = new Ring(ringOwner, [order1, order2], feeSelections);
    await ring.signAsync();

    return ring;
  }

  public async generateSize2Ring01(order1Owner: string,
                                   order2Owner: string,
                                   ringOwner: string,
                                   feeSelections: number[]) {
    const orderPrams1 = {
      loopringProtocol: this.loopringProtocolAddr,
      tokenS: this.eosAddress,
      tokenB: this.neoAddress,
      amountS: new BigNumber(1000e18),
      amountB: new BigNumber(100e18),
      validSince: new BigNumber(this.currBlockTimeStamp),
      validUntil: new BigNumber((this.currBlockTimeStamp + 360000) + 130),
      lrcFee: new BigNumber(10e18),
      buyNoMoreThanAmountB: false,
      marginSplitPercentage: 0,
      authAddr: this.authAddress,
      walletAddr: this.walletAddr,
    };

    const orderPrams2 = {
      loopringProtocol: this.loopringProtocolAddr,
      tokenS: this.neoAddress,
      tokenB: this.eosAddress,
      amountS: new BigNumber(100e18),
      amountB: new BigNumber(1000e18),
      validSince: new BigNumber(this.currBlockTimeStamp),
      validUntil: new BigNumber((this.currBlockTimeStamp + 360000) + 140),
      lrcFee: new BigNumber(5e18),
      buyNoMoreThanAmountB: false,
      marginSplitPercentage: 0,
      authAddr: this.authAddress,
      walletAddr: this.walletAddr,
    };

    const order1 = new Order(order1Owner, orderPrams1);
    const order2 = new Order(order2Owner, orderPrams2);
    await order1.signAsync();
    await order2.signAsync();

    const ring = new Ring(ringOwner, [order1, order2], feeSelections);
    await ring.signAsync();

    return ring;
  }

  public async generateSize2Ring01WithSameOrderOwners(orderOwner: string,
                                                      ringOwner: string,
                                                      feeSelections: number[]) {
    const orderPrams1 = {
      loopringProtocol: this.loopringProtocolAddr,
      tokenS: this.eosAddress,
      tokenB: this.neoAddress,
      amountS: new BigNumber(1000e18),
      amountB: new BigNumber(100e18),
      validSince: new BigNumber(this.currBlockTimeStamp),
      validUntil: new BigNumber((this.currBlockTimeStamp + 360000) + 130),
      lrcFee: new BigNumber(2e18),
      buyNoMoreThanAmountB: false,
      marginSplitPercentage: 0,
      authAddr: this.authAddress,
      walletAddr: this.walletAddr,
    };

    const orderPrams2 = {
      loopringProtocol: this.loopringProtocolAddr,
      tokenS: this.neoAddress,
      tokenB: this.eosAddress,
      amountS: new BigNumber(100e18),
      amountB: new BigNumber(1000e18),
      validSince: new BigNumber(this.currBlockTimeStamp),
      validUntil: new BigNumber((this.currBlockTimeStamp + 360000) + 140),
      lrcFee: new BigNumber(6e18),
      buyNoMoreThanAmountB: false,
      marginSplitPercentage: 0,
      authAddr: this.authAddress,
      walletAddr: this.walletAddr,
    };

    const order1 = new Order(orderOwner, orderPrams1);
    const order2 = new Order(orderOwner, orderPrams2);
    await order1.signAsync();
    await order2.signAsync();

    const ring = new Ring(ringOwner, [order1, order2], feeSelections);
    await ring.signAsync();

    return ring;
  }

  public async generateSize2Ring02(order1Owner: string,
                                   order2Owner: string,
                                   ringOwner: string,
                                   feeSelections: number[]) {

    const orderPrams1 = {
      loopringProtocol: this.loopringProtocolAddr,
      tokenS: this.eosAddress,
      tokenB: this.neoAddress,
      amountS: new BigNumber(1000e18),
      amountB: new BigNumber(100e18),
      validSince: new BigNumber(this.currBlockTimeStamp),
      validUntil: new BigNumber((this.currBlockTimeStamp + 360000) + 150),
      lrcFee: new BigNumber(0),
      buyNoMoreThanAmountB: false,
      marginSplitPercentage: 100,
      authAddr: this.authAddress,
      walletAddr: this.walletAddr,
    };

    const orderPrams2 = {
      loopringProtocol: this.loopringProtocolAddr,
      tokenS: this.neoAddress,
      tokenB: this.eosAddress,
      amountS: new BigNumber(50e18),
      amountB: new BigNumber(450e18),
      validSince: new BigNumber(this.currBlockTimeStamp),
      validUntil: new BigNumber((this.currBlockTimeStamp + 360000) + 160),
      lrcFee: new BigNumber(0),
      buyNoMoreThanAmountB: false,
      marginSplitPercentage: 45,
      authAddr: this.authAddress,
      walletAddr: this.walletAddr,
    };

    const order1 = new Order(order1Owner, orderPrams1);
    const order2 = new Order(order2Owner, orderPrams2);
    await order1.signAsync();
    await order2.signAsync();

    const ring = new Ring(ringOwner, [order1, order2], feeSelections);
    await ring.signAsync();

    return ring;
  }

  public async generateSize2Ring03(order1Owner: string,
                                   order2Owner: string,
                                   ringOwner: string,
                                   feeSelections: number[]) {
    const orderPrams1: OrderParams = {
      loopringProtocol: this.loopringProtocolAddr,
      tokenS: this.eosAddress,
      tokenB: this.neoAddress,
      amountS: new BigNumber(1000e18),
      amountB: new BigNumber(100e18),
      validSince: new BigNumber(this.currBlockTimeStamp),
      validUntil: new BigNumber((this.currBlockTimeStamp + 360000) + 210),
      lrcFee: new BigNumber(0),
      buyNoMoreThanAmountB: true,
      marginSplitPercentage: 65,
      authAddr: this.authAddress,
      walletAddr: this.walletAddr,
    };

    const orderPrams2: OrderParams = {
      loopringProtocol: this.loopringProtocolAddr,
      tokenS: this.neoAddress,
      tokenB: this.eosAddress,
      amountS: new BigNumber(50e18),
      amountB: new BigNumber(450e18),
      validSince: new BigNumber(this.currBlockTimeStamp),
      validUntil: new BigNumber((this.currBlockTimeStamp + 360000) + 211),
      lrcFee: new BigNumber(5e17),
      buyNoMoreThanAmountB: false,
      marginSplitPercentage: 45,
      authAddr: this.authAddress,
      walletAddr: this.walletAddr,
    };

    const order1 = new Order(order1Owner, orderPrams1);
    const order2 = new Order(order2Owner, orderPrams2);
    await order1.signAsync();
    await order2.signAsync();

    const ring = new Ring(ringOwner, [order1, order2], feeSelections);
    await ring.signAsync();

    return ring;
  }

  public async generateSize3Ring01(order1Owner: string,
                                   order2Owner: string,
                                   order3Owner: string,
                                   ringOwner: string,
                                   feeSelections: number[]) {
    const orderPrams1: OrderParams = {
      loopringProtocol: this.loopringProtocolAddr,
      tokenS: this.eosAddress,
      tokenB: this.neoAddress,
      amountS: new BigNumber(80000e18),
      amountB: new BigNumber(12345e18),
      validSince: new BigNumber(this.currBlockTimeStamp),
      validUntil: new BigNumber((this.currBlockTimeStamp + 360000) + 310),
      lrcFee: new BigNumber(0),
      buyNoMoreThanAmountB: true,
      marginSplitPercentage: 55,
      authAddr: this.authAddress,
      walletAddr: this.walletAddr,
    };

    const orderPrams2: OrderParams = {
      loopringProtocol: this.loopringProtocolAddr,
      tokenS: this.neoAddress,
      tokenB: this.qtumAddress,
      amountS: new BigNumber(234e18),
      amountB: new BigNumber(543e18),
      validSince: new BigNumber(this.currBlockTimeStamp),
      validUntil: new BigNumber((this.currBlockTimeStamp + 360000) + 311),
      lrcFee: new BigNumber(6e18),
      buyNoMoreThanAmountB: false,
      marginSplitPercentage: 0,
      authAddr: this.authAddress,
      walletAddr: this.walletAddr,
    };

    const orderPrams3: OrderParams = {
      loopringProtocol: this.loopringProtocolAddr,
      tokenS: this.qtumAddress,
      tokenB: this.eosAddress,
      amountS: new BigNumber(6780e18),
      amountB: new BigNumber(18100e18),
      validSince: new BigNumber(this.currBlockTimeStamp),
      validUntil: new BigNumber((this.currBlockTimeStamp + 360000) + 312),
      lrcFee: new BigNumber(0),
      buyNoMoreThanAmountB: false,
      marginSplitPercentage: 60,
      authAddr: this.authAddress,
      walletAddr: this.walletAddr,
    };

    const order1 = new Order(order1Owner, orderPrams1);
    const order2 = new Order(order2Owner, orderPrams2);
    const order3 = new Order(order3Owner, orderPrams3);
    await order1.signAsync();
    await order2.signAsync();
    await order3.signAsync();

    const ring = new Ring(ringOwner, [order1, order2, order3], feeSelections);
    await ring.signAsync();

    return ring;
  }

  public async generateSize3Ring02(order1Owner: string,
                                   order2Owner: string,
                                   order3Owner: string,
                                   ringOwner: string,
                                   salt: number,
                                   feeSelections: number[]) {
    const orderPrams1: OrderParams = {
      loopringProtocol: this.loopringProtocolAddr,
      tokenS: this.eosAddress,
      tokenB: this.neoAddress,
      amountS: new BigNumber(80000e18),
      amountB: new BigNumber(12345e18),
      validSince: new BigNumber(this.currBlockTimeStamp - salt),
      validUntil: new BigNumber((this.currBlockTimeStamp + 360000) + 320),
      lrcFee: new BigNumber(0),
      buyNoMoreThanAmountB: true,
      marginSplitPercentage: 55,
      authAddr: this.authAddress,
      walletAddr: this.walletAddr,
    };

    const orderPrams2: OrderParams = {
      loopringProtocol: this.loopringProtocolAddr,
      tokenS: this.neoAddress,
      tokenB: this.qtumAddress,
      amountS: new BigNumber(234e18),
      amountB: new BigNumber(543e18),
      validSince: new BigNumber(this.currBlockTimeStamp - salt),
      validUntil: new BigNumber((this.currBlockTimeStamp + 360000) + 321),
      lrcFee: new BigNumber(6e18),
      buyNoMoreThanAmountB: false,
      marginSplitPercentage: 0,
      authAddr: this.authAddress,
      walletAddr: this.walletAddr,
    };

    const orderPrams3: OrderParams = {
      loopringProtocol: this.loopringProtocolAddr,
      tokenS: this.qtumAddress,
      tokenB: this.eosAddress,
      amountS: new BigNumber(6780e18),
      amountB: new BigNumber(18100e18),
      validSince: new BigNumber(this.currBlockTimeStamp - salt),
      validUntil: new BigNumber((this.currBlockTimeStamp + 360000) + 322),
      lrcFee: new BigNumber(0),
      buyNoMoreThanAmountB: false,
      marginSplitPercentage: 60,
      authAddr: this.authAddress,
      walletAddr: this.walletAddr,
    };

    const order1 = new Order(order1Owner, orderPrams1);
    const order2 = new Order(order2Owner, orderPrams2);
    const order3 = new Order(order3Owner, orderPrams3);
    await order1.signAsync();
    await order2.signAsync();
    await order3.signAsync();

    const ring = new Ring(ringOwner, [order1, order2, order3], feeSelections);
    await ring.signAsync();

    return ring;
  }

  public async generateSize3Ring03(order1Owner: string,
                                   order2Owner: string,
                                   order3Owner: string,
                                   ringOwner: string,
                                   salt: number,
                                   feeSelections: number[]) {
    const orderPrams1: OrderParams = {
      loopringProtocol: this.loopringProtocolAddr,
      tokenS: this.eosAddress,
      tokenB: this.lrcAddress,
      amountS: new BigNumber(1000e18),
      amountB: new BigNumber(8000e18),
      validSince: new BigNumber(this.currBlockTimeStamp - salt),
      validUntil: new BigNumber((this.currBlockTimeStamp + 360000) + 330),
      lrcFee: new BigNumber(10e18),
      buyNoMoreThanAmountB: true,
      marginSplitPercentage: 55,
      authAddr: this.authAddress,
      walletAddr: this.walletAddr,
    };

    const orderPrams2: OrderParams = {
      loopringProtocol: this.loopringProtocolAddr,
      tokenS: this.lrcAddress,
      tokenB: this.neoAddress,
      amountS: new BigNumber(2000e18),
      amountB: new BigNumber(10e18),
      validSince: new BigNumber(this.currBlockTimeStamp - salt),
      validUntil: new BigNumber((this.currBlockTimeStamp + 360000) + 331),
      lrcFee: new BigNumber(6e18),
      buyNoMoreThanAmountB: false,
      marginSplitPercentage: 0,
      authAddr: this.authAddress,
      walletAddr: this.walletAddr,
    };

    const orderPrams3: OrderParams = {
      loopringProtocol: this.loopringProtocolAddr,
      tokenS: this.neoAddress,
      tokenB: this.eosAddress,
      amountS: new BigNumber(20e18),
      amountB: new BigNumber(450e18),
      validSince: new BigNumber(this.currBlockTimeStamp - salt),
      validUntil: new BigNumber((this.currBlockTimeStamp + 360000) + 332),
      lrcFee: new BigNumber(1e18),
      buyNoMoreThanAmountB: false,
      marginSplitPercentage: 60,
      authAddr: this.authAddress,
      walletAddr: this.walletAddr,
    };

    const order1 = new Order(order1Owner, orderPrams1);
    const order2 = new Order(order2Owner, orderPrams2);
    const order3 = new Order(order3Owner, orderPrams3);
    await order1.signAsync();
    await order2.signAsync();
    await order3.signAsync();

    const ring = new Ring(ringOwner, [order1, order2, order3], feeSelections);
    await ring.signAsync();

    return ring;
  }

  public caculateRateAmountS(ring: Ring) {
    let rate: number = 1;
    const result: BigNumber[] = [];
    const size = ring.orders.length;
    for (let i = 0; i < size; i++) {
      const order = ring.orders[i];
      rate = rate * order.params.amountS.toNumber() / order.params.amountB.toNumber();
    }

    rate = Math.pow(rate, -1 / size);

    for (let i = 0; i < size; i ++) {
      const order = ring.orders[i];
      const rateAmountS = order.params.amountS.toNumber() * rate;
      const rateSBigNumber = new BigNumber(rateAmountS.toPrecision(15));
      result.push(rateSBigNumber);
    }

    return result;
  }

  public bnToHex(x: BigNumber) {
    return web3.toHex(x).substring(2).padStart(64, "0");
  }

  public addressToHex(x: string) {
    return "000000000000000000000000" + x.substring(2);
  }

  public padRight(x: string, n: number) {
    for (let i = 0; i < n; i++) {
        x = x + "0";
    }
    return x;
  }

  public addressXOR(s1: string, s2: string) {
    const buf1 = Buffer.from(s1.slice(2), "hex");
    const buf2 = Buffer.from(s2.slice(2), "hex");
    const res = Buffer.alloc(32);
    for (let i = 0; i < 32; i++) {
      res[i] = buf1[i] ^ buf2[i];
    }
    const strRes = ethUtil.bufferToHex(res);
    return strRes;
  }

  public ringToSubmitableParams(ring: Ring,
                                feeSelectionList: number[],
                                feeRecepient: string) {
    const ringSize = ring.orders.length;
    const addressList: string[][] = [];
    const uintArgsList: BigNumber[][] = [];
    const uint8ArgsList: number[][] = [];
    const buyNoMoreThanAmountBList: boolean[] = [];
    const vList: number[] = [];
    const rList: string[] = [];
    const sList: string[] = [];
    let data = "0x";

    const rateAmountSList = this.caculateRateAmountS(ring);
    // console.log("rateAmountSList", rateAmountSList);

    const ringSizeHex = this.bnToHex(new BigNumber(ringSize));
    const feeSelectionHex = this.bnToHex(new BigNumber(this.feeSelectionListToNumber(feeSelectionList)));
    const feeRecipientHex = this.addressToHex(feeRecepient);

    let ringHeaderData = "";
    ringHeaderData += ringSizeHex.substring(64 - 2);
    ringHeaderData += feeSelectionHex.substring(64 - 4);
    ringHeaderData += feeRecipientHex.substring(64 - 40);
    data += this.padRight(ringHeaderData, 64 - ringHeaderData.length);

    for (let i = 0; i < ringSize; i++) {
      const order = ring.orders[i];
      const addressListItem = [order.owner,
                               order.params.tokenS,
                               order.params.walletAddr,
                               order.params.authAddr];

      addressList.push(addressListItem);

      const uintArgsListItem = [
        order.params.amountS,
        order.params.amountB,
        order.params.validSince,
        order.params.validUntil,
        order.params.lrcFee,
        rateAmountSList[i],
      ];
      uintArgsList.push(uintArgsListItem);

      const uint8ArgsListItem = [order.params.marginSplitPercentage];
      // console.log("uint8ArgsListItem", uint8ArgsListItem);

      uint8ArgsList.push(uint8ArgsListItem);

      buyNoMoreThanAmountBList.push(order.params.buyNoMoreThanAmountB);

      vList.push(order.params.v);
      rList.push(order.params.r);
      sList.push(order.params.s);

      let authAddrHex = this.addressToHex(order.params.authAddr);
      let walletAddrHex = this.addressToHex(order.params.walletAddr);
      let ringAuthRHex = ring.authR[i].substring(2);
      let ringAuthSHex = ring.authS[i].substring(2);
      let ringAuthV = ring.authV[i];
      if (i > 0) {
        // Do some simple XOR compression
        const previousOrder = ring.orders[i - 1];
        authAddrHex = this.addressXOR(previousOrder.params.authAddr, order.params.authAddr).slice(2);
        walletAddrHex = this.addressXOR(previousOrder.params.walletAddr, order.params.walletAddr).slice(2);
        ringAuthRHex = this.addressXOR(ring.authR[i - 1], ring.authR[i]).slice(2);
        ringAuthSHex = this.addressXOR(ring.authS[i - 1], ring.authS[i]).slice(2);
        ringAuthV = ring.authV[i - 1] ^ ring.authV[i];
      }

      data += this.addressToHex(order.owner);
      data += this.addressToHex(order.params.tokenS);
      data += walletAddrHex;
      data += authAddrHex;

      data += this.bnToHex(order.params.validSince);
      data += this.bnToHex(order.params.validUntil);
      data += this.bnToHex(order.params.amountS);
      data += this.bnToHex(order.params.amountB);
      data += this.bnToHex(order.params.lrcFee);
      data += this.bnToHex(rateAmountSList[i]);

      data += ringAuthRHex;
      data += ringAuthSHex;

      data += order.params.r.substring(2);
      data += order.params.s.substring(2);

      let packedData = 0;
      packedData += (order.params.v << 16);
      packedData += (ringAuthV << 8);
      packedData += ((order.params.buyNoMoreThanAmountB ? 1 : 0) << 7) + order.params.marginSplitPercentage;
      data += this.bnToHex(new BigNumber(packedData)).substring(58);
    }

    // console.log("Data: ", data);

    vList.push(...ring.authV);
    rList.push(...ring.authR);
    sList.push(...ring.authS);

    // vList.push(ring.v);
    // rList.push(ring.r);
    // sList.push(ring.s);

    const submitParams = {
      addressList,
      uintArgsList,
      uint8ArgsList,
      buyNoMoreThanAmountBList,
      vList,
      rList,
      sList,
      ringOwner: ring.owner,
      feeRecepient,
      feeSelections: this.feeSelectionListToNumber(feeSelectionList),
      data,
    };

    return submitParams;
  }

  public feeSelectionListToNumber(feeSelections: number[]) {
    let res = 0;
    for (let i = 0; i < feeSelections.length; i ++) {
      res += feeSelections[i] << i;
    }

    return res;
  }

}
