import { registerAs } from '@nestjs/config'

export default registerAs('config', () => ({
  dev: process.env.NODE_ENV !== 'production',
  port: parseInt(process.env.PORT, 10) || 4134,
  db: {
    dbName: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    password: process.env.POSTGRES_PASSWORD,
    port: parseInt(`${process.env.POSTGRES_PORT}`, 10),
    user: process.env.POSTGRES_USER,
  },
  cognito: {
    userPoolId: process.env.COGNITO_USER_POOL_ID,
    clientId: process.env.COGNITO_CLIENT_ID,
    region: process.env.COGNITO_REGION,
    authority: `https://cognito-idp.${process.env.COGNITO_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}`,
  },
  smtp: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    host: process.env.SMTP_HOST,
  },
  apiKey: process.env.API_KEY,
  jwt: {
    secrete: process.env.JWT_SECRET,
    authSession: process.env.AUTH_SESSION_TTL,
  },
  registrationHost: process.env.REGISTRATION_HOST,
}))
