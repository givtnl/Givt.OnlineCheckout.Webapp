export default class AmountData {
  id: number;
  value: number;

  constructor(id: number, value: number) {
    this.id = id;
    this.value = value;
  }

  static fromAmounts(amounts: number[]): AmountData[] {
    let amountData: AmountData[] = [];
    for (let i = 0; i < amounts.length; i++) {
      amountData.push(new AmountData(i, amounts[i]));
    }
    return amountData;
  }
}

