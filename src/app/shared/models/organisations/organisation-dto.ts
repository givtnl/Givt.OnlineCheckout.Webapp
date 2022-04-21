export default class OrganisationDto {
    medium: string;
    organisationName: string;
    goal: string;
    amounts: number[];
    thankYou: string;
    currency: string;
    organisationLogoLink: string
    paymentMethods: string[]

    constructor(amounts: number[], goal: string, medium: string, organisationName: string, thankYou: string, currency: string, organisationLogoLink: string, paymentMethods: string[]) {
        this.amounts = amounts;
        this.goal = goal;
        this.medium = medium;
        this.organisationName = organisationName;
        this.thankYou = thankYou;
        this.currency = currency;
        this.organisationLogoLink = organisationLogoLink;
        this.paymentMethods = paymentMethods;
    }
}



