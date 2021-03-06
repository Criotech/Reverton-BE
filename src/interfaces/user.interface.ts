export interface IUser {
    fullName: string;
    email: string;
    gender?: string;
    title?: string;
    phone?: string;
    dob?: string;
    dp?: {
        url: string;
        id: string;
    };
    walletId?: string;
    password: string;
    emailVerificationExpires?: Date | string;
    emailVerificationToken?: string;
    resetPasswordToken?: string;
    isEmailVerified?: boolean;
    isAdmin?: boolean;
    estates?: string[]
};
