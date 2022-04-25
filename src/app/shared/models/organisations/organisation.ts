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
    paymentMethods: PaymentMethod[]

    constructor(id: string, name: string, goal: string, amounts: AmountData[], thankYou: string, currency: string, logoLink: string, paymentMethods: PaymentMethod[]) {
        this.id = id;
        this.name = name;
        this.goal = goal;
        this.amounts = amounts;
        this.thankYou = thankYou;
        this.currency = currency;
        this.logoLink = logoLink;
        this.paymentMethods = paymentMethods;
    }

    static fromOrganisationDto(organisationDto: OrganisationDto) {
        return new Organisation(organisationDto.medium, organisationDto.organisationName, organisationDto.goal, AmountData.fromAmounts(organisationDto.amounts), organisationDto.thankYou, organisationDto.currency, organisationDto.organisationLogoLink, organisationDto.paymentMethods
            .filter(pm => {
                console.log(pm)
                return !(pm === 'applepay' || pm === 'googlepay');
            }).map(pm => {
                return PaymentMethod.fromPaymentMethodDto(new PaymentMethodDto(pm))
            })
        );
    }
}
