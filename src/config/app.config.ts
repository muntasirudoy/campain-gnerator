
export const appConfig = {
  apiBaseUrl: 'https://test.api.chutneyads.com/api/v1',
  tokenKey: 'auth_token',
  refreshTokenKey: 'refresh_token',
  userKey: 'auth_user',
  tokenExpirationBuffer: 5 * 60 * 1000, 
} as const

export type AppConfig = typeof appConfig
