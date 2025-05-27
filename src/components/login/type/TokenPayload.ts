import { TokenRoles } from './TokenRoles';

export interface TokenPayload {
  email: string;
  id: string;
  roles: TokenRoles[];
  exp: number;
}
