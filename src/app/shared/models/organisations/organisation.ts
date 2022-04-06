import AmountData from "../donations/amount-data";
import OrganisationDto from "./organisation-dto";

export default class Organisation {
  id: string;
  name: string;
  goal: string;
  amounts: AmountData[];
  thankYou: string;
  currency: string;
  logoLink: string;

  constructor(id: string, name: string, goal: string, amounts: AmountData[], thankYou: string, currency: string, logoLink: string) {
    this.id = id;
    this.name = name;
    this.goal = goal;
    this.amounts = amounts;
    this.thankYou = thankYou;
    this.currency = currency;
    this.logoLink = logoLink;
  }

  static fromIncomingOrganisation(incomingOrg: OrganisationDto) {
    return new Organisation(incomingOrg.medium, incomingOrg.organisationName, incomingOrg.goal, AmountData.fromAmounts(incomingOrg.amounts), incomingOrg.thankYou, incomingOrg.currency, incomingOrg.organisationLogoLink);
  }
}
