export default class RegisteredUser {
    email: string;
    userId: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
    deviceOS: number;

    postalCode: string;
    country: string;
    password: string;

    appLanguage: string;
    timeZoneId: string;

    constructor(regUser: RegisteredUser) {
        this.email = regUser.email;
        this.userId = regUser.userId;
        this.phoneNumber = regUser.phoneNumber;
        this.firstName = regUser.firstName;
        this.lastName = regUser.lastName;
        this.deviceOS = regUser.deviceOS;
        this.postalCode = regUser.postalCode;
        this.country = regUser.country;
        this.password = regUser.password;
        this.appLanguage = regUser.appLanguage;
        this.timeZoneId = regUser.timeZoneId;
    }
}
