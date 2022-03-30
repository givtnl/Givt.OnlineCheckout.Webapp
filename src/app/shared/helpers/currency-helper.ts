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
}