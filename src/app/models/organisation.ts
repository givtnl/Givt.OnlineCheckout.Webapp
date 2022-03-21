export class IncomingOrganisation {
  amounts: number[];
  goal: string;
  medium: string;
  organisationName: string;
  thankYou: string;

  constructor(amounts: number[], goal: string, medium: string, organisationName: string, thankYou: string) {
    this.amounts = amounts;
    this.goal = goal;
    this.medium = medium;
    this.organisationName = organisationName;
    this.thankYou = thankYou
  }
}

export class Organisation {
  id: number;
  name: string;
  goal: string;
  amounts: AmountData[]
  thankYou: string

  constructor(id: number, name: string, goal: string, amounts: AmountData[], thankYou: string) {
    this.id = id;
    this.name = name;
    this.goal = goal;
    this.amounts = amounts;
    this.thankYou = thankYou;
  }
}

export class AmountData {
  id: number;
  value: number;

  constructor(id: number, value: number) {
    this.id = id;
    this.value = value;
  }

  static fromAmounts(amounts: number[]): AmountData[] {
    let amountData: AmountData[] = [];
    for (let i = 0; i < amounts.length; i++) {
      amountData.push(new AmountData(i, amounts[i]))
    }
    return amountData
  }
}

export const DATA = [
  new Organisation(0,'','',[], '')
];
