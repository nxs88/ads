import { authHandler } from './auth.handlers';
import { profileHandlers } from './profile.handlers';
import { protectedHandlers } from './protected.handlers';

export const handlers = [
  ...authHandler,
  ...protectedHandlers,
  ...profileHandlers,
];
