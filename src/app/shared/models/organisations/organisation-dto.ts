export default class OrganisationDto {
    medium: string;
    organisationName: string;
    goal: string;
    amounts: number[];
    thankYou: string;
    currency: string;
    organisationLogoLink: string
    country: any;
    title: string;
    wantKnowMoreLink: string;
    privacyPolicyLink: string;
    paymentMethods: string[]

    constructor(amounts: number[], goal: string, medium: string, organisationName: string, thankYou: string, currency: string, organisationLogoLink: string, country: string, paymentMethods: string[], title: string, wantKnowMoreLink: string, privacyPolicyLink: string) {
        this.amounts = amounts;
        this.goal = goal;
        this.medium = medium;
        this.organisationName = organisationName;
        this.thankYou = thankYou;
        this.currency = currency;
        this.organisationLogoLink = organisationLogoLink;
        this.country = country;
        this.title = title;
        this.wantKnowMoreLink = wantKnowMoreLink;
        this.privacyPolicyLink = privacyPolicyLink;
        this.paymentMethods = paymentMethods;
    }
}



