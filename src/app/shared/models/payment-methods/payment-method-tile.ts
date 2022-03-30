export default class PaymentMethodTile {
    id: string;
    name: string;
    imgLoc: string;

    constructor(id: string, name: string, imgLoc: string) {
        this.id = id;
        this.name = name;
        this.imgLoc = imgLoc;
    }
}
