export class IncomingOrganisation {
  medium: string;
  organisationName: string;
  goal: string;
  amounts: number[];
  thankYou: string;
  currency: number

  constructor(amounts: number[], goal: string, medium: string, organisationName: string, thankYou: string, currency: number) {
    this.amounts = amounts;
    this.goal = goal;
    this.medium = medium;
    this.organisationName = organisationName;
    this.thankYou = thankYou
    this.currency = currency;
  }
}

export class Organisation {
  id: string;
  name: string;
  goal: string;
  amounts: AmountData[]
  thankYou: string
  currency: Currency

  constructor(id: string, name: string, goal: string, amounts: AmountData[], thankYou: string, currency: Currency) {
    this.id = id;
    this.name = name;
    this.goal = goal;
    this.amounts = amounts;
    this.thankYou = thankYou;
    this.currency = currency;
  }

  static fromIncomingOrganisation(incomingOrg: IncomingOrganisation) {
    return new Organisation(incomingOrg.medium, incomingOrg.organisationName, incomingOrg.goal, AmountData.fromAmounts(incomingOrg.amounts), incomingOrg.thankYou, incomingOrg.currency)
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
  new Organisation('','','',[], '', 0)
];

export class PaymentMethodId {
  paymentMethodId: string;

  constructor(paymentMethodId: string) {
    this.paymentMethodId = paymentMethodId;
  }
}

export enum Currency {
  EUR, GBP, USD
}

export function getCurrencySymbol(currency: Currency) {
  switch (currency) {
    case Currency.EUR:
      return '€'
    case Currency.GBP:
      return '£'
    case Currency.USD:
      return '$'
  }
}
