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

}


export const DATA = [
  new Organisation(1, 'TestOrganisation', 'TestGoal', [new AmountData(1, 5), new AmountData(2, 10), new AmountData(3, 15)]),
];
