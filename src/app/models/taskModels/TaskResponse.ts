export interface TaskRessponse{
    id : any,
    title:string,
    detail:string,
    dueDate: Date,
    isComplete: boolean,
    IdentityUser: FullUser
}
interface FullUser{
    id: string,
    userName: string,
    normalizedUserName: string,
    email: string,
    normalizedEmail: string,
    emailConfirmed: boolean,
    passwordHash: string,
    securityStamp: string,
    concurrencyStamp: string,
    phoneNumber: string,
    phoneNumberConfirmed: boolean,
    twoFactorEnabled: boolean,
    lockoutEnd: Date,
    lockoutEnabled: boolean,
    accessFailedCount: 0
}