export default class TempUser {
    Email: string;
    IBAN: string;
    PhoneNumber: string;
    FirstName: string;
    LastName: string;
    Address: string;
    City: string;
    PostalCode: string;
    Country: string;
    Password: string;
    AmountLimit: number;
    AppLanguage: string;
    TimeZoneId: string;
    DeviceOS: number;

    constructor(tempUser: TempUser) {
        this.Email = tempUser.Email;
        this.IBAN = tempUser.IBAN;
        this.PhoneNumber = tempUser.PhoneNumber;
        this.FirstName = tempUser.FirstName;
        this.LastName = tempUser.LastName;
        this.Address = tempUser.Address;
        this.City = tempUser.City;
        this.PostalCode = tempUser.PostalCode;
        this.Country = tempUser.Country;
        this.Password = tempUser.Password;
        this.AmountLimit = tempUser.AmountLimit;
        this.AppLanguage = tempUser.AppLanguage;
        this.TimeZoneId = tempUser.TimeZoneId;
        this.DeviceOS = tempUser.DeviceOS;
    }
}
