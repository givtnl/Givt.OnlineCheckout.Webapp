export class Organisation {
  id: number;
  name: string;
  goal: string;
  amounts: AmountData[]

  constructor(id: number, name: string, goal: string, amounts: AmountData[]) {
    this.id = id;
    this.name = name;
    this.goal = goal;
    this.amounts = amounts;
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
  new Organisation(1, 'TestOrganisation', 'TestGoal', AmountData.fromAmounts([3,15,27])),
];
