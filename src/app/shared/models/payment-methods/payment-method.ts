export default class PaymentMethod {
  paymentMethodId: string;
  token: string

  constructor(paymentMethodId: string, token: string) {
    this.paymentMethodId = paymentMethodId;
    this.token = token;
  }
}
