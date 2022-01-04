export interface User {
    fullName: string;
    email: string;
    gender?: string;
    title?: string;
    password: string;
    emailVerificationExpires?: Date | string;
    emailVerificationToken?: string;
    resetPasswordToken?: string;
    isEmailVerified?: boolean;
    isAdmin?: boolean;
    estates?: string[]
};
