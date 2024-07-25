import { Environment } from './environment.interface';

export const environment: Environment = {
  production: false,
  AUTH0_DOMAIN: 'dev-omar.eu.auth0.com',
  AUTH0_CLIENT_ID: 'IJrmgYbTmQRyOQfx6lenbpduRJzfOPRh',
  redirectUri: 'https://localhost:4200/callback',
  api_url: 'https://localhost:6587/api'
};