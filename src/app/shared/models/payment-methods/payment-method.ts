import { PaymentMethodDto } from './payment-method-dto';

export default class PaymentMethod {
    private static imgFolder = '../../../assets/paymentMethodIcons/';

    private static paymentMethodTiles: PaymentMethod[] = [
        new PaymentMethod(
            'bancontact',
            'Bancontact',
            PaymentMethod.imgFolder + 'bancontact.svg'
        ),
        new PaymentMethod(
            'card',
            'Credit card',
            PaymentMethod.imgFolder + 'cc.svg'
        ),
        new PaymentMethod(
            'ideal',
            'Ideal',
            PaymentMethod.imgFolder + 'ideal.svg'
        ),
        new PaymentMethod(
            'sofort',
            'Sofort',
            PaymentMethod.imgFolder + 'sofort.svg'
        ),
        new PaymentMethod(
            'giropay',
            'Giropay',
            PaymentMethod.imgFolder + 'cc.svg'
        ),
        new PaymentMethod('eps', 'EPS', PaymentMethod.imgFolder + 'cc.svg'),
        new PaymentMethod(
            'applepay',
            'Apple Pay',
            PaymentMethod.imgFolder + 'apay.svg'
        ),
        new PaymentMethod(
            'googlepay',
            'Google Pay',
            PaymentMethod.imgFolder + 'gpay.svg'
        ),
        new PaymentMethod('wepay', 'WePay', PaymentMethod.imgFolder + 'cc.svg'),
    ];

    id: string;
    name: string;
    imgLoc: string;

    constructor(id: string, name: string, imgLoc: string) {
        this.id = id;
        this.name = name;
        this.imgLoc = imgLoc;
    }

    static fromPaymentMethodDto(dto: PaymentMethodDto): PaymentMethod {
        var paymentMehod = this.paymentMethodTiles.find((x) => x.id == dto.id);
        if (!paymentMehod) {
            throw new Error(`Payment method with id ${dto.id} was not found!`);
        }
        return paymentMehod;
    }
}
