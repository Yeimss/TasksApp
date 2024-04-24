export interface LoginResponse{
    tokenType?: string,
    accessToken?: string,
    expiresIn?: 0,
    refreshToken?: string
}

export interface LogedUser{
  tokenInfo: LoginResponse,
  emailUser: string
}