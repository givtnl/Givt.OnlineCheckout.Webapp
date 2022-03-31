import { PaymentMethodType } from "./payment-method-enum";

export default class PaymentMethodTile {
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
}
