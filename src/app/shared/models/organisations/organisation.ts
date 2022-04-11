import AmountData from "../donations/amount-data";
import OrganisationDto from "./organisation-dto";
import PaymentMethodTile from "../payment-methods/payment-method-tile";

export default class Organisation {
  id: string;
  name: string;
  goal: string;
  amounts: AmountData[];
  thankYou: string;
  currency: string;
  logoLink: string;
  paymentMethods: PaymentMethodTile[]

  constructor(id: string, name: string, goal: string, amounts: AmountData[], thankYou: string, currency: string, logoLink: string, paymentMethods: PaymentMethodTile[]) {
    this.id = id;
    this.name = name;
    this.goal = goal;
    this.amounts = amounts;
    this.thankYou = thankYou;
    this.currency = currency;
    this.logoLink = logoLink;
    this.paymentMethods = paymentMethods;
  }

  static fromIncomingOrganisation(incomingOrg: OrganisationDto) {
    return new Organisation(incomingOrg.medium, incomingOrg.organisationName, incomingOrg.goal, AmountData.fromAmounts(incomingOrg.amounts), incomingOrg.thankYou, incomingOrg.currency, incomingOrg.organisationLogoLink, incomingOrg.paymentMethods.map(pm => PaymentMethodTile.fromPaymentMethod(pm)));
  }
}
