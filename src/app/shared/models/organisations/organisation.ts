import AmountData from "../donations/amount-data";
import OrganisationDto from "./organisation-dto";
import PaymentMethod from "../payment-methods/payment-method";
import {PaymentMethodDto} from "../payment-methods/payment-method-dto";

export default class Organisation {
    id: string;
    name: string;
    goal: string;
    amounts: AmountData[];
    thankYou: string;
    currency: string;
    logoLink: string;
    country: string;
    title: string;
    wantKnowMoreLink: string;
    privacyPolicyLink: string;
    paymentMethods: PaymentMethod[]

    constructor(id: string, name: string, goal: string, amounts: AmountData[], thankYou: string, currency: string, logoLink: string, country: string, title: string, wantKnowMoreLink: string, privacyPolicyLink: string, paymentMethods: PaymentMethod[]) {
        this.id = id;
        this.name = name;
        this.goal = goal;
        this.amounts = amounts;
        this.thankYou = thankYou;
        this.currency = currency;
        this.logoLink = logoLink;
        this.country = country;
        this.title = title;
        this.wantKnowMoreLink = wantKnowMoreLink;
        this.privacyPolicyLink = privacyPolicyLink;
        this.paymentMethods = paymentMethods;
    }

    static fromOrganisationDto(organisationDto: OrganisationDto) {
        return new Organisation(organisationDto.medium, organisationDto.organisationName, organisationDto.goal, AmountData.fromAmounts(organisationDto.amounts, organisationDto.currency), organisationDto.thankYou, organisationDto.currency, organisationDto.organisationLogoLink, organisationDto.country, organisationDto.title, organisationDto.wantKnowMoreLink, organisationDto.privacyPolicyLink, organisationDto.paymentMethods
            .map(pm => {
                return PaymentMethod.fromPaymentMethodDto(new PaymentMethodDto(pm))
            })
        );
    }
}
