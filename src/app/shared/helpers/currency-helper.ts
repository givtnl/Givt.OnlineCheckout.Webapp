export class CurrencyHelper {
    static getCurrencySymbol(currency: string) {
        switch (currency) {
            case 'EUR':
                return '€'
            case 'GBP':
                return '£'
            case 'USD':
                return '$'
            default:
                return ''
        }
    }

    static isValidCustomAmount(amount: number): boolean {
        return amount >= .5 && amount <= 25000;
    }
}