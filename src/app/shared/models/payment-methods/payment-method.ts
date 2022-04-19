import {PaymentMethodType} from "./payment-method-enum";
import {PaymentMethodDto} from "./payment-method-dto";

export default class PaymentMethod {
    private static imgFolder = "../../../assets/paymentMethodIcons/"

    private static paymentMethodTiles: PaymentMethod[] = [
        new PaymentMethod("bc", "Bancontact", PaymentMethod.imgFolder + "bancontact.svg", PaymentMethodType.Bancontact),
        new PaymentMethod("cc", "Credit card", PaymentMethod.imgFolder + "cc.svg", PaymentMethodType.Card),
        new PaymentMethod("id", "Ideal", PaymentMethod.imgFolder + "ideal.svg", PaymentMethodType.Ideal),
        new PaymentMethod("sf", "Sofort", PaymentMethod.imgFolder + "sofort.svg", PaymentMethodType.Sofort),
        new PaymentMethod("gi", "Giropay", PaymentMethod.imgFolder + "cc.svg", PaymentMethodType.Giropay),
        new PaymentMethod("ep", "EPS", PaymentMethod.imgFolder + "cc.svg", PaymentMethodType.EPS),
        new PaymentMethod("ap", "Apple Pay", PaymentMethod.imgFolder + "apay.svg", PaymentMethodType.ApplePay),
        new PaymentMethod("gp", "Google Pay", PaymentMethod.imgFolder + "gpay.svg", PaymentMethodType.GooglePay),
    ]

    id: string;
    name: string;
    imgLoc: string;
    paymentMethod: PaymentMethodType;

    constructor(id: string, name: string, imgLoc: string, paymentMethod: PaymentMethodType) {
        this.id = id;
        this.name = name;
        this.imgLoc = imgLoc;
        this.paymentMethod = paymentMethod;
    }

    static fromPaymentMethodDto(dto: PaymentMethodDto): PaymentMethod {
        return this.paymentMethodTiles[dto.index];
    }
}
