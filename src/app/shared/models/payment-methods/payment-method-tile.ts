import {PaymentMethodType} from "./payment-method-enum";

export default class PaymentMethodTile {
    private static imgFolder = "../../../assets/paymentMethodIcons/"

    private static paymentMethodTiles: PaymentMethodTile[] = [
        new PaymentMethodTile("bc", "Bancontact", PaymentMethodTile.imgFolder + "bancontact.svg", PaymentMethodType.Bancontact),
        new PaymentMethodTile("cc", "Credit card", PaymentMethodTile.imgFolder + "cc.svg", PaymentMethodType.Card),
        new PaymentMethodTile("id", "Ideal", PaymentMethodTile.imgFolder + "ideal.svg", PaymentMethodType.Ideal),
        new PaymentMethodTile("sf", "Sofort", PaymentMethodTile.imgFolder + "sofort.svg", PaymentMethodType.Sofort),
        new PaymentMethodTile("gi", "Giropay", PaymentMethodTile.imgFolder + "cc.svg", PaymentMethodType.Giropay),
        new PaymentMethodTile("ep", "EPS", PaymentMethodTile.imgFolder + "cc.svg", PaymentMethodType.EPS),
        new PaymentMethodTile("ap", "Apple Pay", PaymentMethodTile.imgFolder + "apay.svg", PaymentMethodType.ApplePay),
        new PaymentMethodTile("gp", "Google Pay", PaymentMethodTile.imgFolder + "gpay.svg", PaymentMethodType.GooglePay),
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

    static fromPaymentMethod(pm: number): PaymentMethodTile {
        return this.paymentMethodTiles[pm];
    }
}
