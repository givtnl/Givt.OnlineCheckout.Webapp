export default class AmountData {
  id: number;
  value: number;
  localString: string;

  constructor(id: number, value: number, currency: string) {
    this.id = id;
    this.value = value;
    if (currency === 'EUR') {
        this.localString = value.toLocaleString(navigator.language, {maximumFractionDigits: 2}).replace('.', ',')
    } else {
        this.localString = value.toLocaleString(navigator.language, {maximumFractionDigits: 2})
    }
  }

  static fromAmounts(amounts: number[], currency: string): AmountData[] {
    let amountData: AmountData[] = [];
    for (let i = 0; i < amounts.length; i++) {
      amountData.push(new AmountData(i, amounts[i], currency));
    }
    return amountData;
  }
}

